/**
 * CategoryList DataTable 列配置
 */

import type { ReactElement } from 'react';
import { Text, ActionIcon, Group, Avatar, Stack, Badge, Box } from '@mantine/core';
import { IconEdit, IconTrash, IconFolder, IconFolderOpen, IconChevronRight } from '@tabler/icons-react';
import type { DataTableColumn } from 'mantine-datatable';
import type { Category } from './types';

interface ColumnsParams {
	t: (key: string) => string;
	getStatusBadge: (status: number) => ReactElement;
	handleEdit: (id: number) => void;
	handleDelete: (id: number) => void;
	expandedCategoryIds: number[];
	onToggleExpand: (id: number) => void;
}

export const getCategoryListColumns = ({
	t,
	getStatusBadge,
	handleEdit,
	handleDelete,
	expandedCategoryIds,
	onToggleExpand,
}: ColumnsParams): DataTableColumn<Category>[] => [
	{
		accessor: 'name',
		title: t('categories.category_info'),
		sortable: true,
		width: 350,
		render: category => {
			const hasChildren = category.children && category.children.length > 0;
			const isExpanded = expandedCategoryIds.includes(category.id);

			return (
				<Group gap="md" wrap="nowrap" py={4}>
					{hasChildren && (
						<IconChevronRight
							size={16}
							style={{
								transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
								transition: 'transform 0.2s ease',
								cursor: 'pointer',
							}}
							onClick={() => onToggleExpand(category.id)}
						/>
					)}
					{!hasChildren && <Box w={16} />}
					<Avatar src={category.image || ''} alt={category.name} size={40} radius="sm">
						{category.parentId === 0 ? <IconFolder size={20} /> : <IconFolderOpen size={20} />}
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
			);
		},
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
			<Text size="sm">{category.createdAt ? new Date(category.createdAt).toLocaleDateString() : '-'}</Text>
		),
	},
	{
		accessor: 'actions',
		title: t('categories.actions'),
		sortable: false,
		width: 120,
		textAlign: 'center',
		render: category => (
			<Group gap={4} justify="center" wrap="nowrap">
				<ActionIcon size="sm" variant="subtle" color="green" onClick={() => handleEdit(category.id)}>
					<IconEdit size={16} />
				</ActionIcon>
				<ActionIcon size="sm" variant="subtle" color="red" onClick={() => handleDelete(category.id)}>
					<IconTrash size={16} />
				</ActionIcon>
			</Group>
		),
	},
];
