import { CHAMPIONS, type Champion } from '$lib/data';

// [name, championId] tuples instead of objects, then gzipped, to keep share links short.
type SharePlayer = [name: string, championId: Champion['id']];

async function readAllChunks(stream: ReadableStream<Uint8Array>): Promise<Uint8Array<ArrayBuffer>> {
	const reader = stream.getReader();
	const chunks: Uint8Array[] = [];
	let totalLength = 0;

	for (;;) {
		const { done, value } = await reader.read();
		if (done) break;
		chunks.push(value);
		totalLength += value.length;
	}

	const bytes = new Uint8Array(totalLength);
	let offset = 0;
	for (const chunk of chunks) {
		bytes.set(chunk, offset);
		offset += chunk.length;
	}
	return bytes;
}

async function gzip(bytes: Uint8Array<ArrayBuffer>): Promise<Uint8Array<ArrayBuffer>> {
	const stream = new CompressionStream('gzip');
	const writer = stream.writable.getWriter();
	writer.write(bytes);
	writer.close();
	return readAllChunks(stream.readable);
}

async function gunzip(bytes: Uint8Array<ArrayBuffer>): Promise<Uint8Array<ArrayBuffer>> {
	const stream = new DecompressionStream('gzip');
	const writer = stream.writable.getWriter();
	writer.write(bytes);
	writer.close();
	return readAllChunks(stream.readable);
}

function toBase64Url(bytes: Uint8Array): string {
	let binary = '';
	bytes.forEach((byte) => (binary += String.fromCharCode(byte)));
	return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(encoded: string): Uint8Array<ArrayBuffer> {
	const base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
	const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
	const binary = atob(padded);
	return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

/**
 * Encodes a generated team composition into a compact, URL-safe string. Only each player's
 * name and champion id are kept (the rest of the champion data is looked up from `CHAMPIONS`
 * on decode), as `[name, championId]` tuples, gzipped, then base64url-encoded, to keep the
 * resulting share link as short as possible.
 */
export async function encodeTeams(teams: PlayerWithChampion[][]): Promise<string> {
	const compact: SharePlayer[][] = teams.map((team) =>
		team.map((player): SharePlayer => [player.name, player.champion.id])
	);
	const json = JSON.stringify(compact);
	const compressed = await gzip(new TextEncoder().encode(json));
	return toBase64Url(compressed);
}

/**
 * Decodes a string produced by {@link encodeTeams} back into a team composition. Returns
 * `null` if the string is malformed, and silently drops any player whose champion id no
 * longer exists in `CHAMPIONS`.
 */
export async function decodeTeams(encoded: string): Promise<PlayerWithChampion[][] | null> {
	try {
		const decompressed = await gunzip(fromBase64Url(encoded));
		const compact: SharePlayer[][] = JSON.parse(new TextDecoder().decode(decompressed));

		return compact.map((team) =>
			team.reduce<PlayerWithChampion[]>((acc, [name, championId]) => {
				const champion = CHAMPIONS.find((c) => c.id === championId);
				if (champion) acc.push({ name, champion });
				return acc;
			}, [])
		);
	} catch {
		return null;
	}
}
