/**
 * PreferencesCard - 偏好设置卡片
 */

import { Stack, Grid, Select } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { SectionCard } from '@/components/common/SectionCard';

export function PreferencesCard() {
	const { t } = useTranslation();

	return (
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
	);
}
