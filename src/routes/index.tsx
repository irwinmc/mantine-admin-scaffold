import { BrowserRouter, Routes, Route } from 'react-router';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Dashboard } from '../pages/Dashboard';
import { Analytics } from '../pages/Analytics';
import { Users } from '../pages/Users';
import { Products } from '../pages/Products';
import { ProductEdit } from '../pages/ProductEdit';
import { Settings } from '../pages/Settings';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';

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
					<Route path="products" element={<Products />} />
					<Route path="products/new" element={<ProductEdit />} />
					<Route path="products/:id/edit" element={<ProductEdit />} />
					<Route path="products/inventory" element={<Products />} />
					<Route path="products/categories" element={<Products />} />
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
