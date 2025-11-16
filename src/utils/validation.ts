/**
 * 验证工具函数
 */

/**
 * 验证邮箱格式
 * @param email - 邮箱地址
 * @returns 是否有效
 */
export function isValidEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

/**
 * 验证手机号（中国）
 * @param phone - 手机号
 * @returns 是否有效
 */
export function isValidPhone(phone: string): boolean {
	const phoneRegex = /^1[3-9]\d{9}$/;
	return phoneRegex.test(phone);
}

/**
 * 验证密码强度
 * @param password - 密码
 * @returns 强度等级 (0-3)
 */
export function getPasswordStrength(password: string): number {
	let strength = 0;

	if (password.length >= 8) strength++;
	if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
	if (/\d/.test(password)) strength++;
	if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

	return Math.min(strength, 3);
}

/**
 * 验证 URL 格式
 * @param url - URL 地址
 * @returns 是否有效
 */
export function isValidUrl(url: string): boolean {
	try {
		new URL(url);
		return true;
	} catch {
		return false;
	}
}

/**
 * 验证文件类型
 * @param file - 文件
 * @param acceptedTypes - 接受的文件类型
 * @returns 是否有效
 */
export function isValidFileType(file: File, acceptedTypes: string[]): boolean {
	return acceptedTypes.includes(file.type);
}

/**
 * 验证文件大小
 * @param file - 文件
 * @param maxSize - 最大大小（字节）
 * @returns 是否有效
 */
export function isValidFileSize(file: File, maxSize: number): boolean {
	return file.size <= maxSize;
}

