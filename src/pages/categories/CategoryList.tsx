/**
 * CategoryList 页面 - 分类列表（嵌套显示）
 */

import { useState, useMemo } from 'react';
import { Stack, Title, TextInput, Button, Box, Group, Card, Divider } from '@mantine/core';
import { DataTable, type DataTableSortStatus } from 'mantine-datatable';
import { IconSearch, IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { StatusBadge } from './components';
import { getCategoryListColumns } from './CategoryListColumns';
import { useCategoriesStore, buildCategoryTree } from './store';
import { DEFAULT_PAGE_SIZE, PAGE_SIZE_OPTIONS } from './constants';
import type { Category, CategoryWithLevel } from './types';
import { flattenCategories } from './utils/flattenCategories';
import { useCategoryFilter } from './hooks/useCategoryFilter';
import { DeleteCategoryModal } from './components/DeleteCategoryModal';

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

	const treeCategories = useMemo(() => buildCategoryTree(categories), [categories]);

	const flatCategories = useMemo(
		() => flattenCategories(treeCategories, expandedCategoryIds),
		[treeCategories, expandedCategoryIds]
	);

	const filteredCategories = useCategoryFilter(flatCategories, search);

	const records = useMemo(() => {
		if (search) {
			return filteredCategories;
		}

		const from = (page - 1) * pageSize;
		const to = from + pageSize;
		return filteredCategories.slice(from, to);
	}, [page, pageSize, search, filteredCategories]);

	const totalRecords = filteredCategories.length;

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

	const handleToggleExpand = (id: number) => {
		setExpandedCategoryIds(prev =>
			prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
		);
	};

	const columns = getCategoryListColumns({
		t,
		getStatusBadge,
		handleView,
		handleEdit,
		handleDelete,
		expandedCategoryIds,
		onToggleExpand: handleToggleExpand,
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
					/>
				</Card>
			</Stack>

			<DeleteCategoryModal
				opened={deleteModalOpened}
				categoryName={categoryToDelete?.name}
				onConfirm={handleConfirmDelete}
				onCancel={handleCancelDelete}
			/>
		</>
	);
}

export default CategoryList;
