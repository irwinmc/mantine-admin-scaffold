/**
 * Products Module Exports
 */

export { ProductList } from './ProductList';
export { ProductCreate } from './ProductCreate';
export { ProductEdit } from './ProductEdit';
export { getProductListColumns } from './ProductListColumns';

// Store
export { useProductsStore } from './store';

// Types
export type { Product, ProductVariant } from './types';

// Schemas
export { productSchema } from './schemas';
export type { ProductFormValues } from './schemas';

// Constants
export { categoryOptions, statusOptions, sizeOptions, colorOptions } from './constants';

// Components
export * from './components';
