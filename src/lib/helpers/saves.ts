import { LS_KEY } from '$lib/constants';
import { formSchema, type FormSchemaType } from '../../routes/schema';

type SaveStorage = Pick<Storage, 'getItem' | 'setItem'>;

/**
 * Reads every saved players setting. Always read fresh from the storage (never cached), so saves
 * made earlier in the same session are never lost or hidden. Returns an empty object if the
 * storage is unavailable or holds invalid JSON.
 */
export function readSaves(storage: SaveStorage = localStorage): Record<string, unknown> {
	try {
		const raw = storage.getItem(LS_KEY);
		const parsed: unknown = raw ? JSON.parse(raw) : {};
		return typeof parsed === 'object' && parsed !== null ? (parsed as Record<string, unknown>) : {};
	} catch {
		return {};
	}
}

/** Adds (or replaces) the save called `name`, keeping every other save. */
export function writeSave(name: string, data: FormSchemaType, storage: SaveStorage = localStorage) {
	storage.setItem(LS_KEY, JSON.stringify({ ...readSaves(storage), [name]: data }));
}

/**
 * Returns the save called `name`, validated against the current form schema. Saves made by older
 * versions of the app miss newer fields (e.g. `setup`): the schema fills them with their default
 * value. Returns `null` if the save doesn't exist or can't be made valid.
 */
export function loadSave(name: string, storage: SaveStorage = localStorage): FormSchemaType | null {
	const save = readSaves(storage)[name];
	if (save === undefined) return null;

	const result = formSchema.safeParse(save);
	return result.success ? result.data : null;
}
