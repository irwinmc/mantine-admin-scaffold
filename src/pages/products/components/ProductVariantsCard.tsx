/**
 * ProductVariantsCard - 产品变体管理卡片组件（仅展示和操作）
 */

import { Table, ActionIcon, Group, Button, Text } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { SectionCard } from '@/components';
import type { ProductVariant } from '../types';

interface ProductVariantsCardProps {
	variants: ProductVariant[];
	onAdd: () => void;
	onEdit: (variant: ProductVariant) => void;
	onDelete: (id: string) => void;
}

export function ProductVariantsCard({ variants, onAdd, onEdit, onDelete }: ProductVariantsCardProps) {
	const { t } = useTranslation();

	const rightSection = (
		<Button size="xs" onClick={onAdd}>
			{t('product_edit.add_variant')}
		</Button>
	);

	return (
		<SectionCard title={t('product_edit.variants')} rightSection={rightSection} contentPadding={0}>
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
										<ActionIcon variant="subtle" color="blue" onClick={() => onEdit(variant)}>
											<IconPencil size={16} />
										</ActionIcon>
										<ActionIcon variant="subtle" color="red" onClick={() => onDelete(variant.id)}>
											<IconTrash size={16} />
										</ActionIcon>
									</Group>
								</Table.Td>
							</Table.Tr>
						))
					)}
				</Table.Tbody>
			</Table>
		</SectionCard>
	);
}
