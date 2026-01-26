/**
 * 辅助工具函数
 */

/**
 * 延迟执行
 * @param ms - 毫秒数
 * @returns Promise
 */
export function sleep(ms: number): Promise<void> {
	return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 生成随机 ID
 * @returns 随机 ID 字符串
 */
export function generateId(): string {
	return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * 深拷贝对象
 * @param obj - 对象
 * @returns 拷贝后的对象
 */
export function deepClone<T>(obj: T): T {
	return JSON.parse(JSON.stringify(obj));
}

/**
 * 对象数组去重
 * @param arr - 数组
 * @param key - 去重的键
 * @returns 去重后的数组
 */
export function uniqueByKey<T>(arr: T[], key: keyof T): T[] {
	const seen = new Set();
	return arr.filter(item => {
		const value = item[key];
		if (seen.has(value)) {
			return false;
		}
		seen.add(value);
		return true;
	});
}

/**
 * 数组分组
 * @param arr - 数组
 * @param key - 分组的键
 * @returns 分组后的对象
 */
export function groupBy<T>(arr: T[], key: keyof T): Record<string, T[]> {
	return arr.reduce(
		(groups, item) => {
			const group = String(item[key]);
			if (!groups[group]) {
				groups[group] = [];
			}
			groups[group].push(item);
			return groups;
		},
		{} as Record<string, T[]>,
	);
}

/**
 * 下载文件
 * @param data - 数据
 * @param filename - 文件名
 * @param type - MIME 类型
 */
export function downloadFile(data: BlobPart, filename: string, type: string = 'text/plain'): void {
	const blob = new Blob([data], { type });
	const url = URL.createObjectURL(blob);
	const link = document.createElement('a');
	link.href = url;
	link.download = filename;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	URL.revokeObjectURL(url);
}

/**
 * 复制到剪贴板
 * @param text - 文本
 * @returns Promise<boolean>
 */
export async function copyToClipboard(text: string): Promise<boolean> {
	try {
		await navigator.clipboard.writeText(text);
		return true;
	} catch {
		return false;
	}
}
