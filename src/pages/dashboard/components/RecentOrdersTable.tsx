import { Text, Table, Group, Avatar, Badge } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { SectionCard } from '../../../components';
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
	const { t } = useTranslation();

	return (
		<SectionCard title={t('dashboard.recent_orders')} contentPadding={0}>
			<Table striped highlightOnHover>
				<Table.Thead>
					<Table.Tr style={{ height: 50 }}>
						<Table.Th>{t('dashboard.order_id')}</Table.Th>
						<Table.Th>{t('dashboard.customer')}</Table.Th>
						<Table.Th>{t('dashboard.product')}</Table.Th>
						<Table.Th>{t('dashboard.amount')}</Table.Th>
						<Table.Th>{t('dashboard.status')}</Table.Th>
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>
					{data.map(order => (
						<Table.Tr key={order.id} style={{ height: 50 }}>
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
		</SectionCard>
	);
}
