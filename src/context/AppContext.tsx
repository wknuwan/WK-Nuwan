/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  MenuItem, 
  Category, 
  CartItem, 
  Order, 
  OrderStatus, 
  CategoryId 
} from '../types.ts';
import { INITIAL_CATEGORIES, INITIAL_MENU_ITEMS, INITIAL_ORDERS } from '../data/initialMenu.ts';
import { playKitchenOrderChime } from '../utils/audio.ts';

interface AppContextType {
  categories: Category[];
  menuItems: MenuItem[];
  cart: CartItem[];
  orders: Order[];
  activeCategoryId: CategoryId | 'all';
  setActiveCategoryId: (id: CategoryId | 'all') => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  customizingItem: MenuItem | null;
  setCustomizingItem: (item: MenuItem | null) => void;
  printSlipOrder: Order | null;
  setPrintSlipOrder: (order: Order | null) => void;
  isInstallModalOpen: boolean;
  setIsInstallModalOpen: (open: boolean) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (cartId: string) => void;
  updateCartQuantity: (cartId: string, delta: number) => void;
  clearCart: () => void;
  placeOrder: (details: {
    customerName: string;
    employeeNumber?: string;
    deliveryLocation: string;
    mobileNumber: string;
    notes?: string;
  }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  deleteOrder: (orderId: string) => void;
  updateMenuItemPrice: (itemId: string, newPrice: number) => void;
  toggleMenuItemSoldOut: (itemId: string) => void;
  addMenuItem: (item: MenuItem) => void;
  editMenuItem: (item: MenuItem) => void;
  deleteMenuItem: (itemId: string) => void;
  addCategory: (cat: Category) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  MENU: 'knpc_kitchen_menu_v6',
  CATEGORIES: 'knpc_kitchen_categories_v4',
  ORDERS: 'knpc_kitchen_orders_v4',
  CART: 'knpc_kitchen_cart_v4'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      if (saved) {
        const parsed: Category[] = JSON.parse(saved);
        return parsed.filter(c => (c.id as string) !== 'beverages');
      }
      return INITIAL_CATEGORIES;
    } catch {
      return INITIAL_CATEGORIES;
    }
  });

  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MENU);
      if (saved) {
        const parsed: MenuItem[] = JSON.parse(saved);
        return parsed.filter(i => (i.categoryId as string) !== 'beverages');
      }
      return INITIAL_MENU_ITEMS;
    } catch {
      return INITIAL_MENU_ITEMS;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeCategoryId, setActiveCategoryId] = useState<CategoryId | 'all'>('sandwiches');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [printSlipOrder, setPrintSlipOrder] = useState<Order | null>(null);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (newItem: CartItem) => {
    setCart(prev => {
      // Check if identical item already in cart (same bread, same extras, same removals, same notes)
      const existingIdx = prev.findIndex(item => 
        item.menuItem.id === newItem.menuItem.id &&
        item.selectedBread?.id === newItem.selectedBread?.id &&
        item.notes === newItem.notes &&
        JSON.stringify(item.selectedExtras.map(e => e.id).sort()) === JSON.stringify(newItem.selectedExtras.map(e => e.id).sort()) &&
        JSON.stringify(item.selectedRemovals.map(r => r.id).sort()) === JSON.stringify(newItem.selectedRemovals.map(r => r.id).sort())
      );

      if (existingIdx >= 0) {
        const updated = [...prev];
        const existing = updated[existingIdx];
        const newQty = existing.quantity + newItem.quantity;
        updated[existingIdx] = {
          ...existing,
          quantity: newQty,
          totalPrice: existing.unitPrice * newQty
        };
        return updated;
      }

      return [...prev, newItem];
    });
  };

  const removeFromCart = (cartId: string) => {
    setCart(prev => prev.filter(i => i.cartId !== cartId));
  };

  const updateCartQuantity = (cartId: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.cartId !== cartId) return item;
        const newQty = Math.max(1, item.quantity + delta);
        return {
          ...item,
          quantity: newQty,
          totalPrice: item.unitPrice * newQty
        };
      });
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const placeOrder = (details: {
    customerName: string;
    employeeNumber?: string;
    deliveryLocation: string;
    mobileNumber: string;
    notes?: string;
  }): Order => {
    const totalAmount = cart.reduce((sum, item) => sum + item.totalPrice, 0);
    const orderNum = `MAB-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      id: `ord_${Date.now()}`,
      orderNumber: orderNum,
      customerName: details.customerName,
      employeeNumber: details.employeeNumber,
      deliveryLocation: details.deliveryLocation,
      mobileNumber: details.mobileNumber,
      items: [...cart],
      totalAmount,
      status: 'received',
      createdAt: new Date().toISOString(),
      notes: details.notes
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();

    // Play synthetic chime
    playKitchenOrderChime();

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(ord => ord.id === orderId ? { ...ord, status } : ord));
  };

  const deleteOrder = (orderId: string) => {
    setOrders(prev => prev.filter(ord => ord.id !== orderId));
  };

  const updateMenuItemPrice = (itemId: string, newPrice: number) => {
    setMenuItems(prev => prev.map(item => item.id === itemId ? { ...item, basePrice: newPrice } : item));
  };

  const toggleMenuItemSoldOut = (itemId: string) => {
    setMenuItems(prev => prev.map(item => item.id === itemId ? { ...item, isSoldOut: !item.isSoldOut } : item));
  };

  const addMenuItem = (item: MenuItem) => {
    setMenuItems(prev => [item, ...prev]);
  };

  const editMenuItem = (updatedItem: MenuItem) => {
    setMenuItems(prev => prev.map(i => i.id === updatedItem.id ? updatedItem : i));
  };

  const deleteMenuItem = (itemId: string) => {
    setMenuItems(prev => prev.filter(i => i.id !== itemId));
  };

  const addCategory = (cat: Category) => {
    setCategories(prev => [...prev, cat]);
  };

  return (
    <AppContext.Provider
      value={{
        categories,
        menuItems,
        cart,
        orders,
        activeCategoryId,
        setActiveCategoryId,
        isCartOpen,
        setIsCartOpen,
        isAdminOpen,
        setIsAdminOpen,
        customizingItem,
        setCustomizingItem,
        printSlipOrder,
        setPrintSlipOrder,
        isInstallModalOpen,
        setIsInstallModalOpen,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        placeOrder,
        updateOrderStatus,
        deleteOrder,
        updateMenuItemPrice,
        toggleMenuItemSoldOut,
        addMenuItem,
        editMenuItem,
        deleteMenuItem,
        addCategory
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
