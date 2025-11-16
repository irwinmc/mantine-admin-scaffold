/**
 * ProductEdit Form Schema
 */

import { z } from 'zod';

export const productSchema = z.object({
	name: z.string().min(2, { error: 'product_edit.name_too_short' }).max(100, { error: 'product_edit.name_too_long' }),
	description: z
		.string()
		.min(10, { error: 'product_edit.description_too_short' })
		.max(500, { error: 'product_edit.description_too_long' }),
	price: z
		.number()
		.min(0.01, { error: 'product_edit.price_greater_than_zero' })
		.max(999999, { error: 'product_edit.price_too_high' }),
	cost: z
		.number()
		.min(0, { error: 'product_edit.cost_not_negative' })
		.max(999999, { error: 'product_edit.cost_too_high' }),
	stock: z
		.number()
		.int({ error: 'product_edit.stock_integer' })
		.min(0, { error: 'product_edit.stock_not_negative' }),
	sku: z.string().min(1, { error: 'product_edit.sku_empty' }),
	category: z.string().min(1, { error: 'product_edit.select_category' }),
	status: z.enum(['active', 'inactive', 'draft']),
	featured: z.boolean(),
});

export type ProductFormValues = z.infer<typeof productSchema>;

