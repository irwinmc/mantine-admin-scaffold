/**
 * ProductVariantsCard - 产品变体管理卡片组件
 */

import { useState } from 'react';
import { Box, Card, Table, ActionIcon, Group, Button, Text, useMantineColorScheme } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import type { ProductVariant } from '../types';
import { ProductVariantModal } from './ProductVariantModal';

interface ProductVariantsCardProps {
	variants: ProductVariant[];
	onChange: (variants: ProductVariant[]) => void;
}

export function ProductVariantsCard({ variants, onChange }: ProductVariantsCardProps) {
	const { t } = useTranslation();
	const { colorScheme } = useMantineColorScheme();
	const [modalOpened, setModalOpened] = useState(false);
	const [editingVariant, setEditingVariant] = useState<ProductVariant | null>(null);

	const handleAdd = () => {
		setEditingVariant(null);
		setModalOpened(true);
	};

	const handleEdit = (variant: ProductVariant) => {
		setEditingVariant(variant);
		setModalOpened(true);
	};

	const handleDelete = (id: string) => {
		onChange(variants.filter(v => v.id !== id));
	};

	const handleSave = (variant: ProductVariant) => {
		if (editingVariant) {
			// Update existing variant
			onChange(variants.map(v => (v.id === variant.id ? variant : v)));
		} else {
			// Add new variant
			onChange([...variants, { ...variant, id: Math.random().toString(36).substr(2, 9) }]);
		}
		setModalOpened(false);
		setEditingVariant(null);
	};

	const handleCancel = () => {
		setModalOpened(false);
		setEditingVariant(null);
	};

	return (
		<>
			<Card shadow="sm" radius="md" withBorder padding={0} style={{ overflow: 'hidden' }}>
				{/* Card Header */}
				<Box
					p="md"
					bg={colorScheme === 'dark' ? 'dark.6' : 'gray.1'}
					style={{
						position: 'relative',
						borderBottom: `1px solid ${
							colorScheme === 'dark' ? 'var(--mantine-color-dark-4)' : 'var(--mantine-color-gray-3)'
						}`,
					}}
				>
					<Text size="md" fw={600} c={colorScheme === 'dark' ? 'gray.3' : 'gray.8'}>
						{t('product_edit.variants')}
					</Text>
					<Button
						size="xs"
						onClick={handleAdd}
						style={{
							position: 'absolute',
							right: 'var(--mantine-spacing-md)',
							top: '50%',
							transform: 'translateY(-50%)',
						}}
					>
						{t('product_edit.add_variant')}
					</Button>
				</Box>

				{/* Card Content */}
				<Table striped highlightOnHover withColumnBorders>
					<Table.Thead>
						<Table.Tr>
							<Table.Th>{t('product_edit.size')}</Table.Th>
							<Table.Th>{t('product_edit.color')}</Table.Th>
							<Table.Th>{t('common.price')}</Table.Th>
							<Table.Th>{t('product_edit.stock_quantity')}</Table.Th>
							<Table.Th>{t('common.actions')}</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>
						{variants.length === 0 ? (
							<Table.Tr>
								<Table.Td colSpan={5} style={{ textAlign: 'center' }}>
									<Text c="dimmed" size="sm">
										{t('product_edit.no_variants')}
									</Text>
								</Table.Td>
							</Table.Tr>
						) : (
							variants.map(variant => (
								<Table.Tr key={variant.id}>
									<Table.Td>{variant.size || '-'}</Table.Td>
									<Table.Td>{variant.color || '-'}</Table.Td>
									<Table.Td>${variant.price.toFixed(2)}</Table.Td>
									<Table.Td>{variant.stock}</Table.Td>
									<Table.Td>
										<Group gap="xs">
											<ActionIcon
												variant="subtle"
												color="blue"
												onClick={() => handleEdit(variant)}
											>
												<IconPencil size={16} />
											</ActionIcon>
											<ActionIcon
												variant="subtle"
												color="red"
												onClick={() => handleDelete(variant.id)}
											>
												<IconTrash size={16} />
											</ActionIcon>
										</Group>
									</Table.Td>
								</Table.Tr>
							))
						)}
					</Table.Tbody>
				</Table>
			</Card>

			<ProductVariantModal
				opened={modalOpened}
				variant={editingVariant}
				onSave={handleSave}
				onCancel={handleCancel}
			/>
		</>
	);
}
