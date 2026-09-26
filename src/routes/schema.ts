import { z } from 'zod';
import { CHAMPIONS, TEAM_SETUP_KEYS } from '$lib/data';
import { MIN_NON_BANNED_CHAMPIONS } from '$lib/constants';

export const MAX_AUTO_BANS = CHAMPIONS.length - MIN_NON_BANNED_CHAMPIONS;

export const CRITERIAS = ['popularity', 'winrate', 'mixed'] as const;
export type Criteria = (typeof CRITERIAS)[number];

export const criterias: Record<Criteria, string> = {
	popularity: 'By popularity',
	winrate: 'By winrate',
	mixed: 'Mixed popularity and winrate'
};

const playerSchema = z.string().min(1);

export const formSchema = z.object({
	setup: z.enum(TEAM_SETUP_KEYS).default('duo'),
	random_team: z.boolean().default(true),
	player_1: playerSchema.default('Player 1'),
	player_2: playerSchema.default('Player 2'),
	player_3: playerSchema.default('Player 3'),
	player_4: playerSchema.default('Player 4'),
	player_5: playerSchema.default('Player 5'),
	player_6: playerSchema.default('Player 6'),
	player_7: playerSchema.default('Player 7'),
	player_8: playerSchema.default('Player 8'),
	player_9: playerSchema.default('Player 9'),
	player_10: playerSchema.default('Player 10'),
	player_11: playerSchema.default('Player 11'),
	player_12: playerSchema.default('Player 12'),
	player_13: playerSchema.default('Player 13'),
	player_14: playerSchema.default('Player 14'),
	player_15: playerSchema.default('Player 15'),
	player_16: playerSchema.default('Player 16'),
	player_17: playerSchema.default('Player 17'),
	player_18: playerSchema.default('Player 18'),
	auto_ban: z.boolean().default(false),
	auto_ban_count: z.number().int().min(1).max(MAX_AUTO_BANS).default(8),
	auto_ban_criteria: z.enum(CRITERIAS).default('popularity')
});

export type FormSchema = typeof formSchema;
export type FormSchemaType = z.infer<FormSchema>;
export type FormSchemaKey = keyof FormSchemaType;
