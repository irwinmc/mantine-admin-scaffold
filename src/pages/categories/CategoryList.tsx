/**
 * CategoryList 页面 - 分类列表（嵌套显示）
 */

import { useState, useMemo, useCallback } from 'react';
import { Stack, Title, TextInput, Button, Box, Group, Text, Modal, Card, Divider } from '@mantine/core';
import { DataTable, type DataTableSortStatus } from 'mantine-datatable';
import { IconSearch, IconPlus, IconAlertTriangle } from '@tabler/icons-react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { StatusBadge } from './components';
import { getCategoryListColumns } from './CategoryListColumns';
import { useCategoriesStore, buildCategoryTree } from './store';
import { DEFAULT_PAGE_SIZE, PAGE_SIZE_OPTIONS } from './constants';
import type { Category, CategoryWithLevel } from './types';

export function CategoryList() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const categories = useCategoriesStore(state => state.categories);
	const deleteCategory = useCategoriesStore(state => state.deleteCategory);

	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
	const [search, setSearch] = useState('');
	const [sortStatus, setSortStatus] = useState<DataTableSortStatus<Category>>({
		columnAccessor: 'sortOrder',
		direction: 'asc',
	});
	const [deleteModalOpened, setDeleteModalOpened] = useState(false);
	const [categoryToDelete, setCategoryToDelete] = useState<{ id: number; name: string } | null>(null);
	const [expandedCategoryIds, setExpandedCategoryIds] = useState<number[]>([]);

	// 构建树形结构的分类数据
	const treeCategories = useMemo(() => {
		return buildCategoryTree(categories);
	}, [categories]);

	// 扁平化树形结构用于搜索和分页
	const flattenCategories = useCallback(
		(cats: Category[]): CategoryWithLevel[] => {
			const result: CategoryWithLevel[] = [];

			const flatten = (categories: Category[], level = 0) => {
				categories.forEach(category => {
					result.push({ ...category, level });
					if (
						category.children &&
						category.children.length > 0 &&
						expandedCategoryIds.includes(category.id)
					) {
						flatten(category.children, level + 1);
					}
				});
			};

			flatten(cats);
			return result;
		},
		[expandedCategoryIds],
	);

	const records = useMemo(() => {
		const from = (page - 1) * pageSize;
		const to = from + pageSize;

		// 先扁平化，然后过滤搜索
		const flatCategories = flattenCategories(treeCategories);
		const filteredData = flatCategories.filter(
			category =>
				category.name.toLowerCase().includes(search.toLowerCase()) ||
				category.slug.toLowerCase().includes(search.toLowerCase()) ||
				(category.description && category.description.toLowerCase().includes(search.toLowerCase())),
		);

		// 如果有搜索条件，不进行分页，显示所有匹配结果
		if (search) {
			return filteredData;
		}

		return filteredData.slice(from, to);
	}, [page, pageSize, search, treeCategories, flattenCategories]);

	const totalRecords = useMemo(() => {
		const flatCategories = flattenCategories(treeCategories);
		return flatCategories.filter(
			category =>
				category.name.toLowerCase().includes(search.toLowerCase()) ||
				category.slug.toLowerCase().includes(search.toLowerCase()) ||
				(category.description && category.description.toLowerCase().includes(search.toLowerCase())),
		).length;
	}, [search, treeCategories, flattenCategories]);

	const getStatusBadge = (status: number) => <StatusBadge status={status} />;

	const handleView = (id: number) => {
		console.log('View category:', id);
		navigate(`/categories/${id}`);
	};

	const handleEdit = (id: number) => {
		console.log('Edit category:', id);
		navigate(`/categories/${id}/edit`);
	};

	const handleDelete = (id: number) => {
		const category = categories.find(c => c.id === id);
		if (category) {
			setCategoryToDelete({ id: category.id, name: category.name });
			setDeleteModalOpened(true);
		}
	};

	const handleConfirmDelete = () => {
		if (categoryToDelete) {
			deleteCategory(categoryToDelete.id);
			setDeleteModalOpened(false);
			setCategoryToDelete(null);
		}
	};

	const handleCancelDelete = () => {
		setDeleteModalOpened(false);
		setCategoryToDelete(null);
	};

	const columns = getCategoryListColumns({
		t,
		getStatusBadge,
		handleView,
		handleEdit,
		handleDelete,
		expandedCategoryIds,
	});

	return (
		<>
			<Stack gap="lg">
				<Group justify="space-between" align="center">
					<Title order={2}>{t('categories.title')}</Title>
				</Group>

				<Card p={0} radius="md" withBorder>
					<Box p="lg">
						<Group justify="space-between">
							<TextInput
								placeholder={t('categories.search_categories')}
								leftSection={<IconSearch size={16} />}
								value={search}
								onChange={e => setSearch(e.currentTarget.value)}
								style={{ flex: 1, maxWidth: 400 }}
							/>
							<Button leftSection={<IconPlus size={16} />} onClick={() => navigate('/categories/create')}>
								{t('categories.add_category')}
							</Button>
						</Group>
					</Box>

					<Divider />

					<DataTable<CategoryWithLevel>
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
						recordsPerPageOptions={PAGE_SIZE_OPTIONS}
						onRecordsPerPageChange={setPageSize}
						recordsPerPageLabel={t('categories.records_per_page')}
						paginationText={({ from, to, totalRecords }) =>
							t('categories.showing_results', { from, to, total: totalRecords })
						}
						paginationSize="sm"
						rowExpansion={{
							allowMultiple: true,
							expanded: {
								recordIds: expandedCategoryIds,
								onRecordIdsChange: setExpandedCategoryIds,
							},
							content: ({ record: category }) => {
								if (!category.children || category.children.length === 0) {
									return null;
								}

								return (
									<DataTable<Category>
										noHeader
										withColumnBorders
										records={category.children}
										columns={columns.map(col => ({
											...col,
											render: col.render
												? (childCategory: Category, index: number) => {
														if (col.accessor === 'name') {
															// 为子分类添加缩进
															const originalRender = col.render!(childCategory, index);
															return <Box ml={20}>{originalRender}</Box>;
														}
														return col.render!(childCategory, index);
													}
												: undefined,
										}))}
									/>
								);
							},
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
							{t('categories.delete_category')}
						</Text>
					</Group>
				}
				centered
				size="md"
			>
				<Stack gap="lg" mt="md">
					<Text size="sm">
						{t('categories.delete_confirmation_message', { name: categoryToDelete?.name || '' })}
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

export default CategoryList;
