import { SimpleGrid, Card, Text, Group, ThemeIcon, Stack, Grid, Title, Badge, Table, Avatar, Box } from '@mantine/core';
import {
	IconUsers,
	IconShoppingCart,
	IconCurrencyDollar,
	IconTrendingUp,
	IconArrowUpRight,
	IconArrowDownRight,
} from '@tabler/icons-react';
import { AreaChart, DonutChart } from '@mantine/charts';
import { ResponsiveContainer } from 'recharts';

interface StatsCardProps {
	title: string;
	value: string;
	diff: number;
	icon: React.ComponentType<{ size?: string | number; stroke?: number }>;
	color: string;
}

function StatsCard({ title, value, diff, icon: Icon, color }: StatsCardProps) {
	const isPositive = diff > 0;

	return (
		<Card shadow="sm" padding="lg" radius="md" withBorder>
			<Group justify="space-between">
				<div>
					<Text c="dimmed" size="sm" fw={500}>
						{title}
					</Text>
					<Text size="xl" fw={700} mt="xs">
						{value}
					</Text>
					<Group gap="xs" mt="sm">
						<ThemeIcon color={isPositive ? 'teal' : 'red'} variant="light" size="sm" radius="xl">
							{isPositive ? <IconArrowUpRight size={16} /> : <IconArrowDownRight size={16} />}
						</ThemeIcon>
						<Text c={isPositive ? 'teal' : 'red'} size="sm" fw={500}>
							{Math.abs(diff)}%
						</Text>
						<Text c="dimmed" size="sm">
							vs last month
						</Text>
					</Group>
				</div>
				<ThemeIcon color={color} size={60} radius="md" variant="light">
					<Icon size={32} stroke={1.5} />
				</ThemeIcon>
			</Group>
		</Card>
	);
}

export function Dashboard() {
	const stats = [
		{
			title: 'Total Users',
			value: '13,456',
			diff: 12.5,
			icon: IconUsers,
			color: 'blue',
		},
		{
			title: 'Total Orders',
			value: '2,345',
			diff: 8.3,
			icon: IconShoppingCart,
			color: 'cyan',
		},
		{
			title: 'Revenue',
			value: '$45,678',
			diff: 15.2,
			icon: IconCurrencyDollar,
			color: 'green',
		},
		{
			title: 'Growth',
			value: '23.5%',
			diff: -2.4,
			icon: IconTrendingUp,
			color: 'violet',
		},
	];

	const revenueData = [
		{ month: 'Jan', revenue: 4000, orders: 240 },
		{ month: 'Feb', revenue: 3000, orders: 198 },
		{ month: 'Mar', revenue: 5000, orders: 300 },
		{ month: 'Apr', revenue: 4500, orders: 280 },
		{ month: 'May', revenue: 6000, orders: 350 },
		{ month: 'Jun', revenue: 5500, orders: 320 },
		{ month: 'Jul', revenue: 7000, orders: 400 },
	];

	const categoryData = [
		{ name: 'Electronics', value: 2400, color: 'blue.6', hexColor: '#228be6' },
		{ name: 'Clothing', value: 1800, color: 'cyan.6', hexColor: '#15aabf' },
		{ name: 'Food', value: 1200, color: 'green.6', hexColor: '#40c057' },
		{ name: 'Books', value: 800, color: 'violet.6', hexColor: '#7950f2' },
		{ name: 'Others', value: 600, color: 'orange.6', hexColor: '#fd7e14' },
	];

	const topProducts = [
		{ name: 'Wireless Headphones', sales: 1234, revenue: '$24,680', trend: 12 },
		{ name: 'Smart Watch', sales: 987, revenue: '$19,740', trend: 8 },
		{ name: 'Laptop Stand', sales: 756, revenue: '$15,120', trend: -3 },
		{ name: 'USB-C Cable', sales: 654, revenue: '$6,540', trend: 15 },
		{ name: 'Desk Mat', sales: 543, revenue: '$8,145', trend: 5 },
	];

	const recentOrders = [
		{
			id: '#12345',
			customer: 'John Doe',
			product: 'Wireless Headphones',
			amount: '$199',
			status: 'Completed',
			avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
		},
		{
			id: '#12346',
			customer: 'Jane Smith',
			product: 'Smart Watch',
			amount: '$299',
			status: 'Processing',
			avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
		},
		{
			id: '#12347',
			customer: 'Bob Johnson',
			product: 'Laptop Stand',
			amount: '$79',
			status: 'Shipped',
			avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
		},
		{
			id: '#12348',
			customer: 'Alice Williams',
			product: 'USB-C Cable',
			amount: '$19',
			status: 'Completed',
			avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
		},
		{
			id: '#12349',
			customer: 'Charlie Brown',
			product: 'Desk Mat',
			amount: '$45',
			status: 'Pending',
			avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie',
		},
	];

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'Completed':
				return 'green';
			case 'Processing':
				return 'blue';
			case 'Shipped':
				return 'cyan';
			case 'Pending':
				return 'orange';
			default:
				return 'gray';
		}
	};

	return (
		<Stack gap="lg">
			<Title order={2}>Dashboard</Title>

			<SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
				{stats.map(stat => (
					<StatsCard key={stat.title} {...stat} />
				))}
			</SimpleGrid>

			<Grid gutter="lg">
				<Grid.Col span={{ base: 12, lg: 8 }}>
					<Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
						<Stack gap="md" h="100%" justify="space-between">
							<Group justify="space-between">
								<Text size="lg" fw={600}>
									Revenue Overview
								</Text>
								<Badge variant="light" color="blue">
									Last 7 months
								</Badge>
							</Group>
							<ResponsiveContainer width="100%" height={300}>
								<AreaChart
									h={300}
									data={revenueData}
									dataKey="month"
									series={[
										{ name: 'revenue', label: 'Revenue', color: 'blue.6' },
										{ name: 'orders', label: 'Orders', color: 'cyan.6' },
									]}
									curveType="natural"
									withLegend
									gridAxis="xy"
									tickLine="xy"
								/>
							</ResponsiveContainer>
						</Stack>
					</Card>
				</Grid.Col>

				<Grid.Col span={{ base: 12, lg: 4 }}>
					<Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
						<Stack gap="lg" h="100%" justify="space-between">
							<Text size="lg" fw={600}>
								Sales by Category
							</Text>
							<Stack align="center" style={{ flex: 1 }} justify="center">
								<ResponsiveContainer width="100%" height={240}>
									<DonutChart
										data={categoryData}
										size={200}
										thickness={50}
										withLabelsLine
										withLabels
										labelsType="percent"
										paddingAngle={2}
										strokeWidth={1}
									/>
								</ResponsiveContainer>
							</Stack>
							<Group gap="md" justify="center" wrap="wrap">
								{categoryData.map(item => (
									<Group key={item.name} gap={6} wrap="nowrap">
										<div
											style={{
												width: 12,
												height: 12,
												borderRadius: '50%',
												backgroundColor: item.hexColor,
												flexShrink: 0,
											}}
										/>
										<Text size="sm" fw={500} style={{ whiteSpace: 'nowrap' }}>
											{item.name}
										</Text>
									</Group>
								))}
							</Group>
						</Stack>
					</Card>
				</Grid.Col>
			</Grid>

			<Grid gutter="lg">
				<Grid.Col span={{ base: 12, lg: 6 }}>
					<Card shadow="sm" p={0} radius="md" withBorder h="100%">
						<Box p="lg">
							<Text size="lg" fw={600}>
								Top Products
							</Text>
						</Box>
						<Table striped highlightOnHover>
								<Table.Thead>
									<Table.Tr>
										<Table.Th>Product</Table.Th>
										<Table.Th>Sales</Table.Th>
										<Table.Th>Revenue</Table.Th>
										<Table.Th>Trend</Table.Th>
									</Table.Tr>
								</Table.Thead>
								<Table.Tbody>
									{topProducts.map(product => (
										<Table.Tr key={product.name}>
											<Table.Td>{product.name}</Table.Td>
											<Table.Td>{product.sales}</Table.Td>
											<Table.Td>{product.revenue}</Table.Td>
											<Table.Td>
												<Group gap="xs">
													<ThemeIcon
														color={product.trend > 0 ? 'teal' : 'red'}
														variant="light"
														size="xs"
														radius="xl"
													>
														{product.trend > 0 ? (
															<IconArrowUpRight size={12} />
														) : (
															<IconArrowDownRight size={12} />
														)}
													</ThemeIcon>
													<Text c={product.trend > 0 ? 'teal' : 'red'} size="sm" fw={500}>
														{Math.abs(product.trend)}%
													</Text>
												</Group>
											</Table.Td>
										</Table.Tr>
								))}
							</Table.Tbody>
						</Table>
					</Card>
				</Grid.Col>

				<Grid.Col span={{ base: 12, lg: 6 }}>
					<Card shadow="sm" p={0} radius="md" withBorder h="100%">
						<Box p="lg">
							<Text size="lg" fw={600}>
								Recent Orders
							</Text>
						</Box>
						<Table striped highlightOnHover>
								<Table.Thead>
									<Table.Tr>
										<Table.Th>Order</Table.Th>
										<Table.Th>Customer</Table.Th>
										<Table.Th>Amount</Table.Th>
										<Table.Th>Status</Table.Th>
									</Table.Tr>
								</Table.Thead>
								<Table.Tbody>
									{recentOrders.map(order => (
										<Table.Tr key={order.id}>
											<Table.Td>{order.id}</Table.Td>
											<Table.Td>
												<Group gap="sm">
													<Avatar src={order.avatar} size="sm" radius="xl" />
													<Text size="sm">{order.customer}</Text>
												</Group>
											</Table.Td>
											<Table.Td>
												<Text fw={600}>{order.amount}</Text>
											</Table.Td>
											<Table.Td>
												<Badge variant="light" color={getStatusColor(order.status)}>
													{order.status}
												</Badge>
											</Table.Td>
										</Table.Tr>
									))}
								</Table.Tbody>
							</Table>
					</Card>
				</Grid.Col>
			</Grid>
		</Stack>
	);
}
