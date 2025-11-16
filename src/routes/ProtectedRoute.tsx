import { Navigate } from 'react-router';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
	children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
	// TODO: 实现真实的认证逻辑
	// 这里可以使用 useAuth hook 或 Zustand store
	const isAuthenticated = true; // 临时设置为 true

	if (!isAuthenticated) {
		// 未认证，重定向到登录页
		return <Navigate to="/login" replace />;
	}

	// 已认证，渲染子组件
	return <>{children}</>;
}

