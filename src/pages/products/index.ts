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
export type { Product, ProductVariant, ProductListItem } from './types';

// Schemas
export { productSchema } from './schemas';
export type { ProductFormValues } from './schemas';

// Constants
export { categoryOptions, statusOptions } from './constants';

// Components
export { ProductForm } from './components/ProductForm';
export { ProductVariants } from './components/ProductVariants';
export { ProductVariantModal } from './components/ProductVariantModal';
export { ProductImageDropzone } from './components/ProductImageDropzone';
