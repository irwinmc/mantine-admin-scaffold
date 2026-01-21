/**
 * Orders Store - 使用 Zustand 管理订单数据
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Order, OrderStatus, PaymentMethod } from './types';
import { mockOrders } from './data/mockData';

interface CreateOrderValues {
	customer: string;
	productName: string;
	amount: number;
	paymentMethod: PaymentMethod;
}

interface OrdersState {
	// 状态
	orders: Order[];
	loading: boolean;
	error: string | null;

	// 订单 CRUD 操作
	getOrderById: (id: string) => Order | undefined;
	getAllOrders: () => Order[];
	createOrder: (values: CreateOrderValues) => Order;
	updateOrder: (id: string, values: Partial<Order>) => void;
	deleteOrder: (id: string) => void;
	updateOrderStatus: (id: string, status: OrderStatus) => void;

	// 工具方法
	setLoading: (loading: boolean) => void;
	setError: (error: string | null) => void;
	resetError: () => void;
}

export const useOrdersStore = create<OrdersState>()(
	devtools(
		(set, get) => ({
			// 初始状态 - 使用 mockData
			orders: mockOrders,
			loading: false,
			error: null,

			// 根据 ID 获取订单
			getOrderById: (id: string) => {
				return get().orders.find(order => order.id === id);
			},

			// 获取所有订单
			getAllOrders: () => {
				return get().orders;
			},

			// 创建新订单
			createOrder: (values: CreateOrderValues) => {
				const existingIds = get().orders.map(o => o.id);
				const numericIds = existingIds
					.filter(id => id.startsWith('ORD-'))
					.map(id => parseInt(id.replace('ORD-', ''), 10));
				const nextId = Math.max(...numericIds, 0) + 1;
				const orderId = `ORD-${String(nextId).padStart(3, '0')}`;

				const newOrder: Order = {
					id: orderId,
					customer: values.customer,
					productName: values.productName,
					orderDate: new Date(),
					amount: values.amount,
					paymentMethod: values.paymentMethod,
					status: 'paid',
				};

				set(state => ({
					orders: [...state.orders, newOrder],
				}));

				return newOrder;
			},

			// 更新订单
			updateOrder: (id: string, values: Partial<Order>) => {
				set(state => ({
					orders: state.orders.map(order =>
						order.id === id
							? {
									...order,
									...values,
								}
							: order,
					),
				}));
			},

			// 删除订单
			deleteOrder: (id: string) => {
				set(state => ({
					orders: state.orders.filter(order => order.id !== id),
				}));
			},

			// 更新订单状态
			updateOrderStatus: (id: string, status: OrderStatus) => {
				set(state => ({
					orders: state.orders.map(order => (order.id === id ? { ...order, status } : order)),
				}));
			},

			// 设置加载状态
			setLoading: (loading: boolean) => {
				set({ loading });
			},

			// 设置错误
			setError: (error: string | null) => {
				set({ error });
			},

			// 重置错误
			resetError: () => {
				set({ error: null });
			},
		}),
		{
			name: 'orders-store',
		},
	),
);
