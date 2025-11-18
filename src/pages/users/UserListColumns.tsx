/**
 * UserList 表格列定义
 */

import type { ReactElement } from 'react';
import { Group, Avatar, Stack, Text, ActionIcon, Menu, rem } from '@mantine/core';
import { IconDots, IconEye, IconEdit, IconTrash } from '@tabler/icons-react';
import type { DataTableColumn } from 'mantine-datatable';
import type { User } from './types';

export const getUserListColumns = (
	t: (key: string) => string,
	getRoleBadge: (role: User['role']) => ReactElement,
	getStatusBadge: (status: User['status']) => ReactElement,
	handleView: (id: number) => void,
	handleEdit: (id: number) => void,
	handleDelete: (id: number) => void
): DataTableColumn<User>[] => {
	return [
		{
			accessor: 'name',
			title: t('users.user_info'),
			sortable: true,
			render: (user: User) => (
				<Group gap="sm" py={4}>
					<Avatar src={user.avatar} size={40} radius="sm" />
					<Stack gap={0}>
						<Text size="sm" fw={500}>
							{user.name}
						</Text>
						<Text size="xs" c="dimmed">
							{user.email}
						</Text>
					</Stack>
				</Group>
			),
		},
		{
			accessor: 'role',
			title: t('users.role'),
			sortable: true,
			render: (user: User) => getRoleBadge(user.role),
		},
		{
			accessor: 'status',
			title: t('users.status'),
			sortable: true,
			render: (user: User) => getStatusBadge(user.status),
		},
		{
			accessor: 'department',
			title: t('users.department'),
			sortable: true,
			render: (user: User) => <Text size="sm">{user.department || '-'}</Text>,
		},
		{
			accessor: 'joinDate',
			title: t('users.join_date'),
			sortable: true,
			render: (user: User) => <Text size="sm">{user.joinDate.toLocaleDateString()}</Text>,
		},
		{
			accessor: 'actions',
			title: t('common.actions'),
			textAlign: 'center',
			render: (user: User) => (
				<Menu shadow="md" width={180}>
					<Menu.Target>
						<ActionIcon variant="subtle" color="gray">
							<IconDots size={16} />
						</ActionIcon>
					</Menu.Target>
					<Menu.Dropdown>
						<Menu.Item
							leftSection={<IconEye style={{ width: rem(14), height: rem(14) }} />}
							onClick={() => handleView(user.id)}
						>
							{t('common.view')}
						</Menu.Item>
						<Menu.Item
							leftSection={<IconEdit style={{ width: rem(14), height: rem(14) }} />}
							onClick={() => handleEdit(user.id)}
						>
							{t('common.edit')}
						</Menu.Item>
						<Menu.Divider />
						<Menu.Item
							color="red"
							leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
							onClick={() => handleDelete(user.id)}
						>
							{t('common.delete')}
						</Menu.Item>
					</Menu.Dropdown>
				</Menu>
			),
		},
	];
};
