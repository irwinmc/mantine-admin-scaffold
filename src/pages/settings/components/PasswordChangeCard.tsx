/**
 * PasswordChangeCard - 密码修改卡片
 */

import { Stack, Grid, TextInput, Button, Group } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { SectionCard } from '@/components/common/SectionCard';

export function PasswordChangeCard() {
	const { t } = useTranslation();

	return (
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
	);
}
