/**
 * TabbedForm - 通用的左侧导航表单组件
 */

import { type ReactNode, useState } from 'react';
import { Stack, Group, Button } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import classes from './TabbedForm.module.css';

export interface TabItem {
	key: string;
	label: string;
	icon: ReactNode;
	content: ReactNode;
}

interface TabbedFormProps {
	tabs: TabItem[];
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	onCancel: () => void;
	isSubmitting?: boolean;
}

export function TabbedForm({ tabs, onSubmit, onCancel, isSubmitting = false }: TabbedFormProps) {
	const { t } = useTranslation();
	const [activeTab, setActiveTab] = useState(tabs[0]?.key || '');

	const activeTabContent = tabs.find(tab => tab.key === activeTab)?.content;

	return (
		<form onSubmit={onSubmit}>
			<div className={classes.modalContainer}>
				{/* 左侧导航 */}
				<div className={classes.sidebar}>
					<Stack gap="xs">
						{tabs.map(tab => (
							<button
								key={tab.key}
								type="button"
								className={`${classes.menuItem} ${activeTab === tab.key ? classes.menuItemActive : ''}`}
								onClick={() => setActiveTab(tab.key)}
							>
								{tab.icon}
								{tab.label}
							</button>
						))}
					</Stack>
				</div>

				{/* 右侧内容区域 */}
				<div className={classes.content}>
					<div className={classes.scrollContainer}>{activeTabContent}</div>

					{/* 底部按钮区域 */}
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
			</div>
		</form>
	);
}
