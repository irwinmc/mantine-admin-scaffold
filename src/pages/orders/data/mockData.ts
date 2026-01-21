/**
 * Orders 模块模拟数据
 */

import type { Order } from '../types';

export const mockOrders: Order[] = [
	{
		id: 'ORD-001',
		customer: 'John Doe',
		productName: 'Wireless Headphones',
		orderDate: new Date('2024-11-10'),
		amount: 199.99,
		paymentMethod: 'credit_card',
		status: 'completed',
	},
	{
		id: 'ORD-002',
		customer: 'Jane Smith',
		productName: 'Smart Watch',
		orderDate: new Date('2024-11-12'),
		amount: 299.99,
		paymentMethod: 'paypal',
		status: 'shipped',
	},
	{
		id: 'ORD-003',
		customer: 'Bob Johnson',
		productName: 'Mechanical Keyboard',
		orderDate: new Date('2024-11-15'),
		amount: 159.99,
		paymentMethod: 'credit_card',
		status: 'paid',
	},
	{
		id: 'ORD-004',
		customer: 'Alice Williams',
		productName: 'Laptop Stand',
		orderDate: new Date('2024-11-18'),
		amount: 79.99,
		paymentMethod: 'bank_transfer',
		status: 'completed',
	},
	{
		id: 'ORD-005',
		customer: 'Charlie Brown',
		productName: 'Wireless Mouse',
		orderDate: new Date('2024-11-20'),
		amount: 39.99,
		paymentMethod: 'credit_card',
		status: 'shipped',
	},
	{
		id: 'ORD-006',
		customer: 'Diana Prince',
		productName: 'Desk Lamp',
		orderDate: new Date('2024-11-22'),
		amount: 49.99,
		paymentMethod: 'paypal',
		status: 'paid',
	},
	{
		id: 'ORD-007',
		customer: 'Edward Cullen',
		productName: 'USB-C Hub',
		orderDate: new Date('2024-11-25'),
		amount: 69.99,
		paymentMethod: 'credit_card',
		status: 'completed',
	},
	{
		id: 'ORD-008',
		customer: 'Fiona Gallagher',
		productName: 'Phone Stand',
		orderDate: new Date('2024-11-28'),
		amount: 19.99,
		paymentMethod: 'bank_transfer',
		status: 'shipped',
	},
];
