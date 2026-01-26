import {
	Group,
	Burger,
	Text,
	ActionIcon,
	useMantineColorScheme,
	rem,
	Menu,
	Avatar,
	UnstyledButton,
	Box,
} from '@mantine/core';
import {
	IconSun,
	IconMoon,
	IconBell,
	IconSettings,
	IconLogout,
	IconUser,
	IconChevronDown,
	IconMenu2,
	IconMenuDeep,
} from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';

interface AppHeaderProps {
	opened: boolean;
	toggle: () => void;
	collapsed?: boolean;
	onToggleCollapse?: () => void;
	isMobile?: boolean;
}

export function AppHeader({ opened, toggle, collapsed = false, onToggleCollapse, isMobile = false }: AppHeaderProps) {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const { t, i18n } = useTranslation();
	const { user, logout } = useAuth();

	const handleLanguageChange = (lang: string) => {
		i18n.changeLanguage(lang);
	};

	const handleLogout = async () => {
		await logout();
	};

	return (
		<Group h="100%" px="md" justify="space-between" w="100%">
			{/* 左侧：折叠按钮或汉堡菜单 */}
			<Group>
				{isMobile ? (
					<Burger opened={opened} onClick={toggle} size="sm" />
				) : (
					<ActionIcon
						variant="subtle"
						color="gray"
						onClick={onToggleCollapse}
						title={collapsed ? t('header.expand_sidebar') : t('header.collapse_sidebar')}
						size="lg"
					>
						{collapsed ? (
							<IconMenu2 style={{ width: rem(20), height: rem(20) }} />
						) : (
							<IconMenuDeep style={{ width: rem(20), height: rem(20) }} />
						)}
					</ActionIcon>
				)}
			</Group>

			{/* 右侧：功能按钮 */}
			<Group gap="xs">
				<ActionIcon
					variant="subtle"
					color="gray"
					onClick={() => toggleColorScheme()}
					title={t('header.toggle_theme')}
				>
					{colorScheme === 'dark' ? (
						<IconSun style={{ width: rem(20), height: rem(20) }} />
					) : (
						<IconMoon style={{ width: rem(20), height: rem(20) }} />
					)}
				</ActionIcon>

				<Menu shadow="md" width={150}>
					<Menu.Target>
						<ActionIcon variant="subtle" color="gray">
							<IconBell style={{ width: rem(20), height: rem(20) }} />
						</ActionIcon>
					</Menu.Target>
					<Menu.Dropdown>
						<Menu.Label>{t('header.notifications')}</Menu.Label>
						<Menu.Item>{t('header.no_notifications')}</Menu.Item>
					</Menu.Dropdown>
				</Menu>

				<Menu shadow="md" width={150}>
					<Menu.Target>
						<ActionIcon variant="subtle" color="gray">
							<Text size="sm" fw={500}>
								{i18n.language.toUpperCase()}
							</Text>
						</ActionIcon>
					</Menu.Target>
					<Menu.Dropdown>
						<Menu.Label>{t('header.change_language')}</Menu.Label>
						<Menu.Item onClick={() => handleLanguageChange('en')}>English</Menu.Item>
						<Menu.Item onClick={() => handleLanguageChange('zh_cn')}>简体中文</Menu.Item>
						<Menu.Item onClick={() => handleLanguageChange('jp')}>日本語</Menu.Item>
					</Menu.Dropdown>
				</Menu>

				<Menu shadow="md" width={200}>
					<Menu.Target>
						<UnstyledButton>
							<Group gap="xs">
								<Avatar src={user?.avatar} radius="xl" size="sm" />
								<Box visibleFrom="sm">
									<Text size="sm" fw={500}>
										{user?.name || 'User'}
									</Text>
									<Text size="xs" c="dimmed">
										{user?.email}
									</Text>
								</Box>
								<IconChevronDown style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
							</Group>
						</UnstyledButton>
					</Menu.Target>

					<Menu.Dropdown>
						<Menu.Label>{t('header.account')}</Menu.Label>
						<Menu.Item leftSection={<IconUser style={{ width: rem(16), height: rem(16) }} />}>
							{t('header.profile')}
						</Menu.Item>
						<Menu.Item leftSection={<IconSettings style={{ width: rem(16), height: rem(16) }} />}>
							{t('nav.settings')}
						</Menu.Item>
						<Menu.Divider />
						<Menu.Item
							color="red"
							leftSection={<IconLogout style={{ width: rem(16), height: rem(16) }} />}
							onClick={handleLogout}
						>
							{t('header.logout')}
						</Menu.Item>
					</Menu.Dropdown>
				</Menu>
			</Group>
		</Group>
	);
}
