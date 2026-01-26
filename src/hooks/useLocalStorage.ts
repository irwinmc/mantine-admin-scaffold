import { useState } from 'react';

/**
 * 响应式的 localStorage hook
 * 提供类似 useState 的 API，但数据会持久化到 localStorage
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
	// 从 localStorage 读取初始值
	const [storedValue, setStoredValue] = useState<T>(() => {
		try {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			console.warn(`Error reading localStorage key "${key}":`, error);
			window.localStorage.removeItem(key);
			return initialValue;
		}
	});

	// 设置值的函数
	const setValue = (value: T | ((val: T) => T)) => {
		try {
			const valueToStore = value instanceof Function ? value(storedValue) : value;
			setStoredValue(valueToStore);

			if (valueToStore === null || valueToStore === undefined) {
				window.localStorage.removeItem(key);
			} else {
				window.localStorage.setItem(key, JSON.stringify(valueToStore));
			}
		} catch (error) {
			console.warn(`Error setting localStorage key "${key}":`, error);
		}
	};

	return [storedValue, setValue] as const;
}
