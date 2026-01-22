/**
 * TwoFactorAuthCard - 两步验证卡片
 */

import { Stack, Switch } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { SectionCard } from '@/components/common/SectionCard';

export function TwoFactorAuthCard() {
	const { t } = useTranslation();

	return (
		<SectionCard title={t('settings.two_factor_auth')}>
			<Stack gap="md">
				<Switch label={t('settings.enable_2fa')} description="Add an extra layer of security to your account" />
			</Stack>
		</SectionCard>
	);
}
