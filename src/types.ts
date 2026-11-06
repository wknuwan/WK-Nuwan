/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type CategoryId = 
  | 'sandwiches' 
  | 'club_sandwiches' 
  | 'arabic_breakfast_select' 
  | 'arabic_breakfast_packages';

export interface BreadOption {
  id: string;
  name: string;
  nameAr?: string;
  priceDelta: number; // e.g. +0.050 or 0
}

export interface ExtraOption {
  id: string;
  name: string;
  nameAr?: string;
  price: number; // e.g. 0.030 or 0.050 or 0.250 or 0.000
}

export interface RemovalOption {
  id: string;
  name: string;
  nameAr?: string;
  discount: number; // 0 for standard removal, or positive number (e.g. 0.250 or 0.500) to discount from item price
}

export interface MenuItem {
  id: string;
  categoryId: CategoryId;
  name: string;
  nameAr?: string;
  description: string;
  basePrice: number; // in KWD (Kuwaiti Dinars, e.g. 0.100, 1.250, 7.500)
  image?: string;
  availableBreads?: BreadOption[];
  defaultBreadId?: string;
  extras?: ExtraOption[];
  removals?: RemovalOption[];
  isSoldOut?: boolean;
  isPackage?: boolean;
  packageItemCount?: number;
}

export interface CartItemOption {
  selectedBread?: BreadOption;
  selectedExtras: ExtraOption[];
  selectedRemovals: RemovalOption[];
  notes?: string;
}

export interface CartItem {
  cartId: string;
  menuItem: MenuItem;
  quantity: number;
  selectedBread?: BreadOption;
  selectedExtras: ExtraOption[];
  selectedRemovals: RemovalOption[];
  notes?: string;
  unitPrice: number; // recalculated after additions/discounts
  totalPrice: number; // unitPrice * quantity
}

export type OrderStatus = 'received' | 'in_kitchen' | 'ready' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  orderNumber: string; // e.g. "MAB-8421"
  customerName: string;
  employeeNumber?: string;
  deliveryLocation: string; // KNPC Building or custom office
  mobileNumber: string; // 8-digit Kuwait number starting with 9, 8, 7, 6, 5, 4
  items: CartItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string; // ISO string
  notes?: string;
}

export interface Category {
  id: CategoryId;
  name: string;
  nameAr: string;
  description: string;
  countBadge?: string;
}

export const KNPC_LOCATIONS = [
  'Main Gate Security (83666)',
  'CCR MAB',
  'Maintenance B',
  'Fire Station MAB',
  'Laboratory MAB',
  'Security SHU',
  'Fire SHU',
  'TB MAB',
  'MOB 4',
  'MOB 5',
  'MOB 6',
  'TOB',
  
];
