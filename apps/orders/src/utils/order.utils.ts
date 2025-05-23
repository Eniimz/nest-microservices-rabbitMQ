import { OrderStatus } from "../types/order.types";

  // order.utils.ts
  const ALLOWED_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
    pending: ['confirmed', 'preparing', 'cancelled'],
    confirmed: ['preparing', 'cancelled'],
    preparing: ['out_for_delivery', 'cancelled'],
    out_for_delivery: ['delivered'],
    delivered: [], // No transitions after delivery
    cancelled: [], // No transitions after cancellation
  };
  
  export function isValidTransition(
    currentStatus: OrderStatus,
    newStatus: OrderStatus,
  ): boolean {
    return ALLOWED_TRANSITIONS[currentStatus].includes(newStatus);
  }