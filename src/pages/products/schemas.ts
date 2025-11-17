/**
 * Products Module Form Schemas
 */

import { z } from 'zod';

export const productSchema = z.object({
	name: z.string().min(2, { error: 'product_edit.name_too_short' }).max(100, { error: 'product_edit.name_too_long' }),
	description: z
		.string()
		.min(10, { error: 'product_edit.description_too_short' })
		.max(500, { error: 'product_edit.description_too_long' }),
	spu: z.string().min(1, { error: 'product_edit.spu_empty' }),
	category: z.string().min(1, { error: 'product_edit.select_category' }),
	status: z.enum(['active', 'inactive']),
	featured: z.boolean(),
});

export type ProductFormValues = z.infer<typeof productSchema>;
