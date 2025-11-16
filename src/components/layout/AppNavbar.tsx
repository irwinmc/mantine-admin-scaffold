import { useState, useEffect } from 'react';
import { Group, Code } from '@mantine/core';
import {
	IconGauge,
	IconUsers,
	IconSettings,
	IconShoppingCart,
	IconChartBar,
	IconFiles,
	IconCalendar,
	IconMail,
	IconLock,
	IconDatabase,
	IconChevronRight,
	IconUser,
	IconBell,
	IconBox,
} from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router';
import classes from './AppNavbar.module.css';
import clsx from 'clsx';

interface NavItem {
	label: string;
	icon: React.ComponentType<{ className?: string; stroke?: number }>;
	path: string;
	children?: NavItem[];
}

interface AppNavbarProps {
	collapsed?: boolean;
}

export function AppNavbar({ collapsed = false }: AppNavbarProps) {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const location = useLocation();
	const [openedItems, setOpenedItems] = useState<string[]>([]);

	const navItems: NavItem[] = [
		{
			label: t('nav.dashboard'),
			icon: IconGauge,
			path: '/',
		},
		{
			label: t('nav.analytics'),
			icon: IconChartBar,
			path: '/analytics',
		},
		{
			label: t('nav.users'),
			icon: IconUsers,
			path: '/users',
			children: [
				{
					label: t('nav.all_users'),
					icon: IconUser,
					path: '/users/list',
				},
				{
					label: t('nav.roles'),
					icon: IconLock,
					path: '/users/roles',
				},
			],
		},
		{
			label: t('nav.products'),
			icon: IconBox,
			path: '/products',
			children: [
				{
					label: t('nav.inventory'),
					icon: IconDatabase,
					path: '/products/inventory',
				},
				{
					label: t('nav.categories'),
					icon: IconFiles,
					path: '/products/categories',
				},
			],
		},
		{
			label: t('nav.orders'),
			icon: IconShoppingCart,
			path: '/orders',
		},
		{
			label: t('nav.calendar'),
			icon: IconCalendar,
			path: '/calendar',
		},
		{
			label: t('nav.messages'),
			icon: IconMail,
			path: '/messages',
		},
	];

	const settingsItems: NavItem[] = [
		{
			label: t('nav.settings'),
			icon: IconSettings,
			path: '/settings',
		},
		{
			label: t('nav.notifications'),
			icon: IconBell,
			path: '/notifications',
		},
	];

	// 自动展开包含当前路径的父菜单
	useEffect(() => {
		const allItems = [...navItems, ...settingsItems];
		const parentToOpen: string[] = [];

		allItems.forEach(item => {
			if (item.children) {
				const hasActiveChild = item.children.some(child => child.path === location.pathname);
				if (hasActiveChild && !openedItems.includes(item.label)) {
					parentToOpen.push(item.label);
				}
			}
		});

		if (parentToOpen.length > 0) {
			setOpenedItems(prev => [...prev, ...parentToOpen]);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location.pathname]);

	const toggleItem = (label: string) => {
		setOpenedItems(prev => (prev.includes(label) ? prev.filter(item => item !== label) : [...prev, label]));
	};

	const handleNavClick = (item: NavItem, e: React.MouseEvent) => {
		e.preventDefault();
		if (item.children) {
			toggleItem(item.label);
		} else {
			navigate(item.path);
		}
	};

	const handleChildClick = (path: string, e: React.MouseEvent) => {
		e.preventDefault();
		navigate(path);
	};

	const renderNavItem = (item: NavItem) => {
		const isActive = location.pathname === item.path;
		const isOpened = openedItems.includes(item.label);
		const hasChildren = item.children && item.children.length > 0;

		// 在折叠状态下，不显示子菜单
		if (collapsed) {
			return (
				<a
					key={item.label}
					href={item.path}
					className={clsx(classes.link, {
						[classes.linkActive]: isActive,
					})}
					onClick={e => handleNavClick(item, e)}
					title={item.label}
				>
					<item.icon className={classes.linkIcon} stroke={1.5} />
				</a>
			);
		}

		return (
			<div key={item.label}>
				<a
					href={item.path}
					className={clsx(classes.link, {
						[classes.linkActive]: isActive && !hasChildren,
					})}
					onClick={e => handleNavClick(item, e)}
				>
					<item.icon className={classes.linkIcon} stroke={1.5} />
					<span className={clsx(classes.linkLabel, classes.fadeIn)}>{item.label}</span>
					{hasChildren && (
						<IconChevronRight
							className={clsx(classes.linkChevron, classes.fadeIn, {
								[classes.linkChevronRotated]: isOpened,
							})}
						/>
					)}
				</a>
				{hasChildren && isOpened && (
					<div className={classes.childrenWrapper}>
						{item.children?.map(child => {
							const isChildActive = location.pathname === child.path;
							return (
								<a
									key={child.label}
									href={child.path}
									className={clsx(classes.childLink, {
										[classes.childLinkActive]: isChildActive,
									})}
									onClick={e => handleChildClick(child.path, e)}
								>
									<child.icon className={classes.linkIcon} stroke={1.5} />
									<span className={classes.fadeIn}>{child.label}</span>
								</a>
							);
						})}
					</div>
				)}
			</div>
		);
	};

	return (
		<nav className={classes.navbar}>
			<div className={classes.header}>
				<Group justify="space-between" style={{ width: '100%' }}>
					{!collapsed && <span className={clsx(classes.logo, classes.fadeIn)}>Mantine Admin</span>}
					{!collapsed && (
						<Code fw={700} className={clsx(classes.version, classes.fadeIn)}>
							v1.0.0
						</Code>
					)}
					{collapsed && <span className={classes.logo}>MA</span>}
				</Group>
			</div>

			<div className={classes.navbarMain}>
				<div className={classes.section}>
					{!collapsed && <div className={clsx(classes.sectionLabel, classes.fadeIn)}>Main Menu</div>}
					{navItems.map(item => renderNavItem(item))}
				</div>

				<div className={classes.section}>
					{!collapsed && <div className={clsx(classes.sectionLabel, classes.fadeIn)}>System</div>}
					{settingsItems.map(item => renderNavItem(item))}
				</div>
			</div>
		</nav>
	);
}
