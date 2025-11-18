import {
	Stack,
	Title,
	Grid,
	TextInput,
	Textarea,
	Button,
	Switch,
	Select,
	Group,
	Text,
	Divider,
	Avatar,
	FileButton,
	Alert,
	Tabs,
	Box,
} from '@mantine/core';
import { IconAlertTriangle, IconUser, IconLock, IconSettings } from '@tabler/icons-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SectionCard } from '@/components';
import classes from './Settings.module.css';

export function Settings() {
	const { t } = useTranslation();
	const [file, setFile] = useState<File | null>(null);

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
						{/* Profile Settings */}
						<SectionCard title={t('settings.profile_settings')}>
							<Stack gap="md">
								<Group>
									<Avatar
										src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
										size={80}
										radius="md"
									/>
									<Stack gap="xs">
										<FileButton onChange={setFile} accept="image/png,image/jpeg">
											{props => (
												<Button {...props} size="sm" variant="light">
													{t('settings.upload_photo')}
												</Button>
											)}
										</FileButton>
										{file && (
											<Text size="xs" c="dimmed">
												{t('settings.selected')}: {file.name}
											</Text>
										)}
									</Stack>
								</Group>

								<Grid>
									<Grid.Col span={{ base: 12, sm: 6 }}>
										<TextInput
											label={t('settings.full_name')}
											placeholder={t('settings.full_name_placeholder')}
										/>
									</Grid.Col>
									<Grid.Col span={{ base: 12, sm: 6 }}>
										<TextInput
											label={t('settings.email')}
											placeholder={t('settings.email_placeholder')}
											type="email"
										/>
									</Grid.Col>
								</Grid>

								<TextInput label={t('settings.phone')} placeholder={t('settings.phone_placeholder')} />

								<Textarea
									label={t('settings.bio')}
									placeholder={t('settings.bio_placeholder')}
									rows={4}
									className={classes.bioTextarea}
								/>

								<Group justify="flex-end">
									<Button>{t('settings.save_profile')}</Button>
								</Group>
							</Stack>
						</SectionCard>

						{/* Danger Zone */}
						<SectionCard title={t('settings.danger_zone')}>
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
						</SectionCard>
					</Stack>
				</Tabs.Panel>

				{/* Security Tab */}
				<Tabs.Panel value="security">
					<Stack gap="lg">
						{/* Password */}
						<SectionCard title={t('settings.change_password')}>
							<Stack gap="md">
								<TextInput
									label={t('settings.current_password')}
									placeholder={t('settings.current_password_placeholder')}
									type="password"
								/>

								<Grid>
									<Grid.Col span={{ base: 12, sm: 6 }}>
										<TextInput
											label={t('settings.new_password')}
											placeholder={t('settings.new_password_placeholder')}
											type="password"
										/>
									</Grid.Col>
									<Grid.Col span={{ base: 12, sm: 6 }}>
										<TextInput
											label={t('settings.confirm_password')}
											placeholder={t('settings.confirm_password_placeholder')}
											type="password"
										/>
									</Grid.Col>
								</Grid>

								<Group justify="flex-end">
									<Button>{t('settings.update_password')}</Button>
								</Group>
							</Stack>
						</SectionCard>

						{/* Two-Factor Authentication */}
						<SectionCard title={t('settings.two_factor_auth')}>
							<Stack gap="md">
								<Switch
									label={t('settings.enable_2fa')}
									description="Add an extra layer of security to your account"
								/>
							</Stack>
						</SectionCard>
					</Stack>
				</Tabs.Panel>

				{/* Preferences Tab */}
				<Tabs.Panel value="preferences">
					<Stack gap="lg">
						{/* General Preferences */}
						<SectionCard title={t('settings.preferences')}>
							<Stack gap="md">
								<Grid>
									<Grid.Col span={{ base: 12, sm: 6 }}>
										<Select
											label={t('settings.language')}
											placeholder={t('settings.select_language')}
											data={[
												{ value: 'en', label: 'English' },
												{ value: 'zh_cn', label: '简体中文' },
												{ value: 'jp', label: '日本語' },
											]}
											defaultValue="en"
										/>
									</Grid.Col>
									<Grid.Col span={{ base: 12, sm: 6 }}>
										<Select
											label={t('settings.timezone')}
											placeholder={t('settings.select_timezone')}
											data={[
												{ value: 'utc', label: 'UTC' },
												{ value: 'est', label: 'EST' },
												{ value: 'pst', label: 'PST' },
												{ value: 'cst', label: 'CST' },
											]}
											defaultValue="utc"
										/>
									</Grid.Col>
								</Grid>

								<Select
									label={t('settings.date_format')}
									placeholder={t('settings.select_date_format')}
									data={[
										{ value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
										{ value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
										{ value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
									]}
									defaultValue="MM/DD/YYYY"
								/>
							</Stack>
						</SectionCard>

						{/* Notifications */}
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
										<Switch
											label={t('settings.sms_notifications')}
											description="Receive notifications via SMS"
										/>
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
					</Stack>
				</Tabs.Panel>
			</Tabs>
		</Stack>
	);
}
