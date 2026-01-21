/**
 * Orders 模块类型定义
 */

export type OrderStatus = 'paid' | 'shipped' | 'completed';
export type PaymentMethod = 'credit_card' | 'paypal' | 'bank_transfer';

export interface Order {
	id: string;
	customer: string;
	productName: string;
	orderDate: Date;
	amount: number;
	paymentMethod: PaymentMethod;
	status: OrderStatus;
}
