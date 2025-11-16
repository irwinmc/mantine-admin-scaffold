/**
 * Product List 页面
 */

import { useState, useMemo } from 'react';
import { Stack, Title, Badge, Card, TextInput, Button, Box, Group } from '@mantine/core';
import { DataTable, type DataTableSortStatus } from 'mantine-datatable';
import { IconSearch, IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { initialProducts } from './data/mockData';
import { getProductColumns } from './columns';
import type { Product } from './types';

export function ProductList() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [search, setSearch] = useState('');
	const [sortStatus, setSortStatus] = useState<DataTableSortStatus<Product>>({
		columnAccessor: 'name',
		direction: 'asc',
	});

	const records = useMemo(() => {
		const from = (page - 1) * pageSize;
		const to = from + pageSize;
		const filteredData = initialProducts.filter(product =>
			product.name.toLowerCase().includes(search.toLowerCase())
		);
		const sortedData = [...filteredData].sort((a, b) => {
			const accessor = sortStatus.columnAccessor as keyof Product;
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
	}, [page, pageSize, sortStatus, search]);

	const totalRecords = useMemo(() => {
		return initialProducts.filter(product => product.name.toLowerCase().includes(search.toLowerCase())).length;
	}, [search]);

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

	const columns = getProductColumns({
		t,
		getStockBadge,
		handleView,
		handleEdit,
		handleDelete,
	});

	return (
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
				/>
			</Card>
		</Stack>
	);
}

export default ProductList;
