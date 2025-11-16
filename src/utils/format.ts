import dayjs from 'dayjs';
import { DATE_FORMATS } from '../constants';

/**
 * 格式化工具函数
 */

/**
 * 格式化货币
 * @param amount - 金额
 * @param currency - 货币符号
 * @returns 格式化后的货币字符串
 */
export function formatCurrency(amount: number, currency: string = '$'): string {
	return `${currency}${amount.toFixed(2)}`;
}

/**
 * 格式化百分比
 * @param value - 数值
 * @param decimals - 小数位数
 * @returns 格式化后的百分比字符串
 */
export function formatPercentage(value: number, decimals: number = 1): string {
	return `${value.toFixed(decimals)}%`;
}

/**
 * 格式化日期
 * @param date - 日期
 * @param format - 格式
 * @returns 格式化后的日期字符串
 */
export function formatDate(date: Date | string, format: string = DATE_FORMATS.DISPLAY): string {
	return dayjs(date).format(format);
}

/**
 * 格式化数字（千分位）
 * @param num - 数字
 * @returns 格式化后的数字字符串
 */
export function formatNumber(num: number): string {
	return num.toLocaleString();
}

/**
 * 格式化文件大小
 * @param bytes - 字节数
 * @returns 格式化后的文件大小字符串
 */
export function formatFileSize(bytes: number): string {
	if (bytes === 0) return '0 Bytes';

	const k = 1024;
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return `${Math.round((bytes / Math.pow(k, i)) * 100) / 100} ${sizes[i]}`;
}

/**
 * 截断文本
 * @param text - 文本
 * @param maxLength - 最大长度
 * @param suffix - 后缀
 * @returns 截断后的文本
 */
export function truncateText(text: string, maxLength: number = 50, suffix: string = '...'): string {
	if (text.length <= maxLength) return text;
	return text.substring(0, maxLength - suffix.length) + suffix;
}

