import { BrowserRouter, Routes, Route } from 'react-router';
import { DashboardLayout } from '../components/layout/DashboardLayout';

// Feature-based imports
import { Dashboard } from '../pages/dashboard';
import { UserList } from '../pages/users';
import { ProductList, ProductCreate, ProductEdit } from '../pages/products';
import { OrderList, OrderDetail } from '../pages/orders';
import { Settings } from '../pages/settings';
import { Login } from '../pages/auth/login';
import { Register } from '../pages/auth/register';

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
					<Route path="users" element={<UserList />} />
					<Route path="products" element={<ProductList />} />
					<Route path="products/new" element={<ProductCreate />} />
					<Route path="products/:id/edit" element={<ProductEdit />} />
					<Route path="orders" element={<OrderList />} />
					<Route path="orders/:id" element={<OrderDetail />} />
					<Route path="calendar" element={<Dashboard />} />
					<Route path="messages" element={<Dashboard />} />
					<Route path="settings" element={<Settings />} />
					<Route path="notifications" element={<Settings />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
