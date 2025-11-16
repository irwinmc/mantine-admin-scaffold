import { useState, useEffect } from 'react';

/**
 * 使用 localStorage 的 Hook
 * @param key - localStorage 的键
 * @param initialValue - 初始值
 * @returns [value, setValue] - 值和设置值的函数
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
	// 从 localStorage 读取初始值
	const [storedValue, setStoredValue] = useState<T>(() => {
		try {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			console.error(`Error reading localStorage key "${key}":`, error);
			return initialValue;
		}
	});

	// 当值改变时，更新 localStorage
	useEffect(() => {
		try {
			window.localStorage.setItem(key, JSON.stringify(storedValue));
		} catch (error) {
			console.error(`Error setting localStorage key "${key}":`, error);
		}
	}, [key, storedValue]);

	return [storedValue, setStoredValue] as const;
}
