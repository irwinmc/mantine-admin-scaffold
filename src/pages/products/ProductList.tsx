/**
 * ProductList 页面 - 产品列表
 */

import { useState, useMemo } from 'react';
import {
	Stack,
	Title,
	Badge,
	Card,
	TextInput,
	Button,
	Box,
	Group,
	Text,
	Modal,
	useMantineColorScheme,
} from '@mantine/core';
import { DataTable, type DataTableSortStatus } from 'mantine-datatable';
import { IconSearch, IconPlus, IconAlertTriangle } from '@tabler/icons-react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { getProductListColumns } from './ProductListColumns';
import { useProductsStore } from './store';
import type { Product } from './types';

export function ProductList() {
	const { t } = useTranslation();
	const { colorScheme } = useMantineColorScheme();
	const navigate = useNavigate();
	const products = useProductsStore(state => state.products);
	const deleteProduct = useProductsStore(state => state.deleteProduct);

	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [search, setSearch] = useState('');
	const [sortStatus, setSortStatus] = useState<DataTableSortStatus<Product>>({
		columnAccessor: 'name',
		direction: 'asc',
	});
	const [deleteModalOpened, setDeleteModalOpened] = useState(false);
	const [productToDelete, setProductToDelete] = useState<{ id: number; name: string } | null>(null);

	const records = useMemo(() => {
		const from = (page - 1) * pageSize;
		const to = from + pageSize;
		const filteredData = products.filter(product => product.name.toLowerCase().includes(search.toLowerCase()));
		const sortedData = [...filteredData].sort((a, b) => {
			const accessor = sortStatus.columnAccessor as keyof Product;
			const aValue = a[accessor];
			const bValue = b[accessor];

			// 处理 undefined 值
			if (aValue === undefined && bValue === undefined) return 0;
			if (aValue === undefined) return 1;
			if (bValue === undefined) return -1;

			if (aValue === bValue) return 0;
			if (sortStatus.direction === 'asc') {
				return aValue > bValue ? 1 : -1;
			} else {
				return aValue < bValue ? 1 : -1;
			}
		});
		return sortedData.slice(from, to);
	}, [page, pageSize, sortStatus, search, products]);

	const totalRecords = useMemo(() => {
		return products.filter(product => product.name.toLowerCase().includes(search.toLowerCase())).length;
	}, [search, products]);

	const handleView = (id: number) => {
		console.log('View product:', id);
	};

	const handleEdit = (id: number) => {
		navigate(`/products/${id}/edit`);
	};

	const handleDelete = (id: number) => {
		const product = products.find(p => p.id === id);
		if (product) {
			setProductToDelete({ id: product.id, name: product.name });
			setDeleteModalOpened(true);
		}
	};

	const handleConfirmDelete = () => {
		if (productToDelete) {
			deleteProduct(productToDelete.id);
			setDeleteModalOpened(false);
			setProductToDelete(null);
		}
	};

	const handleCancelDelete = () => {
		setDeleteModalOpened(false);
		setProductToDelete(null);
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

			{/* 删除确认 Modal */}
			<Modal
				opened={deleteModalOpened}
				onClose={handleCancelDelete}
				title={
					<Group gap="xs">
						<IconAlertTriangle size={24} color="var(--mantine-color-red-6)" />
						<Text size="lg" fw={600}>
							{t('products.delete_product')}
						</Text>
					</Group>
				}
				centered
				size="md"
			>
				<Stack gap="lg" mt="md">
					<Text size="sm">
						{t('products.delete_confirmation_message', { name: productToDelete?.name || '' })}
					</Text>

					<Group justify="flex-end" gap="sm">
						<Button variant="default" onClick={handleCancelDelete}>
							{t('common.cancel')}
						</Button>
						<Button color="red" onClick={handleConfirmDelete}>
							{t('common.delete')}
						</Button>
					</Group>
				</Stack>
			</Modal>
		</>
	);
}

export default ProductList;
