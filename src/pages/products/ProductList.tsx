/**
 * ProductList 页面 - 产品列表
 */

import { useState, useMemo } from 'react';
import { Stack, Title, Badge, Card, TextInput, Button, Box, Group, useMantineColorScheme } from '@mantine/core';
import { DataTable, type DataTableSortStatus } from 'mantine-datatable';
import { IconSearch, IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { mockProducts } from './data/mockData';
import { getProductListColumns } from './ProductListColumns';
import type { ProductListItem } from './types';

export function ProductList() {
	const { t } = useTranslation();
	const { colorScheme } = useMantineColorScheme();
	const navigate = useNavigate();
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [search, setSearch] = useState('');
	const [sortStatus, setSortStatus] = useState<DataTableSortStatus<ProductListItem>>({
		columnAccessor: 'name',
		direction: 'asc',
	});

	// 将 Product 转换为 ProductListItem 用于列表显示
	const productListItems = useMemo<ProductListItem[]>(() => {
		return mockProducts.map(product => ({
			id: product.id,
			spu: product.spu,
			name: product.name,
			image: product.image,
			defaultSku: product.variants[0].sku,
			defaultPrice: product.variants[0].price,
			totalStock: product.variants.reduce((sum, v) => sum + v.stock, 0),
			rating: product.rating,
			createdAt: product.createdAt,
			status: product.status,
		}));
	}, []);

	const records = useMemo(() => {
		const from = (page - 1) * pageSize;
		const to = from + pageSize;
		const filteredData = productListItems.filter(product =>
			product.name.toLowerCase().includes(search.toLowerCase())
		);
		const sortedData = [...filteredData].sort((a, b) => {
			const accessor = sortStatus.columnAccessor as keyof ProductListItem;
			const aValue = a[accessor];
			const bValue = b[accessor];
			if (aValue === bValue) return 0;
			if (sortStatus.direction === 'asc') {
				return aValue > bValue ? 1 : -1;
			} else {
				return aValue < bValue ? 1 : -1;
			}
		});
		return sortedData.slice(from, to);
	}, [page, pageSize, sortStatus, search, productListItems]);

	const totalRecords = useMemo(() => {
		return productListItems.filter(product => product.name.toLowerCase().includes(search.toLowerCase())).length;
	}, [search, productListItems]);

	const handleView = (id: number) => {
		console.log('View product:', id);
	};

	const handleEdit = (id: number) => {
		navigate(`/products/${id}/edit`);
	};

	const handleDelete = (id: number) => {
		console.log('Delete product:', id);
	};

	const handleAddProduct = () => {
		navigate('/products/new');
	};

	const getStockBadge = (stock: number) => {
		if (stock === 0) return <Badge color="red">{t('products.out_of_stock')}</Badge>;
		if (stock < 30) return <Badge color="orange">{t('products.low_stock')}</Badge>;
		return <Badge color="green">{t('products.in_stock')}</Badge>;
	};

	const columns = getProductListColumns({
		t,
		getStockBadge,
		handleView,
		handleEdit,
		handleDelete,
	});

	return (
		<>
			<Stack gap="lg">
				<Group justify="space-between" align="center">
					<Title order={2}>{t('products.title')}</Title>
				</Group>

				<Card p={0} shadow="sm" radius="md" withBorder>
					<Box p="lg">
						<Group justify="space-between">
							<TextInput
								placeholder={t('products.search_products')}
								leftSection={<IconSearch size={16} />}
								value={search}
								onChange={e => setSearch(e.currentTarget.value)}
								style={{ flex: 1, maxWidth: 400 }}
							/>
							<Button leftSection={<IconPlus size={16} />} onClick={handleAddProduct}>
								{t('products.add_product')}
							</Button>
						</Group>
					</Box>

					<DataTable
						striped
						highlightOnHover
						withColumnBorders
						records={records}
						columns={columns}
						sortStatus={sortStatus}
						onSortStatusChange={setSortStatus}
						totalRecords={totalRecords}
						recordsPerPage={pageSize}
						page={page}
						onPageChange={setPage}
						recordsPerPageOptions={[5, 10, 15, 20]}
						onRecordsPerPageChange={setPageSize}
						recordsPerPageLabel={t('products.records_per_page')}
						paginationText={({ from, to, totalRecords }) =>
							t('products.showing_results', { from, to, total: totalRecords })
						}
						paginationSize="sm"
						minHeight={400}
						style={{
							borderTop: `1px solid ${
								colorScheme === 'dark' ? 'var(--mantine-color-dark-4)' : 'var(--mantine-color-gray-3)'
							}`,
						}}
					/>
				</Card>
			</Stack>
		</>
	);
}

export default ProductList;

