import { Card, Text, Stack, Table, Group, Avatar, Badge } from '@mantine/core';
import type { RecentOrder } from '../types';

interface RecentOrdersTableProps {
	data: RecentOrder[];
}

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

export function RecentOrdersTable({ data }: RecentOrdersTableProps) {
	return (
		<Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
			<Stack gap="md" h="100%">
				<Text size="lg" fw={600}>
					Recent Orders
				</Text>
				<Table striped highlightOnHover>
					<Table.Thead>
						<Table.Tr>
							<Table.Th>Order ID</Table.Th>
							<Table.Th>Customer</Table.Th>
							<Table.Th>Product</Table.Th>
							<Table.Th>Amount</Table.Th>
							<Table.Th>Status</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>
						{data.map(order => (
							<Table.Tr key={order.id}>
								<Table.Td>{order.id}</Table.Td>
								<Table.Td>
									<Group gap="xs">
										<Avatar src={order.avatar} size="sm" radius="xl" />
										<Text size="sm">{order.customer}</Text>
									</Group>
								</Table.Td>
								<Table.Td>{order.product}</Table.Td>
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
			</Stack>
		</Card>
	);
}

