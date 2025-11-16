import { Group, Text, ActionIcon, rem } from '@mantine/core';
import { IconBrandGithub, IconBrandTwitter, IconBrandLinkedin } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

export function AppFooter() {
	const { t } = useTranslation();

	return (
		<Group w="100%" h="100%" px="md" justify="space-between">
			<Text size="sm" c="dimmed">
				{t('footer.copyright')}
			</Text>

			<Group gap="xs">
				<ActionIcon
					variant="subtle"
					color="gray"
					component="a"
					href="https://github.com"
					target="_blank"
					size="sm"
				>
					<IconBrandGithub style={{ width: rem(18), height: rem(18) }} />
				</ActionIcon>
				<ActionIcon
					variant="subtle"
					color="gray"
					component="a"
					href="https://twitter.com"
					target="_blank"
					size="sm"
				>
					<IconBrandTwitter style={{ width: rem(18), height: rem(18) }} />
				</ActionIcon>
				<ActionIcon
					variant="subtle"
					color="gray"
					component="a"
					href="https://linkedin.com"
					target="_blank"
					size="sm"
				>
					<IconBrandLinkedin style={{ width: rem(18), height: rem(18) }} />
				</ActionIcon>
			</Group>
		</Group>
	);
}
