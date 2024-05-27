import { z } from 'zod';

export const RANKS = [
	'iron',
	'bronze',
	'silver',
	'gold',
	'platinum',
	'emerald',
	'diamond',
	'master'
] as const;

export const CRITERIAS = ['populars', 'victories', 'mixed'] as const;
export type Criteria = typeof CRITERIAS[number];

export const criterias: Record<Criteria, string> = {
	populars: 'Most populars',
	victories: 'Most victories',
	mixed: 'Mixed populars and victories'
}

export const formSchema = z.object({
	random_team: z.boolean().default(false),
	player_1: z.string(),
	player_2: z.string(),
	player_3: z.string(),
	player_4: z.string(),
	player_5: z.string(),
	player_6: z.string(),
	player_7: z.string(),
	player_8: z.string(),
	player_9: z.string(),
	player_10: z.string(),
	player_11: z.string(),
	player_12: z.string(),
	player_13: z.string(),
	player_14: z.string(),
	player_15: z.string(),
	player_16: z.string(),
	// rank: z
	// 	.enum(['Iron+', 'Bronze+', 'Silver+', 'Gold+', 'Platinum+', 'Emerald+', 'Diamond+', 'Master+'])
	// 	.default('Platinum+'),
	rank: z.enum(RANKS).default('platinum'),
	auto_ban: z.boolean().default(false),
	auto_ban_count: z.number().default(5),
	auto_ban_most: z.enum(CRITERIAS).default('populars')
});

export type FormSchema = typeof formSchema;
type FormSchemaType = z.infer<FormSchema>;
export type FormSchemaKey = keyof FormSchemaType;
