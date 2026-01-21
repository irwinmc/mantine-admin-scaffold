/**
 * OrderList 页面 - 订单列表
 */

import { useState, useMemo } from 'react';
import {
	Stack,
	Title,
	Card,
	TextInput,
	Button,
	Box,
	Group,
	Text,
	Modal,
	useMantineColorScheme,
	Tabs,
} from '@mantine/core';
import { DataTable, type DataTableSortStatus } from 'mantine-datatable';
import { IconSearch, IconAlertTriangle, IconList, IconCreditCard, IconTruck, IconCheck } from '@tabler/icons-react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { getOrderListColumns } from './OrderListColumns';
import { useOrdersStore } from './store';
import type { Order } from './types';

export function OrderList() {
	const { t } = useTranslation();
	const { colorScheme } = useMantineColorScheme();
	const navigate = useNavigate();
	const orders = useOrdersStore(state => state.orders);
	const deleteOrder = useOrdersStore(state => state.deleteOrder);

	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [search, setSearch] = useState('');
	const [statusFilter, setStatusFilter] = useState<'all' | 'paid' | 'shipped' | 'completed'>('all');
	const [sortStatus, setSortStatus] = useState<DataTableSortStatus<Order>>({
		columnAccessor: 'orderDate',
		direction: 'desc',
	});
	const [deleteModalOpened, setDeleteModalOpened] = useState(false);
	const [orderToDelete, setOrderToDelete] = useState<{ id: string; customer: string } | null>(null);

	const records = useMemo(() => {
		const from = (page - 1) * pageSize;
		const to = from + pageSize;
		const filteredData = orders.filter(
			order =>
				(statusFilter === 'all' || order.status === statusFilter) &&
				(order.id.toLowerCase().includes(search.toLowerCase()) ||
					order.customer.toLowerCase().includes(search.toLowerCase()) ||
					order.productName.toLowerCase().includes(search.toLowerCase())),
		);
		const sortedData = [...filteredData].sort((a, b) => {
			const accessor = sortStatus.columnAccessor as keyof Order;
			const aValue = a[accessor];
			const bValue = b[accessor];

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
	}, [page, pageSize, sortStatus, search, orders, statusFilter]);

	const totalRecords = useMemo(() => {
		return orders.filter(
			order =>
				(statusFilter === 'all' || order.status === statusFilter) &&
				(order.id.toLowerCase().includes(search.toLowerCase()) ||
					order.customer.toLowerCase().includes(search.toLowerCase()) ||
					order.productName.toLowerCase().includes(search.toLowerCase())),
		).length;
	}, [search, orders, statusFilter]);

	const handleView = (id: string) => {
		console.log('View order:', id);
		navigate(`/orders/${id}`);
	};

	const handleDelete = (id: string) => {
		const order = orders.find(o => o.id === id);
		if (order) {
			setOrderToDelete({ id: order.id, customer: order.customer });
			setDeleteModalOpened(true);
		}
	};

	const handleConfirmDelete = () => {
		if (orderToDelete) {
			deleteOrder(orderToDelete.id);
			setDeleteModalOpened(false);
			setOrderToDelete(null);
		}
	};

	const handleCancelDelete = () => {
		setDeleteModalOpened(false);
		setOrderToDelete(null);
	};

	const columns = getOrderListColumns({
		t,
		handleView,
		handleDelete,
	});

	return (
		<>
			<Stack gap="lg">
				<Group justify="space-between" align="center">
					<Title order={2}>{t('orders.title')}</Title>
				</Group>

				<Card p={0} radius="md" withBorder>
					<Box p="lg">
						<Group justify="space-between">
							<TextInput
								placeholder={t('orders.search_orders')}
								leftSection={<IconSearch size={16} />}
								value={search}
								onChange={e => setSearch(e.currentTarget.value)}
								style={{ flex: 1, maxWidth: 400 }}
							/>
						</Group>
					</Box>

					<Tabs
						variant="pills"
						value={statusFilter}
						onChange={value => setStatusFilter(value as 'all' | 'paid' | 'shipped' | 'completed')}
						styles={{
							root: {
								padding: '0.5rem',
								paddingTop: '0',
							},
							tab: {
								padding: '0.5rem 1rem',
								fontWeight: 500,
							},
						}}
					>
						<Tabs.List>
							<Tabs.Tab value="all" leftSection={<IconList size={16} />}>{t('orders.all')}</Tabs.Tab>
							<Tabs.Tab value="paid" leftSection={<IconCreditCard size={16} />}>{t('orders.paid')}</Tabs.Tab>
							<Tabs.Tab value="shipped" leftSection={<IconTruck size={16} />}>{t('orders.shipped')}</Tabs.Tab>
							<Tabs.Tab value="completed" leftSection={<IconCheck size={16} />}>{t('orders.completed')}</Tabs.Tab>
						</Tabs.List>
					</Tabs>

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
						recordsPerPageLabel={t('orders.records_per_page')}
						paginationText={({ from, to, totalRecords }) =>
							t('orders.showing_results', { from, to, total: totalRecords })
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
							{t('orders.delete_order')}
						</Text>
					</Group>
				}
				centered
				size="md"
			>
				<Stack gap="lg" mt="md">
					<Text size="sm">
						{t('orders.delete_confirmation_message', { customer: orderToDelete?.customer || '' })}
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

export default OrderList;
