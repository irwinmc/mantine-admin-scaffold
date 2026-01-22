/**
 * NotificationsCard - 通知设置卡片
 */

import { Stack, Switch, Text, Divider, Box } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { SectionCard } from '@/components/common/SectionCard';
import classes from '../Settings.module.css';

export function NotificationsCard() {
	const { t } = useTranslation();

	return (
		<SectionCard title={t('settings.notifications')}>
			<Stack gap="md">
				<Box>
					<Text className={classes.sectionSubtitle}>Communication Preferences</Text>
					<Stack gap="sm">
						<Switch
							label={t('settings.email_notifications')}
							description="Receive notifications via email"
							defaultChecked
						/>
						<Switch
							label={t('settings.push_notifications')}
							description="Receive push notifications on your device"
							defaultChecked
						/>
						<Switch label={t('settings.sms_notifications')} description="Receive notifications via SMS" />
					</Stack>
				</Box>

				<Divider />

				<Box>
					<Text className={classes.sectionSubtitle}>Marketing & Updates</Text>
					<Stack gap="sm">
						<Switch
							label={t('settings.marketing_emails')}
							description="Receive promotional and marketing emails"
						/>
						<Switch
							label={t('settings.product_updates')}
							description="Get notified about new features and updates"
							defaultChecked
						/>
					</Stack>
				</Box>
			</Stack>
		</SectionCard>
	);
}
