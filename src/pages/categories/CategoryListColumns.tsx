/**
 * CategoryList DataTable 列配置
 */

import type { ReactElement } from 'react';
import { Text, ActionIcon, Group, Avatar, Stack, Badge } from '@mantine/core';
import { IconEdit, IconTrash, IconEye, IconFolder, IconFolderOpen } from '@tabler/icons-react';
import type { DataTableColumn } from 'mantine-datatable';
import type { Category } from './types';

interface ColumnsParams {
	t: (key: string) => string;
	getStatusBadge: (status: number) => ReactElement;
	getParentName: (parentId: number, categories: Category[]) => string;
	handleView: (id: number) => void;
	handleEdit: (id: number) => void;
	handleDelete: (id: number) => void;
}

export const getCategoryListColumns = ({
	t,
	getStatusBadge,
	getParentName,
	handleView,
	handleEdit,
	handleDelete,
}: ColumnsParams): DataTableColumn<Category>[] => [
	{
		accessor: 'name',
		title: t('categories.category_info'),
		sortable: true,
		width: 300,
		render: category => (
			<Group gap="md" wrap="nowrap" py={4}>
				<Avatar src={category.image || ''} alt={category.name} size={40} radius="sm">
					{category.parentId === 0 ? (
						<IconFolder size={20} />
					) : (
						<IconFolderOpen size={20} />
					)}
				</Avatar>
				<Stack gap={4}>
					<Text fw={500} size="sm">
						{category.name}
					</Text>
					<Text size="xs" c="dimmed">
						{t('categories.slug')}: {category.slug}
					</Text>
				</Stack>
			</Group>
		),
	},
	{
		accessor: 'description',
		title: t('categories.description'),
		sortable: false,
		width: 200,
		render: category => (
			<Text size="sm" lineClamp={2} c={category.description ? undefined : 'dimmed'}>
				{category.description || t('categories.no_description')}
			</Text>
		),
	},
	{
		accessor: 'parentId',
		title: t('categories.parent_category'),
		sortable: true,
		width: 150,
		render: category => (
			<Text size="sm" c={category.parentId === 0 ? 'dimmed' : undefined}>
				{category.parentId === 0 ? t('categories.root_category') : getParentName(category.parentId, [])}
			</Text>
		),
	},
	{
		accessor: 'sortOrder',
		title: t('categories.sort_order'),
		sortable: true,
		width: 100,
		textAlign: 'center',
		render: category => (
			<Badge variant="outline" size="sm">
				{category.sortOrder}
			</Badge>
		),
	},
	{
		accessor: 'status',
		title: t('categories.status'),
		sortable: true,
		width: 100,
		textAlign: 'center',
		render: category => getStatusBadge(category.status),
	},
	{
		accessor: 'createdAt',
		title: t('categories.created_date'),
		sortable: true,
		width: 120,
		render: category => (
			<Text size="sm">
				{category.createdAt ? new Date(category.createdAt).toLocaleDateString() : '-'}
			</Text>
		),
	},
	{
		accessor: 'actions',
		title: t('categories.actions'),
		sortable: false,
		width: 120,
		textAlign: 'center',
		render: category => (
			<Group gap="xs" justify="center">
				<ActionIcon
					variant="subtle"
					color="blue"
					onClick={() => handleView(category.id)}
					title={t('common.view')}
				>
					<IconEye size={16} />
				</ActionIcon>
				<ActionIcon
					variant="subtle"
					color="orange"
					onClick={() => handleEdit(category.id)}
					title={t('common.edit')}
				>
					<IconEdit size={16} />
				</ActionIcon>
				<ActionIcon
					variant="subtle"
					color="red"
					onClick={() => handleDelete(category.id)}
					title={t('common.delete')}
				>
					<IconTrash size={16} />
				</ActionIcon>
			</Group>
		),
	},
];