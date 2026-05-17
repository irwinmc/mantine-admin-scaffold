/**
 * Recharts 图表主题配置
 * 颜色使用 Mantine CSS 变量，自动跟随亮暗主题
 */

/** 通用图表样式 */
export const chartTheme = {
	/** 网格线颜色（区分亮暗） */
	grid: (isDark: boolean) => (isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'),
	/** 坐标轴/文字颜色 */
	text: 'var(--mantine-color-gray-6)',
	/** Tooltip 背景 */
	tooltipBg: 'var(--mantine-color-body)',
	/** Tooltip 边框 */
	tooltipBorder: 'var(--mantine-color-gray-3)',
	/** Tooltip 内容样式 */
	tooltipContent: (isDark: boolean) => ({
		backgroundColor: isDark ? 'rgba(25, 25, 25, 0.55)' : 'rgba(255, 255, 255, 0.55)',
		backdropFilter: 'blur(6px)',
		WebkitBackdropFilter: 'blur(6px)',
		border: `1px solid ${isDark ? 'var(--mantine-color-dark-4)' : 'var(--mantine-color-gray-3)'}`,
		borderRadius: 8,
		fontSize: 13,
	}),
} as const;

/** 数据系列配色 */
export const chartColors = {
	revenue: 'var(--mantine-color-blue-6)',
	orders: 'var(--mantine-color-cyan-6)',
	pie: [
		'var(--mantine-color-blue-6)',
		'var(--mantine-color-cyan-6)',
		'var(--mantine-color-green-6)',
		'var(--mantine-color-violet-6)',
		'var(--mantine-color-orange-6)',
	],
} as const;
