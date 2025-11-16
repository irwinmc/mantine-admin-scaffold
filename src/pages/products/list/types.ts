/**
 * Product List 类型定义
 */

export interface Product {
	id: number;
	image: string;
	name: string;
	price: number;
	stock: number;
	rating: number;
	createdAt: Date;
	status: 'active' | 'inactive';
}

