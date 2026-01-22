import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { AppHeader } from './AppHeader';
import { AppNavbar } from './AppNavbar';
import { Outlet } from 'react-router';
import classes from './DashboardLayout.module.css';
import clsx from 'clsx';

export function DashboardLayout() {
	const [mobileOpened, { toggle: toggleMobile }] = useDisclosure(false);
	const [collapsed, { toggle: toggleCollapsed }] = useDisclosure(false);
	const isMobile = useMediaQuery('(max-width: 768px)');

	const handleOverlayClick = () => {
		if (isMobile && mobileOpened) {
			toggleMobile();
		}
	};

	return (
		<div className={classes.layout}>
			{isMobile && (
				<div
					className={clsx(classes.overlay, {
						[classes.overlayVisible]: mobileOpened,
					})}
					onClick={handleOverlayClick}
				/>
			)}

			<div
				className={clsx(classes.navbar, {
					[classes.navbarExpanded]: isMobile ? mobileOpened : !collapsed,
					[classes.navbarCollapsed]: !isMobile && collapsed,
					[classes.navbarHidden]: isMobile && !mobileOpened,
				})}
			>
				<div className={classes.navbarContent}>
					<AppNavbar collapsed={collapsed} />
				</div>
			</div>

			<div className={classes.mainContainer}>
				<div className={classes.header}>
					<AppHeader
						opened={mobileOpened}
						toggle={toggleMobile}
						collapsed={collapsed}
						onToggleCollapse={toggleCollapsed}
						isMobile={isMobile}
					/>
				</div>

				<main className={classes.main}>
					<Outlet />
				</main>
			</div>
		</div>
	);
}
