import { Stack, Title, Tabs } from '@mantine/core';
import { IconUser, IconLock, IconSettings } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import {
	ProfileSettingsCard,
	DangerZoneCard,
	PasswordChangeCard,
	TwoFactorAuthCard,
	PreferencesCard,
	NotificationsCard,
} from './components';
import classes from './Settings.module.css';

export function Settings() {
	const { t } = useTranslation();

	return (
		<Stack gap="lg">
			<Title order={2}>{t('nav.settings')}</Title>

			<Tabs defaultValue="profile" className={classes.settingsTabs}>
				<Tabs.List>
					<Tabs.Tab value="profile" leftSection={<IconUser size={16} />}>
						{t('settings.profile')}
					</Tabs.Tab>
					<Tabs.Tab value="security" leftSection={<IconLock size={16} />}>
						{t('settings.security')}
					</Tabs.Tab>
					<Tabs.Tab value="preferences" leftSection={<IconSettings size={16} />}>
						{t('settings.preferences')}
					</Tabs.Tab>
				</Tabs.List>

				{/* Profile Tab */}
				<Tabs.Panel value="profile">
					<Stack gap="lg">
						<ProfileSettingsCard />
						<DangerZoneCard />
					</Stack>
				</Tabs.Panel>

				{/* Security Tab */}
				<Tabs.Panel value="security">
					<Stack gap="lg">
						<PasswordChangeCard />
						<TwoFactorAuthCard />
					</Stack>
				</Tabs.Panel>

				{/* Preferences Tab */}
				<Tabs.Panel value="preferences">
					<Stack gap="lg">
						<PreferencesCard />
						<NotificationsCard />
					</Stack>
				</Tabs.Panel>
			</Tabs>
		</Stack>
	);
}
