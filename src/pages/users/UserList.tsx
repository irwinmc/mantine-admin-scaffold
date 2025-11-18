/**
 * UserList 页面 - 用户列表
 */

import { useState, useMemo } from 'react';
import { Stack, Title, Card, TextInput, Button, Group, Box, Badge, useMantineColorScheme } from '@mantine/core';
import { DataTable, type DataTableSortStatus } from 'mantine-datatable';
import { IconSearch, IconPlus } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { mockUsers } from './data/mockData';
import { getUserListColumns } from './UserListColumns';
import type { User } from './types';

export function UserList() {
	const { t } = useTranslation();
	const { colorScheme } = useMantineColorScheme();
	const [search, setSearch] = useState('');
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [sortStatus, setSortStatus] = useState<DataTableSortStatus<User>>({
		columnAccessor: 'joinDate',
		direction: 'desc',
	});

	// Role Badge
	const getRoleBadge = (role: User['role']) => {
		const roleConfig = {
			admin: { color: 'blue', label: t('users.role_admin') },
			manager: { color: 'cyan', label: t('users.role_manager') },
			user: { color: 'gray', label: t('users.role_user') },
		};

		const config = roleConfig[role];
		return (
			<Badge variant="light" color={config.color}>
				{config.label}
			</Badge>
		);
	};

	// Status Badge
	const getStatusBadge = (status: User['status']) => {
		const statusConfig = {
			active: { color: 'green', label: t('users.status_active') },
			inactive: { color: 'red', label: t('users.status_inactive') },
			pending: { color: 'orange', label: t('users.status_pending') },
		};

		const config = statusConfig[status];
		return (
			<Badge variant="dot" color={config.color}>
				{config.label}
			</Badge>
		);
	};

	// Handlers
	const handleView = (id: number) => {
		console.log('View user:', id);
	};

	const handleEdit = (id: number) => {
		console.log('Edit user:', id);
	};

	const handleDelete = (id: number) => {
		console.log('Delete user:', id);
	};

	const handleAddUser = () => {
		console.log('Add user');
	};

	// Filtered and sorted records
	const records = useMemo(() => {
		let filtered = mockUsers.filter(
			user =>
				user.name.toLowerCase().includes(search.toLowerCase()) ||
				user.email.toLowerCase().includes(search.toLowerCase()) ||
				user.department?.toLowerCase().includes(search.toLowerCase())
		);

		// Sorting
		if (sortStatus.columnAccessor) {
			filtered = [...filtered].sort((a, b) => {
				const accessor = sortStatus.columnAccessor as keyof User;
				const aValue = a[accessor];
				const bValue = b[accessor];

				if (aValue === undefined && bValue === undefined) return 0;
				if (aValue === undefined) return 1;
				if (bValue === undefined) return -1;

				if (aValue < bValue) return sortStatus.direction === 'asc' ? -1 : 1;
				if (aValue > bValue) return sortStatus.direction === 'asc' ? 1 : -1;
				return 0;
			});
		}

		// Pagination
		const start = (page - 1) * pageSize;
		const end = start + pageSize;
		return filtered.slice(start, end);
	}, [search, sortStatus, page, pageSize]);

	const totalRecords = useMemo(() => {
		return mockUsers.filter(
			user =>
				user.name.toLowerCase().includes(search.toLowerCase()) ||
				user.email.toLowerCase().includes(search.toLowerCase()) ||
				user.department?.toLowerCase().includes(search.toLowerCase())
		).length;
	}, [search]);

	const columns = getUserListColumns(t, getRoleBadge, getStatusBadge, handleView, handleEdit, handleDelete);

	return (
		<Stack gap="lg">
			<Title order={2}>{t('nav.users')}</Title>

			<Card shadow="sm" radius="md" withBorder p={0}>
				<Box p="lg">
					<Group justify="space-between">
						<TextInput
							placeholder={t('users.search_placeholder')}
							leftSection={<IconSearch size={16} />}
							value={search}
							onChange={e => setSearch(e.currentTarget.value)}
							style={{ maxWidth: 300 }}
						/>
						<Button leftSection={<IconPlus size={16} />} onClick={handleAddUser}>
							{t('users.add_user')}
						</Button>
					</Group>
				</Box>

				<DataTable
					withColumnBorders
					striped
					highlightOnHover
					records={records}
					columns={columns}
					totalRecords={totalRecords}
					recordsPerPage={pageSize}
					page={page}
					onPageChange={setPage}
					recordsPerPageOptions={[5, 10, 20, 50]}
					onRecordsPerPageChange={setPageSize}
					sortStatus={sortStatus}
					onSortStatusChange={setSortStatus}
				paginationText={({ from, to, totalRecords }) =>
					t('products.showing_results', { from, to, total: totalRecords })
				}
					recordsPerPageLabel={t('products.records_per_page')}
					style={{
						borderTop: `1px solid ${
							colorScheme === 'dark' ? 'var(--mantine-color-dark-4)' : 'var(--mantine-color-gray-3)'
						}`,
					}}
				/>
			</Card>
		</Stack>
	);
}

export default UserList;
