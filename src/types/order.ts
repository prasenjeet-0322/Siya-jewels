import { CartItem } from "./cart";

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  addressType: "Home" | "Work" | "Other";
  isDefault?: boolean;
}

export type OrderStatus = "Confirmed" | "Processing" | "Quality Check" | "Shipped" | "Out for Delivery" | "Delivered" | "Cancelled";
export type PaymentStatus = "Pending" | "Paid" | "Failed" | "Refunded";
export type PaymentMethod = "Razorpay_UPI" | "Razorpay_Card" | "Razorpay_NetBanking" | "COD" | "Demo_Mock_Payment";

export interface Order {
  id: string;
  userId?: string;
  userEmail: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  subtotal: number;
  discount: number;
  couponCode?: string;
  couponDiscount: number;
  tax: number;
  shipping: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  orderStatus: OrderStatus;
  trackingNumber?: string;
  estimatedDeliveryDate: string;
  createdAt: string;
  updatedAt: string;
}
