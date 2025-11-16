import { createTheme } from '@mantine/core';

export default createTheme({
	/** 主题配置 */
	primaryColor: 'blue',
	defaultRadius: 'md',
	
	// 字体配置
	fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
	fontFamilyMonospace: 'Monaco, Courier, monospace',
	
	// 颜色方案
	colors: {
		// 可以在这里自定义颜色
	},
	
	// 其他配置
	white: '#ffffff',
	black: '#000000',
	
	// 响应式断点
	breakpoints: {
		xs: '36em',
		sm: '48em',
		md: '62em',
		lg: '75em',
		xl: '88em',
	},
});
