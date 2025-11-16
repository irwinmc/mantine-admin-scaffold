/**
 * Product List 页面
 */

import { useState, useMemo } from 'react';
import {
	Stack,
	Title,
	Text,
	Badge,
	ActionIcon,
	Group,
	Rating,
	Avatar,
	Card,
	TextInput,
	Button,
	Box,
} from '@mantine/core';
import { DataTable, type DataTableSortStatus } from 'mantine-datatable';
import { IconEdit, IconTrash, IconEye, IconSearch, IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router';
import { initialProducts } from './data/mockData';
import type { Product } from './types';

export function ProductList() {
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
		if (stock === 0) return <Badge color="red">Out of Stock</Badge>;
		if (stock < 30) return <Badge color="orange">Low Stock</Badge>;
		return <Badge color="green">In Stock</Badge>;
	};

	return (
		<Stack gap="lg">
			<Group justify="space-between" align="center">
				<Title order={2}>Products</Title>
			</Group>

			<Card p={0} shadow="sm" radius="md" withBorder>
				<Box p="lg">
					<Group justify="space-between">
						<TextInput
							placeholder="Search products..."
							leftSection={<IconSearch size={16} />}
							value={search}
							onChange={e => setSearch(e.currentTarget.value)}
							style={{ flex: 1, maxWidth: 400 }}
						/>
						<Button leftSection={<IconPlus size={16} />} onClick={handleAddProduct}>
							Add Product
						</Button>
					</Group>
				</Box>

				<DataTable
					striped
					highlightOnHover
					records={records}
					columns={[
						{
							accessor: 'image',
							title: 'Image',
							width: 80,
							sortable: false,
							render: product => (
								<Avatar src={product.image} alt={product.name} size={40} radius="sm" />
							),
						},
						{
							accessor: 'name',
							title: 'Product Name',
							sortable: true,
							width: 200,
						},
						{
							accessor: 'price',
							title: 'Price',
							sortable: true,
							width: 120,
							render: product => <Text fw={600}>${product.price.toFixed(2)}</Text>,
						},
						{
							accessor: 'stock',
							title: 'Stock',
							sortable: true,
							width: 150,
							render: product => (
								<Group gap="xs">
									<Text>{product.stock}</Text>
									{getStockBadge(product.stock)}
								</Group>
							),
						},
						{
							accessor: 'rating',
							title: 'Rating',
							sortable: true,
							width: 140,
							render: product => (
								<Group gap="xs">
									<Rating value={product.rating} fractions={2} readOnly size="sm" />
									<Text size="sm" c="dimmed">
										({product.rating})
									</Text>
								</Group>
							),
						},
						{
							accessor: 'createdAt',
							title: 'Created Date',
							sortable: true,
							width: 140,
							render: product => product.createdAt.toLocaleDateString(),
						},
						{
							accessor: 'actions',
							title: 'Actions',
							width: 120,
							textAlign: 'center',
							render: product => (
								<Group gap={4} justify="center" wrap="nowrap">
									<ActionIcon
										size="sm"
										variant="subtle"
										color="blue"
										onClick={() => handleView(product.id)}
									>
										<IconEye size={16} />
									</ActionIcon>
									<ActionIcon
										size="sm"
										variant="subtle"
										color="green"
										onClick={() => handleEdit(product.id)}
									>
										<IconEdit size={16} />
									</ActionIcon>
									<ActionIcon
										size="sm"
										variant="subtle"
										color="red"
										onClick={() => handleDelete(product.id)}
									>
										<IconTrash size={16} />
									</ActionIcon>
								</Group>
							),
						},
					]}
					sortStatus={sortStatus}
					onSortStatusChange={setSortStatus}
					totalRecords={totalRecords}
					recordsPerPage={pageSize}
					page={page}
					onPageChange={setPage}
					recordsPerPageOptions={[5, 10, 15, 20]}
					onRecordsPerPageChange={setPageSize}
					paginationText={({ from, to, totalRecords }) =>
						`Showing ${from} to ${to} of ${totalRecords} results`
					}
					paginationSize="sm"
					minHeight={400}
				/>
			</Card>
		</Stack>
	);
}

export default ProductList;

