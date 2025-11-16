/**
 * 产品相关类型定义
 */

export interface Product {
	id: number;
	name: string;
	description: string;
	price: number;
	cost: number;
	stock: number;
	sku: string;
	category: ProductCategory;
	status: ProductStatus;
	featured: boolean;
	image?: string;
	rating?: number;
	createdAt: Date;
	updatedAt: Date;
}

export type ProductCategory =
	| 'electronics'
	| 'clothing'
	| 'food'
	| 'books'
	| 'toys'
	| 'sports'
	| 'home'
	| 'others';

export type ProductStatus = 'active' | 'inactive' | 'draft';

export interface ProductFormValues {
	name: string;
	description: string;
	price: number;
	cost: number;
	stock: number;
	sku: string;
	category: string;
	status: ProductStatus;
	featured: boolean;
}

export interface ProductListItem {
	id: number;
	image: string;
	name: string;
	price: number;
	stock: number;
	rating: number;
	createdAt: Date;
	status: 'active' | 'inactive';
}

