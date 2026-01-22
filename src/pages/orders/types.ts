/**
 * Orders 模块类型定义
 */

export type OrderStatus = 'paid' | 'shipped' | 'completed';
export type PaymentMethod = 'credit_card' | 'paypal' | 'bank_transfer';

export interface OrderItem {
	id: string;
	productId: string;
	productName: string;
	productImage: string;
	color?: string;
	size?: string;
	price: number;
	quantity: number;
	rating?: number;
	totalAmount: number;
}

export interface Customer {
	id: string;
	name: string;
	email: string;
	phone: string;
	avatar?: string;
}

export interface Address {
	name: string;
	phone: string;
	street: string;
	city: string;
	state: string;
	zipCode: string;
	country: string;
}

export interface PaymentDetails {
	transactionId: string;
	method: PaymentMethod;
	cardHolderName?: string;
	cardNumber?: string;
	totalAmount: number;
}

export interface OrderStatusHistory {
	status: string;
	date?: Date;
	description?: string;
}

export interface OrderDetail {
	id: string;
	orderNumber: string;
	orderDate: Date;
	status: OrderStatus;
	items: OrderItem[];
	customer: Customer;
	billingAddress: Address;
	shippingAddress: Address;
	paymentDetails: PaymentDetails;
	statusHistory: OrderStatusHistory[];
	subtotal: number;
	discount: number;
	shippingCharge: number;
	estimatedTax: number;
	total: number;
	trackingNumber?: string;
	logistics?: {
		company: string;
		trackingId: string;
	};
}

export interface Order {
	id: string;
	customer: string;
	productName: string;
	orderDate: Date;
	amount: number;
	paymentMethod: PaymentMethod;
	status: OrderStatus;
}
