import { Modal, Text, Stack, Group, Badge, Divider } from '@mantine/core';
import { IconInfoCircle, IconPhoto, IconTag, IconHash, IconCalendar, IconUser } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { type Category, CategoryStatus } from '../types';
import { StatusBadge } from '@/components';

interface ViewCategoryModalProps {
	opened: boolean;
	onClose: () => void;
	category: Category | null;
	categories: Category[];
}

const InfoItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) => (
	<Group gap="md" align="center" wrap="nowrap">
		{icon}
		<Text size="sm" c="dimmed" style={{ minWidth: '120px', flexShrink: 0 }}>
			{label}:
		</Text>
		<div style={{ flex: 1 }}>{value}</div>
	</Group>
);

export function ViewCategoryModal({ opened, onClose, category, categories }: ViewCategoryModalProps) {
	const { t } = useTranslation();

	if (!category) return null;

	const parentCategory = categories.find(cat => cat.id === category.parentId);

	const childCategories = categories.filter(cat => cat.parentId === category.id);

	const statusMap = {
		[CategoryStatus.ACTIVE]: { color: 'green', label: t('categories.status_active') },
		[CategoryStatus.INACTIVE]: { color: 'red', label: t('categories.status_inactive') },
	};

	return (
		<Modal.Root opened={opened} onClose={onClose} size="lg" centered>
			<Modal.Overlay blur={2} />
			<Modal.Content>
				<Modal.Header>
					<Modal.Title>
						<Text size="lg" fw={600}>
							{t('categories.view_category')}
						</Text>
					</Modal.Title>
					<Modal.CloseButton />
				</Modal.Header>
				<Modal.Body p={0}>
					<Divider />

					<Stack gap="sm" p="md">
						<InfoItem
							icon={<IconTag size={16} />}
							label={t('categories.name')}
							value={<Text fw={500}>{category.name}</Text>}
						/>
						<Divider variant="dashed" />

						<InfoItem
							icon={<IconHash size={16} />}
							label={t('categories.slug')}
							value={
								<Text size="sm" ff="monospace" c="blue">
									{category.slug}
								</Text>
							}
						/>
						<Divider variant="dashed" />

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
						<Divider variant="dashed" />

						<InfoItem
							icon={<IconHash size={16} />}
							label={t('categories.sort_order')}
							value={<Text size="sm">{category.sortOrder}</Text>}
						/>
						<Divider variant="dashed" />

						<InfoItem
							icon={<IconInfoCircle size={16} />}
							label={t('categories.status')}
							value={<StatusBadge status={category.status} statusMap={statusMap} />}
						/>

						{childCategories.length > 0 && (
							<>
								<Divider variant="dashed" />
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
							</>
						)}
						<Divider variant="dashed" />

						<InfoItem
							icon={<IconInfoCircle size={16} />}
							label={t('categories.description')}
							value={
								category.description ? (
									<Text size="sm">{category.description}</Text>
								) : (
									<Text size="sm" c="dimmed" fs="italic">
										{t('categories.no_description')}
									</Text>
								)
							}
						/>
						<Divider variant="dashed" />

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
												maxWidth: '100px',
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
						<Divider variant="dashed" />

						<InfoItem
							icon={<IconCalendar size={16} />}
							label={t('categories.created_at')}
							value={
								<Text size="sm">
									{category.createdAt ? new Date(category.createdAt).toLocaleString() : '-'}
								</Text>
							}
						/>
						<Divider variant="dashed" />

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
				</Modal.Body>
			</Modal.Content>
		</Modal.Root>
	);
}
