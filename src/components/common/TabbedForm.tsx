/**
 * TabbedForm - 通用的左侧导航表单组件
 */

import * as React from 'react';
import { Stack, Group, Button } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import classes from './TabbedForm.module.css';

// Context for sharing state between components
interface TabbedFormContextType {
	activeTab: string;
	setActiveTab: (tab: string) => void;
}

const TabbedFormContext = React.createContext<TabbedFormContextType | null>(null);

const useTabbedFormContext = () => {
	const context = React.useContext(TabbedFormContext);
	if (!context) {
		throw new Error('TabbedForm components must be used within TabbedForm');
	}
	return context;
};

// Main TabbedForm component
interface TabbedFormProps {
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	onCancel: () => void;
	isSubmitting?: boolean;
	children: React.ReactNode;
}

function TabbedFormRoot({ onSubmit, onCancel, isSubmitting = false, children }: TabbedFormProps) {
	const { t } = useTranslation();
	const [activeTab, setActiveTab] = React.useState('');

	return (
		<TabbedFormContext.Provider value={{ activeTab, setActiveTab }}>
			<form onSubmit={onSubmit}>
				<div className={classes.modalContainer}>
					<div>{children}</div>

					<div className={classes.footer}>
						<Group justify="flex-end" gap="sm">
							<Button variant="default" onClick={onCancel} disabled={isSubmitting}>
								{t('common.cancel')}
							</Button>
							<Button type="submit" loading={isSubmitting}>
								{t('common.save')}
							</Button>
						</Group>
					</div>
				</div>
			</form>
		</TabbedFormContext.Provider>
	);
}

// Tabs component
interface TabsProps {
	children: React.ReactNode;
}

function Tabs({ children }: TabsProps) {
	const { activeTab, setActiveTab } = useTabbedFormContext();

	// Set first tab as active if none is set
	React.useEffect(() => {
		if (!activeTab && React.Children.count(children) > 0) {
			const firstChild = React.Children.toArray(children)[0] as React.ReactElement<TabProps>;
			if (firstChild?.props?.value) {
				setActiveTab(firstChild.props.value);
			}
		}
	}, [activeTab, setActiveTab, children]);

	return (
		<div className={classes.sidebar}>
			<Stack gap="xs">{children}</Stack>
		</div>
	);
}

// Tab component
interface TabProps {
	value: string;
	icon: React.ReactNode;
	children: React.ReactNode;
}

function Tab({ value, icon, children }: TabProps) {
	const { activeTab, setActiveTab } = useTabbedFormContext();

	return (
		<button
			type="button"
			className={`${classes.menuItem} ${activeTab === value ? classes.menuItemActive : ''}`}
			onClick={() => setActiveTab(value)}
		>
			{icon}
			{children}
		</button>
	);
}

// Content component
interface ContentProps {
	children: React.ReactNode;
}

function Content({ children }: ContentProps) {
	return (
		<div className={classes.content}>
			<div className={classes.scrollContainer}>{children}</div>
		</div>
	);
}

// Panel component
interface PanelProps {
	value: string;
	children: React.ReactNode;
}

function Panel({ value, children }: PanelProps) {
	const { activeTab } = useTabbedFormContext();

	if (activeTab !== value) {
		return null;
	}

	return children;
}

// Compound component
export const TabbedForm = Object.assign(TabbedFormRoot, {
	Tabs,
	Tab,
	Content,
	Panel,
});
