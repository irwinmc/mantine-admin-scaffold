import { Group, Text, Modal, Button, Stack } from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

interface DeleteCategoryModalProps {
	opened: boolean;
	categoryName: string | undefined;
	onConfirm: () => void;
	onCancel: () => void;
}

export function DeleteCategoryModal({
	opened,
	categoryName,
	onConfirm,
	onCancel,
}: DeleteCategoryModalProps) {
	const { t } = useTranslation();

	return (
		<Modal
			opened={opened}
			onClose={onCancel}
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
					{t('categories.delete_confirmation_message', { name: categoryName || '' })}
				</Text>

				<Group justify="flex-end" gap="sm">
					<Button variant="default" onClick={onCancel}>
						{t('common.cancel')}
					</Button>
					<Button color="red" onClick={onConfirm}>
						{t('common.delete')}
					</Button>
				</Group>
			</Stack>
		</Modal>
	);
}
