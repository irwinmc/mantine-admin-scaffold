import { BrowserRouter, Routes, Route } from 'react-router';
import { DashboardLayout } from '../components/layout/DashboardLayout';
// Feature-based imports
import { Dashboard } from '../pages/dashboard';
import { Analytics } from '../pages/analytics';
import { Users } from '../pages/users';
import { ProductList } from '../pages/products/ProductList';
import { ProductEdit } from '../pages/products/ProductEdit';
import { Settings } from '../pages/settings';
import { Login } from '../pages/auth/Login';
import { Register } from '../pages/auth/Register';

export function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				{/* 认证路由 - 独立布局 */}
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />

				{/* Dashboard 路由 - 使用 DashboardLayout */}
				<Route path="/" element={<DashboardLayout />}>
					<Route index element={<Dashboard />} />
					<Route path="analytics" element={<Analytics />} />
					<Route path="users" element={<Users />} />
					<Route path="users/list" element={<Users />} />
					<Route path="users/roles" element={<Users />} />
					<Route path="products" element={<ProductList />} />
					<Route path="products/new" element={<ProductEdit />} />
					<Route path="products/:id/edit" element={<ProductEdit />} />
					<Route path="products/inventory" element={<ProductList />} />
					<Route path="products/categories" element={<ProductList />} />
					<Route path="orders" element={<Dashboard />} />
					<Route path="calendar" element={<Dashboard />} />
					<Route path="messages" element={<Dashboard />} />
					<Route path="settings" element={<Settings />} />
					<Route path="notifications" element={<Settings />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
