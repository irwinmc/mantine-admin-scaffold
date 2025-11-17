/**
 * Products 模块类型定义
 */

/**
 * 产品变体 (SKU - Stock Keeping Unit)
 * 代表产品的具体规格，包含价格、库存等信息
 */
export interface ProductVariant {
	id: string;
	sku: string; // 库存单位编码
	size?: string; // 尺寸（可选）
	color?: string; // 颜色（可选）
	price: number; // 价格
	stock: number; // 库存数量
	image?: string; // 变体图片（可选）
}

/**
 * 产品 (SPU - Standard Product Unit)
 * 代表标准产品单元，不包含价格信息
 */
export interface Product {
	id: number;
	spu: string; // 标准产品单位编码
	name: string; // 产品名称
	description?: string; // 产品描述
	images: string[]; // 产品图片数组
	category: string; // 分类
	status: 'active' | 'inactive'; // 状态
	rating: number; // 评分
	featured?: boolean; // 是否精选
	createdAt: Date; // 创建时间
	updatedAt?: Date; // 更新时间
	variants: ProductVariant[]; // 产品变体列表（至少一个）
}

/**
 * 产品列表项（用于列表展示）
 */
export interface ProductListItem {
	id: number;
	spu: string;
	name: string;
	image: string; // 列表显示的主图（取 images[0]）
	defaultSku: string; // 默认展示的 SKU
	defaultPrice: number; // 默认价格（通常是第一个变体的价格）
	totalStock: number; // 总库存（所有变体库存之和）
	rating: number;
	createdAt: Date;
	status: 'active' | 'inactive';
}

// ProductFormValues 从 schemas.ts 导出
