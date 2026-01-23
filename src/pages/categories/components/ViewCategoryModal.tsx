import { Modal, Text, Stack, Group, Badge, Grid, Divider } from '@mantine/core';
import { IconInfoCircle, IconPhoto, IconTag, IconHash, IconCalendar, IconUser } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import type { Category } from '../types';
import { CategoryStatus } from '../types';
import { StatusBadge } from '../../../components';

interface ViewCategoryModalProps {
	opened: boolean;
	onClose: () => void;
	category: Category | null;
	categories: Category[];
}

// 将InfoItem组件移到外部
const InfoItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) => (
	<Group gap="sm" align="flex-start">
		<div style={{ marginTop: 2 }}>{icon}</div>
		<div style={{ flex: 1 }}>
			<Text size="sm" c="dimmed" mb={2}>
				{label}
			</Text>
			<div>{value}</div>
		</div>
	</Group>
);

export function ViewCategoryModal({ opened, onClose, category, categories }: ViewCategoryModalProps) {
	const { t } = useTranslation();

	if (!category) return null;

	// 获取父分类信息
	const parentCategory = categories.find(cat => cat.id === category.parentId);

	// 获取子分类列表
	const childCategories = categories.filter(cat => cat.parentId === category.id);

	const statusMap = {
		[CategoryStatus.ACTIVE]: { color: 'green', label: t('categories.status_active') },
		[CategoryStatus.INACTIVE]: { color: 'red', label: t('categories.status_inactive') },
	};

	return (
		<Modal.Root opened={opened} onClose={onClose} size="lg" centered>
			<Modal.Overlay />
			<Modal.Content>
				<Modal.Header>
					<Modal.Title>
						<Text size="lg" fw={600}>
							{t('categories.view_category')}
						</Text>
					</Modal.Title>
					<Modal.CloseButton />
				</Modal.Header>
				<Modal.Body>
					<Grid p="md">
						{/* 左列 */}
						<Grid.Col span={5.5}>
							<Stack gap="lg">
								<InfoItem
									icon={<IconTag size={16} />}
									label={t('categories.name')}
									value={<Text fw={500}>{category.name}</Text>}
								/>

								<InfoItem
									icon={<IconHash size={16} />}
									label={t('categories.slug')}
									value={
										<Text ff="monospace" c="blue">
											{category.slug}
										</Text>
									}
								/>

								<InfoItem
									icon={<IconUser size={16} />}
									label={t('categories.parent_category')}
									value={
										parentCategory ? (
											<Badge variant="light" color="blue">
												{parentCategory.name}
											</Badge>
										) : (
											<Badge variant="light" color="gray">
												{t('categories.root_category')}
											</Badge>
										)
									}
								/>

								<InfoItem
									icon={<IconHash size={16} />}
									label={t('categories.sort_order')}
									value={<Text>{category.sortOrder}</Text>}
								/>

								<InfoItem
									icon={<IconInfoCircle size={16} />}
									label={t('categories.status')}
									value={<StatusBadge status={category.status} statusMap={statusMap} />}
								/>

								{/* 子分类 */}
								{childCategories.length > 0 && (
									<InfoItem
										icon={<IconTag size={16} />}
										label={t('categories.child_categories')}
										value={
											<Group gap="xs">
												{childCategories.map(child => (
													<Badge key={child.id} variant="light" color="green">
														{child.name}
													</Badge>
												))}
											</Group>
										}
									/>
								)}
							</Stack>
						</Grid.Col>

						{/* 分隔线 */}
						<Grid.Col span={1} style={{ display: 'flex', justifyContent: 'center', alignItems: 'stretch' }}>
							<Divider orientation="vertical" />
						</Grid.Col>

						{/* 右列 */}
						<Grid.Col span={5.5}>
							<Stack gap="lg">
								<InfoItem
									icon={<IconInfoCircle size={16} />}
									label={t('categories.description')}
									value={
										category.description ? (
											<Text>{category.description}</Text>
										) : (
											<Text c="dimmed" fs="italic">
												{t('categories.no_description')}
											</Text>
										)
									}
								/>

								<InfoItem
									icon={<IconPhoto size={16} />}
									label={t('categories.image')}
									value={
										category.image ? (
											<div>
												<img
													src={category.image}
													alt={category.name}
													style={{
														maxWidth: '100%',
														maxHeight: '120px',
														borderRadius: '8px',
														border: '1px solid var(--mantine-color-gray-3)',
													}}
												/>
												<Text size="xs" c="dimmed" mt="xs" style={{ wordBreak: 'break-all' }}>
													{category.image}
												</Text>
											</div>
										) : (
											<Text c="dimmed" fs="italic">
												{t('categories.no_image')}
											</Text>
										)
									}
								/>

								<InfoItem
									icon={<IconCalendar size={16} />}
									label={t('categories.created_at')}
									value={
										<Text size="sm">
											{category.createdAt ? new Date(category.createdAt).toLocaleString() : '-'}
										</Text>
									}
								/>

								<InfoItem
									icon={<IconCalendar size={16} />}
									label={t('categories.updated_at')}
									value={
										<Text size="sm">
											{category.updatedAt ? new Date(category.updatedAt).toLocaleString() : '-'}
										</Text>
									}
								/>
							</Stack>
						</Grid.Col>
					</Grid>
				</Modal.Body>
			</Modal.Content>
		</Modal.Root>
	);
}
