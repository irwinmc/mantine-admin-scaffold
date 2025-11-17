/**
 * Products Store - 使用 Zustand 管理产品数据
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Product, ProductVariant } from './types';
import type { ProductFormValues } from './schemas';
import { mockProducts } from './data/mockData';

interface ProductsState {
	// 状态
	products: Product[];
	loading: boolean;
	error: string | null;

	// 产品 CRUD 操作
	getProductById: (id: number) => Product | undefined;
	createProduct: (values: ProductFormValues, variants: ProductVariant[], images: string[]) => Product;
	updateProduct: (id: number, values: ProductFormValues, variants: ProductVariant[], images: string[]) => void;
	deleteProduct: (id: number) => void;

	// 变体管理操作
	addVariant: (productId: number, variant: ProductVariant) => void;
	updateVariant: (productId: number, variantId: string, variant: ProductVariant) => void;
	deleteVariant: (productId: number, variantId: string) => void;

	// 工具方法
	setLoading: (loading: boolean) => void;
	setError: (error: string | null) => void;
	resetError: () => void;
}

export const useProductsStore = create<ProductsState>()(
	devtools(
		(set, get) => ({
			// 初始状态 - 使用 mockData
			products: mockProducts,
			loading: false,
			error: null,

			// 根据 ID 获取产品
			getProductById: (id: number) => {
				return get().products.find(p => p.id === id);
			},

			// 创建新产品
			createProduct: (values: ProductFormValues, variants: ProductVariant[], images: string[]) => {
				const newId = Math.max(...get().products.map(p => p.id), 0) + 1;
				const newProduct: Product = {
					id: newId,
					spu: values.spu,
					name: values.name,
					description: values.description,
					images:
						images.length > 0
							? images
							: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100'],
					category: values.category,
					status: values.status,
					rating: 0,
					featured: values.featured,
					createdAt: new Date(),
					updatedAt: new Date(),
					views: 0,
					variants: variants.length > 0 ? variants : [],
				};

				set(state => ({
					products: [...state.products, newProduct],
				}));

				return newProduct;
			},

			// 更新产品
			updateProduct: (id: number, values: ProductFormValues, variants: ProductVariant[], images: string[]) => {
				set(state => ({
					products: state.products.map(product =>
						product.id === id
							? {
									...product,
									spu: values.spu,
									name: values.name,
									description: values.description,
									images: images.length > 0 ? images : product.images,
									category: values.category,
									status: values.status,
									featured: values.featured,
									updatedAt: new Date(),
									variants: variants.length > 0 ? variants : product.variants,
							  }
							: product
					),
				}));
			},

			// 删除产品
			deleteProduct: (id: number) => {
				set(state => ({
					products: state.products.filter(product => product.id !== id),
				}));
			},

			// 添加变体
			addVariant: (productId: number, variant: ProductVariant) => {
				set(state => ({
					products: state.products.map(product =>
						product.id === productId
							? {
									...product,
									variants: [...product.variants, variant],
									updatedAt: new Date(),
							  }
							: product
					),
				}));
			},

			// 更新变体
			updateVariant: (productId: number, variantId: string, updatedVariant: ProductVariant) => {
				set(state => ({
					products: state.products.map(product =>
						product.id === productId
							? {
									...product,
									variants: product.variants.map(v => (v.id === variantId ? updatedVariant : v)),
									updatedAt: new Date(),
							  }
							: product
					),
				}));
			},

			// 删除变体
			deleteVariant: (productId: number, variantId: string) => {
				set(state => ({
					products: state.products.map(product =>
						product.id === productId
							? {
									...product,
									variants: product.variants.filter(v => v.id !== variantId),
									updatedAt: new Date(),
							  }
							: product
					),
				}));
			},

			// 设置加载状态
			setLoading: (loading: boolean) => {
				set({ loading });
			},

			// 设置错误
			setError: (error: string | null) => {
				set({ error });
			},

			// 重置错误
			resetError: () => {
				set({ error: null });
			},
		}),
		{
			name: 'products-store',
		}
	)
);
