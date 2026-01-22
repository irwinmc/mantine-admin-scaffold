/**
 * ProfileSettingsCard - 个人资料设置卡片
 */

import { Stack, Grid, TextInput, Textarea, Button, Group, Avatar, FileButton, Text } from '@mantine/core';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SectionCard } from '@/components/common/SectionCard';
import classes from '../Settings.module.css';

export function ProfileSettingsCard() {
	const { t } = useTranslation();
	const [file, setFile] = useState<File | null>(null);

	return (
		<SectionCard title={t('settings.profile_settings')}>
			<SectionCard.Body>
				<Stack gap="md">
					<Group>
						<Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" size={80} radius="md" />
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
			</SectionCard.Body>
		</SectionCard>
	);
}
