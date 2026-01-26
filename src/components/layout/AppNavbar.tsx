import { useState, useEffect } from 'react';
import { Group, Code } from '@mantine/core';
import {
	IconGauge,
	IconGaugeFilled,
	IconUser,
	IconUserFilled,
	IconSettings,
	IconSettingsFilled,
	IconShoppingCart,
	IconShoppingCartFilled,
	IconChevronRight,
	IconArchive,
	IconArchiveFilled,
	IconCategory,
	IconCategoryFilled,
} from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router';
import classes from './AppNavbar.module.css';
import clsx from 'clsx';

interface NavItem {
	label: string;
	icon: React.ComponentType<{ className?: string; stroke?: number }>;
	iconFilled?: React.ComponentType<{ className?: string; stroke?: number }>;
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
			iconFilled: IconGaugeFilled,
			path: '/',
		},
		{
			label: t('nav.users'),
			icon: IconUser,
			iconFilled: IconUserFilled,
			path: '/users',
		},
		{
			label: t('nav.categories'),
			icon: IconCategory,
			iconFilled: IconCategoryFilled,
			path: '/categories',
		},
		{
			label: t('nav.products'),
			icon: IconArchive,
			iconFilled: IconArchiveFilled,
			path: '/products',
		},
		{
			label: t('nav.orders'),
			icon: IconShoppingCart,
			iconFilled: IconShoppingCartFilled,
			path: '/orders',
		},
	];

	const settingsItems: NavItem[] = [
		{
			label: t('nav.settings'),
			icon: IconSettings,
			iconFilled: IconSettingsFilled,
			path: '/settings',
		},
	];

	// 判断路径是否匹配（支持子路径匹配）
	const isPathActive = (itemPath: string, currentPath: string): boolean => {
		// 根路径特殊处理，只精确匹配
		if (itemPath === '/') {
			return currentPath === '/';
		}
		// 其他路径支持前缀匹配
		return currentPath === itemPath || currentPath.startsWith(itemPath + '/');
	};

	// 自动展开包含当前路径的父菜单
	useEffect(() => {
		const allItems = [...navItems, ...settingsItems];
		const parentToOpen: string[] = [];

		allItems.forEach(item => {
			if (item.children) {
				const hasActiveChild = item.children.some(child => isPathActive(child.path, location.pathname));
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
		const isActive = isPathActive(item.path, location.pathname);
		const isOpened = openedItems.includes(item.label);
		const hasChildren = item.children && item.children.length > 0;
		const IconComponent = isActive && item.iconFilled ? item.iconFilled : item.icon;

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
					<IconComponent className={classes.linkIcon} stroke={1.5} />
				</a>
			);
		}

		return (
			<div key={item.label}>
				<a
					href={item.path}
					className={clsx(classes.link, {
						[classes.linkActive]: isActive,
					})}
					onClick={e => handleNavClick(item, e)}
				>
					<IconComponent className={classes.linkIcon} stroke={1.5} />
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
							const isChildActive = isPathActive(child.path, location.pathname);
							const ChildIconComponent =
								isChildActive && child.iconFilled ? child.iconFilled : child.icon;
							return (
								<a
									key={child.label}
									href={child.path}
									className={clsx(classes.childLink, {
										[classes.childLinkActive]: isChildActive,
									})}
									onClick={e => handleChildClick(child.path, e)}
								>
									<ChildIconComponent className={classes.linkIcon} stroke={1.5} />
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
					{!collapsed && <span className={clsx(classes.logo, classes.fadeIn)}>Dashboard</span>}
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
