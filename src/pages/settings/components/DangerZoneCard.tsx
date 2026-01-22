/**
 * DangerZoneCard - 危险区域卡片
 */

import { Stack, Button, Group, Alert } from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { SectionCard } from '@/components/common/SectionCard';

export function DangerZoneCard() {
	const { t } = useTranslation();

	return (
		<SectionCard title={t('settings.danger_zone')}>
			<SectionCard.Body>
				<Stack gap="md">
					<Alert
						icon={<IconAlertTriangle size={16} />}
						title={t('settings.danger_zone_warning')}
						color="red"
						variant="light"
					>
						{t('settings.danger_zone_description')}
					</Alert>

					<Group justify="flex-end">
						<Button variant="light" color="red">
							{t('settings.delete_account')}
						</Button>
					</Group>
				</Stack>
			</SectionCard.Body>
		</SectionCard>
	);
}
