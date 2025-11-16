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

interface Product {
	id: number;
	image: string;
	name: string;
	price: number;
	stock: number;
	rating: number;
	createdAt: Date;
	status: 'active' | 'inactive';
}

const initialProducts: Product[] = [
	{
		id: 1,
		image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100',
		name: 'Wireless Headphones',
		price: 199.99,
		stock: 45,
		rating: 4.5,
		createdAt: new Date('2024-01-15'),
		status: 'active',
	},
	{
		id: 2,
		image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100',
		name: 'Smart Watch',
		price: 299.99,
		stock: 23,
		rating: 4.8,
		createdAt: new Date('2024-02-20'),
		status: 'active',
	},
	{
		id: 3,
		image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=100',
		name: 'Laptop Stand',
		price: 79.99,
		stock: 67,
		rating: 4.2,
		createdAt: new Date('2024-01-10'),
		status: 'active',
	},
	{
		id: 4,
		image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=100',
		name: 'Desk Lamp',
		price: 49.99,
		stock: 89,
		rating: 4.6,
		createdAt: new Date('2024-03-05'),
		status: 'active',
	},
	{
		id: 5,
		image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100',
		name: 'Mechanical Keyboard',
		price: 159.99,
		stock: 34,
		rating: 4.9,
		createdAt: new Date('2024-02-14'),
		status: 'active',
	},
	{
		id: 6,
		image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=100',
		name: 'Wireless Mouse',
		price: 39.99,
		stock: 120,
		rating: 4.3,
		createdAt: new Date('2024-01-25'),
		status: 'active',
	},
	{
		id: 7,
		image: 'https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=100',
		name: 'USB-C Hub',
		price: 69.99,
		stock: 0,
		rating: 4.1,
		createdAt: new Date('2024-03-10'),
		status: 'inactive',
	},
	{
		id: 8,
		image: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=100',
		name: 'Desk Mat',
		price: 29.99,
		stock: 156,
		rating: 4.4,
		createdAt: new Date('2024-02-01'),
		status: 'active',
	},
	{
		id: 9,
		image: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=100',
		name: 'Monitor Stand',
		price: 89.99,
		stock: 42,
		rating: 4.7,
		createdAt: new Date('2024-01-30'),
		status: 'active',
	},
	{
		id: 10,
		image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=100',
		name: 'Phone Stand',
		price: 19.99,
		stock: 203,
		rating: 4.0,
		createdAt: new Date('2024-03-15'),
		status: 'active',
	},
	{
		id: 11,
		image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=100',
		name: 'Cable Organizer',
		price: 14.99,
		stock: 98,
		rating: 3.9,
		createdAt: new Date('2024-02-28'),
		status: 'active',
	},
	{
		id: 12,
		image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=100',
		name: 'Laptop Sleeve',
		price: 24.99,
		stock: 75,
		rating: 4.5,
		createdAt: new Date('2024-03-01'),
		status: 'active',
	},
];

export function Products() {
	const navigate = useNavigate();
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [search, setSearch] = useState('');
	const [sortStatus, setSortStatus] = useState<DataTableSortStatus<Product>>({
		columnAccessor: 'name',
		direction: 'asc',
	});

	// 使用 useMemo 优化性能并避免 useEffect 警告
	const records = useMemo(() => {
		const from = (page - 1) * pageSize;
		const to = from + pageSize;

		// 搜索过滤
		const filteredData = initialProducts.filter(product =>
			product.name.toLowerCase().includes(search.toLowerCase())
		);

		// 原生排序实现
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
		// TODO: 打开产品详情页
		console.log('View product:', id);
	};

	const handleEdit = (id: number) => {
		navigate(`/products/${id}/edit`);
	};

	const handleDelete = (id: number) => {
		// TODO: 实现删除确认对话框
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
							render: product => <Avatar src={product.image} alt={product.name} size={40} radius="sm" />,
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
