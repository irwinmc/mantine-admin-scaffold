/**
 * CategoryList 页面 - 分类列表（嵌套显示）
 */

import { useState, useMemo } from 'react';
import { Stack, Title, TextInput, Button, Box, Group, Card, Divider } from '@mantine/core';
import { DataTable, type DataTableSortStatus } from 'mantine-datatable';
import { IconSearch, IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { StatusBadge } from '../../components';
import { getCategoryListColumns } from './CategoryListColumns';
import { useCategoriesStore, buildCategoryTree } from './store';
import { DEFAULT_PAGE_SIZE, PAGE_SIZE_OPTIONS, CATEGORY_STATUS_MAP } from './constants';
import type { Category, CategoryWithLevel, CategoryFormValues } from './types';
import { flattenCategories } from './utils/flattenCategories';
import { useCategoryFilter } from './hooks/useCategoryFilter';
import { DeleteCategoryModal, CreateCategoryModal, EditCategoryModal } from './components';

export function CategoryList() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const categories = useCategoriesStore(state => state.categories);
	const addCategory = useCategoriesStore(state => state.addCategory);
	const updateCategory = useCategoriesStore(state => state.updateCategory);
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
	
	// 添加/编辑Modal状态
	const [formModalOpened, setFormModalOpened] = useState(false);
	const [editingCategory, setEditingCategory] = useState<Category | null>(null);

	const treeCategories = useMemo(() => buildCategoryTree(categories, sortStatus), [categories, sortStatus]);

	const flatCategories = useMemo(
		() => flattenCategories(treeCategories, expandedCategoryIds),
		[treeCategories, expandedCategoryIds],
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

	const getStatusBadge = (status: number) => {
		const statusMap = Object.fromEntries(
			Object.entries(CATEGORY_STATUS_MAP).map(([key, config]) => [
				key,
				{
					color: config.color,
					label: t(`categories.status_${key === '1' ? 'active' : 'inactive'}`),
				},
			]),
		);
		return <StatusBadge status={status} statusMap={statusMap} />;
	};

	const handleView = (id: number) => {
		console.log('View category:', id);
		navigate(`/categories/${id}`);
	};

	const handleEdit = (id: number) => {
		const category = categories.find(c => c.id === id);
		if (category) {
			setEditingCategory(category);
			setFormModalOpened(true);
		}
	};

	const handleAdd = () => {
		setEditingCategory(null);
		setFormModalOpened(true);
	};

	const handleFormSubmit = (values: CategoryFormValues) => {
		if (editingCategory) {
			// 编辑模式
			updateCategory(editingCategory.id, values);
		} else {
			// 添加模式
			addCategory(values);
		}
		setFormModalOpened(false);
		setEditingCategory(null);
	};

	const handleFormClose = () => {
		setFormModalOpened(false);
		setEditingCategory(null);
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
		setExpandedCategoryIds(prev => (prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]));
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
							<Button leftSection={<IconPlus size={16} />} onClick={handleAdd}>
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

			<CreateCategoryModal
				opened={formModalOpened && !editingCategory}
				onClose={handleFormClose}
				onSubmit={handleFormSubmit}
				categories={categories}
			/>

			<EditCategoryModal
				opened={formModalOpened && !!editingCategory}
				onClose={handleFormClose}
				onSubmit={handleFormSubmit}
				category={editingCategory}
				categories={categories}
			/>
		</>
	);
}

export default CategoryList;
