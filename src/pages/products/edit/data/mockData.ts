/**
 * ProductEdit 模拟数据
 */

import type { ProductVariant } from '../../components/ProductVariants';

export const mockProduct = {
	id: 1,
	name: 'Wireless Headphones',
	description:
		'High-quality wireless headphones with noise cancellation and premium sound quality. Perfect for music lovers and professionals.',
	price: 199.99,
	cost: 120.0,
	stock: 45,
	sku: 'WH-001',
	category: 'electronics',
	status: 'active' as const,
	featured: true,
	image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100',
};

export const mockVariants: ProductVariant[] = [
	{
		id: '1',
		size: '39',
		color: 'white',
		price: 96.0,
		stock: 18,
	},
	{
		id: '2',
		size: '42',
		color: 'black',
		price: 96.0,
		stock: 12,
	},
	{
		id: '3',
		size: '41',
		color: 'white',
		price: 96.0,
		stock: 30,
	},
	{
		id: '4',
		size: '44',
		color: 'red',
		price: 96.0,
		stock: 27,
	},
	{
		id: '5',
		size: '43',
		color: 'black',
		price: 96.0,
		stock: 15,
	},
];

