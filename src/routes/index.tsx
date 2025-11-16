import { BrowserRouter, Routes, Route } from 'react-router';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Dashboard } from '../pages/Dashboard';
import { Analytics } from '../pages/Analytics';
import { Users } from '../pages/Users';
import { Products } from '../pages/Products';
import { Settings } from '../pages/Settings';

export function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<DashboardLayout />}>
					<Route index element={<Dashboard />} />
					<Route path="analytics" element={<Analytics />} />
					<Route path="users" element={<Users />} />
					<Route path="users/list" element={<Users />} />
					<Route path="users/roles" element={<Users />} />
					<Route path="products" element={<Products />} />
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

