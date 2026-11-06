/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { Order, OrderStatus, MenuItem, Category, CategoryId } from '../types.ts';
import { formatKWD, formatDateTime } from '../utils/format.ts';
import { generateEmployeeStatusWhatsAppLink, KITCHEN_PHONE } from '../utils/whatsapp.ts';
import { exportOrdersToExcelCSV } from '../utils/exportExcel.ts';
import { 
  Shield, 
  Lock, 
  Unlock, 
  X, 
  Printer, 
  MessageSquare, 
  Download, 
  Plus, 
  Edit2, 
  Search, 
  CheckCircle, 
  Clock, 
  Truck, 
  ChefHat, 
  DollarSign, 
  FileSpreadsheet,
  Trash2,
  RefreshCw,
  SlidersHorizontal
} from 'lucide-react';

const ADMIN_PIN = '1631';

export const AdminPortal: React.FC = () => {
  const { 
    isAdminOpen, 
    setIsAdminOpen, 
    orders, 
    updateOrderStatus, 
    deleteOrder,
    setPrintSlipOrder,
    menuItems,
    categories,
    updateMenuItemPrice,
    toggleMenuItemSoldOut,
    addMenuItem,
    editMenuItem,
    deleteMenuItem,
    addCategory
  } = useApp();

  const [pinInput, setPinInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinError, setPinError] = useState(false);

  // Active admin tab: 'orders' | 'menu' | 'add_item' | 'add_category'
  const [adminTab, setAdminTab] = useState<'orders' | 'menu' | 'add_item' | 'add_category'>('orders');

  // Order filters
  const [orderSearch, setOrderSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');

  // Menu editing state
  const [editingPriceItem, setEditingPriceItem] = useState<{ id: string; price: string } | null>(null);

  // Add Item Form State
  const [newItemName, setNewItemName] = useState('');
  const [newItemNameAr, setNewItemNameAr] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<CategoryId>('sandwiches');
  const [newItemPrice, setNewItemPrice] = useState('0.150');
  const [newItemDesc, setNewItemDesc] = useState('');

  // Add Category Form State
  const [newCatId, setNewCatId] = useState('');
  const [newCatName, setNewCatName] = useState('');
  const [newCatNameAr, setNewCatNameAr] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');

  if (!isAdminOpen) return null;

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === ADMIN_PIN) {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
      setPinInput('');
    }
  };

  // Metrics calculation
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const inKitchenCount = orders.filter(o => o.status === 'in_kitchen').length;
  const readyCount = orders.filter(o => o.status === 'ready').length;
  const receivedCount = orders.filter(o => o.status === 'received').length;

  // Filtered orders
  const filteredOrders = orders.filter(ord => {
    if (statusFilter !== 'all' && ord.status !== statusFilter) return false;
    if (!orderSearch.trim()) return true;
    const q = orderSearch.toLowerCase();
    return (
      ord.customerName.toLowerCase().includes(q) ||
      ord.orderNumber.toLowerCase().includes(q) ||
      ord.deliveryLocation.toLowerCase().includes(q) ||
      ord.mobileNumber.includes(q)
    );
  });

  const handleSavePrice = (itemId: string) => {
    if (!editingPriceItem) return;
    const num = parseFloat(editingPriceItem.price);
    if (!isNaN(num) && num >= 0) {
      updateMenuItemPrice(itemId, num);
    }
    setEditingPriceItem(null);
  };

  const handleCreateMenuItem = (e: React.FormEvent) => {
    e.preventDefault();
    const priceNum = parseFloat(newItemPrice);
    if (!newItemName.trim() || isNaN(priceNum)) return;

    const newItem: MenuItem = {
      id: `custom_${Date.now()}`,
      categoryId: newItemCategory,
      name: newItemName.trim(),
      nameAr: newItemNameAr.trim() || undefined,
      description: newItemDesc.trim() || 'Freshly prepared specialty dish.',
      basePrice: priceNum
    };

    addMenuItem(newItem);
    setNewItemName('');
    setNewItemNameAr('');
    setNewItemDesc('');
    setAdminTab('menu');
  };

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    const id = (newCatId.trim().toLowerCase().replace(/\s+/g, '_') || `cat_${Date.now()}`) as CategoryId;
    const newCat: Category = {
      id,
      name: newCatName.trim(),
      nameAr: newCatNameAr.trim(),
      description: newCatDesc.trim()
    };

    addCategory(newCat);
    setNewCatId('');
    setNewCatName('');
    setNewCatNameAr('');
    setNewCatDesc('');
    setAdminTab('menu');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 no-print">
      <div 
        className="bg-white rounded-2xl max-w-5xl w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[95vh] animate-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-portal-title"
      >
        
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#123c32] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#d7a94b] text-[#123c32] flex items-center justify-center font-bold">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h3 id="admin-portal-title" className="font-bold text-base text-white">
                KNPC Kitchen Operations & Admin Portal
              </h3>
              <p className="text-[11px] text-stone-300">
                Mina Abdulla (MAB) Refinery · Hotline {KITCHEN_PHONE}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={() => exportOrdersToExcelCSV(orders)}
                className="px-3 py-1.5 bg-[#d7a94b] hover:bg-[#c9993c] text-[#123c32] text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                title="Export complete orders history to Excel CSV"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Export Excel</span>
              </button>
            )}

            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-1 rounded-lg text-stone-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close Admin Portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Unauthenticated PIN Screen */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto space-y-6">
            <div className="w-16 h-16 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center mx-auto text-[#123c32]">
              <Lock className="w-8 h-8" />
            </div>

            <div>
              <h4 className="text-lg font-bold text-stone-900">Kitchen Operations Authentication</h4>
              <p className="text-xs text-stone-500 mt-1">
                Enter kitchen security authorization PIN to manage live orders and menu.
              </p>
            </div>

            <form onSubmit={handlePinSubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  maxLength={4}
                  autoFocus
                  value={pinInput}
                  onChange={e => setPinInput(e.target.value)}
                  placeholder="Enter 4-digit PIN"
                  className="w-44 text-center tracking-widest text-2xl font-mono-num font-bold py-2.5 px-3 rounded-xl border-2 border-stone-300 focus:border-[#123c32] focus:outline-none bg-stone-50"
                />
              </div>

              {pinError && (
                <p className="text-xs text-red-600 font-medium">
                  Invalid PIN code. Please use default <strong>1631</strong>.
                </p>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-[#123c32] hover:bg-[#1a4f42] text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-md"
              >
                Unlock Operations Console
              </button>
            </form>

            <div className="text-[11px] text-stone-400 bg-stone-50 p-2.5 rounded-lg border border-stone-200">
              <strong> Authorized personnel only </strong>
            </div>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Top Navigation Strip */}
            <div className="bg-stone-100 border-b border-stone-200 px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setAdminTab('orders')}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                    adminTab === 'orders'
                      ? 'bg-white text-[#123c32] shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Live Order Queue ({orders.length})
                </button>
                <button
                  onClick={() => setAdminTab('menu')}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                    adminTab === 'menu'
                      ? 'bg-white text-[#123c32] shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Menu & Prices ({menuItems.length})
                </button>
                <button
                  onClick={() => setAdminTab('add_item')}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                    adminTab === 'add_item'
                      ? 'bg-white text-[#123c32] shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  + Add Menu Item
                </button>
                <button
                  onClick={() => setAdminTab('add_category')}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                    adminTab === 'add_category'
                      ? 'bg-white text-[#123c32] shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  + Add Category
                </button>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
                <div className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span>Console Active</span>
              </div>
            </div>

            {/* TAB 1: LIVE ORDER QUEUE */}
            {adminTab === 'orders' && (
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* Metrics Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-[#f7f5ef] border border-stone-200 p-3.5 rounded-xl">
                    <div className="text-[11px] text-stone-500 font-medium">New Orders</div>
                    <div className="text-xl font-extrabold text-stone-900 font-mono-num mt-0.5">
                      {receivedCount}
                    </div>
                  </div>
                  <div className="bg-amber-50/70 border border-amber-200 p-3.5 rounded-xl">
                    <div className="text-[11px] text-amber-800 font-medium">In Kitchen</div>
                    <div className="text-xl font-extrabold text-amber-900 font-mono-num mt-0.5">
                      {inKitchenCount}
                    </div>
                  </div>
                  <div className="bg-emerald-50/70 border border-emerald-200 p-3.5 rounded-xl">
                    <div className="text-[11px] text-emerald-800 font-medium">Ready / Dispatched</div>
                    <div className="text-xl font-extrabold text-emerald-900 font-mono-num mt-0.5">
                      {readyCount}
                    </div>
                  </div>
                  <div className="bg-[#123c32]/5 border border-[#123c32]/20 p-3.5 rounded-xl">
                    <div className="text-[11px] text-[#123c32] font-medium">Total Shift Revenue</div>
                    <div className="text-xl font-extrabold text-[#123c32] font-mono-num mt-0.5">
                      {formatKWD(totalRevenue)}
                    </div>
                  </div>
                </div>

                {/* Filter & Search Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="relative w-full sm:w-72">
                    <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={orderSearch}
                      onChange={e => setOrderSearch(e.target.value)}
                      placeholder="Search order #, customer, building..."
                      className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#123c32] bg-white"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
                    {(['all', 'received', 'in_kitchen', 'ready', 'delivered'] as const).map(st => (
                      <button
                        key={st}
                        onClick={() => setStatusFilter(st)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                          statusFilter === st
                            ? 'bg-[#123c32] text-white shadow-xs'
                            : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                        }`}
                      >
                        {st === 'all' ? 'All Orders' : st.replace(/_/g, ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Orders List */}
                {filteredOrders.length === 0 ? (
                  <div className="text-center py-12 bg-stone-50 rounded-xl border border-stone-200 p-6 text-stone-500 text-xs">
                    No orders match your current filters.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredOrders.map(order => {
                      const waAlertLink = generateEmployeeStatusWhatsAppLink(order, order.status);

                      return (
                        <div
                          key={order.id}
                          className="bg-white border border-stone-200 rounded-xl p-4 sm:p-5 shadow-xs hover:border-stone-300 transition-all space-y-3"
                        >
                          {/* Order Header */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-black font-mono-num text-[#123c32] bg-stone-100 px-2.5 py-1 rounded-md">
                                #{order.orderNumber}
                              </span>
                              <div>
                                <span className="font-bold text-stone-900 text-xs sm:text-sm">
                                  {order.customerName}
                                </span>
                                {order.employeeNumber && (
                                  <span className="text-[11px] text-stone-500 ml-2 font-mono-num">
                                    ({order.employeeNumber})
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-3 text-xs">
                              <span className="text-stone-500">{formatDateTime(order.createdAt)}</span>
                              <span className="font-mono-num font-extrabold text-sm text-[#123c32]">
                                {formatKWD(order.totalAmount)}
                              </span>
                            </div>
                          </div>

                          {/* Order Body: Location, Phone, Items */}
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
                            <div className="md:col-span-5 space-y-1">
                              <div className="text-stone-700">
                                <strong>Delivery Location:</strong> {order.deliveryLocation}
                              </div>
                              <div className="text-stone-700">
                                <strong>Phone:</strong> +965 {order.mobileNumber}
                              </div>
                              {order.notes && (
                                <div className="text-amber-800 bg-amber-50 p-2 rounded-md border border-amber-200 text-[11px]">
                                  <strong>Kitchen Note:</strong> {order.notes}
                                </div>
                              )}
                            </div>

                            <div className="md:col-span-7 bg-stone-50 p-2.5 rounded-lg border border-stone-200/70">
                              <div className="font-bold text-stone-600 text-[11px] uppercase mb-1">
                                Ordered Items & Recipe Customizations:
                              </div>
                              <ul className="space-y-1 text-xs">
                                {order.items.map((it, idx) => (
                                  <li key={idx} className="flex flex-col">
                                    <div className="flex justify-between font-semibold text-stone-900">
                                      <span>{it.quantity}x {it.menuItem.name}</span>
                                      <span className="font-mono-num">{formatKWD(it.totalPrice)}</span>
                                    </div>
                                    <div className="text-[11px] text-stone-500 pl-2">
                                      {it.selectedBread && `[Bread: ${it.selectedBread.name}] `}
                                      {it.selectedExtras.length > 0 && `[+${it.selectedExtras.map(e => e.name).join(', ')}] `}
                                      {it.selectedRemovals.length > 0 && `[-No ${it.selectedRemovals.map(r => r.name).join(', ')}] `}
                                      {it.notes && `(Note: ${it.notes})`}
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Order Footer Controls */}
                          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-100">
                            {/* Status Change Selector */}
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] font-bold text-stone-500 uppercase">Status:</span>
                              <select
                                value={order.status}
                                onChange={e => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                                className={`text-xs font-bold px-3 py-1.5 rounded-lg border cursor-pointer focus:outline-none ${
                                  order.status === 'received'
                                    ? 'bg-blue-50 text-blue-900 border-blue-200'
                                    : order.status === 'in_kitchen'
                                    ? 'bg-amber-50 text-amber-900 border-amber-200'
                                    : order.status === 'ready'
                                    ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                                    : 'bg-stone-100 text-stone-700 border-stone-200'
                                }`}
                              >
                                <option value="received">New / Received</option>
                                <option value="in_kitchen">In Kitchen (Cooking)</option>
                                <option value="ready">Ready for Dispatch</option>
                                <option value="delivered">Delivered to Recipient</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            </div>

                            {/* Action Buttons: 1-Click Print & WhatsApp alert */}
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setPrintSlipOrder(order)}
                                className="px-3 py-1.5 bg-[#123c32] hover:bg-[#1a4f42] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                              >
                                <Printer className="w-3.5 h-3.5 text-[#d7a94b]" />
                                <span>1-Click Print Slip (A4)</span>
                              </button>

                              <a
                                href={waAlertLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
                                title="Send live WhatsApp status message to customer"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                                <span>WhatsApp Alert</span>
                              </a>

                              <button
                                onClick={() => deleteOrder(order.id)}
                                className="px-2.5 py-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer border border-red-200"
                                title="Delete this order from queue"
                              >
                                <Trash2 className="w-3.5 h-3.5 text-red-500" />
                                <span>Delete</span>
                              </button>
                            </div>

                          </div>

                        </div>
                      );
                    })}
                  </div>
                )}

              </div>
            )}

            {/* TAB 2: MENU & PRICES MANAGER */}
            {adminTab === 'menu' && (
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-stone-900">Menu Items & Live Pricing (KWD)</h4>
                    <p className="text-xs text-stone-500">
                      Edit 3-decimal KWD prices directly and toggle items In Stock / Sold Out.
                    </p>
                  </div>
                  <span className="text-xs text-stone-500 font-mono-num font-bold">
                    {menuItems.length} Total Items
                  </span>
                </div>

                <div className="border border-stone-200 rounded-xl overflow-hidden bg-white shadow-xs">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-stone-100 border-b border-stone-200 text-stone-600 font-bold uppercase text-[11px]">
                        <th className="py-2.5 px-3">Category</th>
                        <th className="py-2.5 px-3">Item Name</th>
                        <th className="py-2.5 px-3 w-32">Price (KWD)</th>
                        <th className="py-2.5 px-3 w-28 text-center">Stock State</th>
                        <th className="py-2.5 px-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {menuItems.map(item => (
                        <tr key={item.id} className="hover:bg-stone-50/70 transition-colors">
                          <td className="py-2.5 px-3 text-stone-500 capitalize">
                            {item.categoryId.replace(/_/g, ' ')}
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="font-bold text-stone-900">{item.name}</span>
                            {item.nameAr && (
                              <span className="block text-[11px] text-stone-400 font-arabic">{item.nameAr}</span>
                            )}
                          </td>
                          <td className="py-2.5 px-3">
                            {editingPriceItem?.id === item.id ? (
                              <div className="flex items-center gap-1">
                                <input
                                  type="number"
                                  step="0.010"
                                  value={editingPriceItem.price}
                                  onChange={e => setEditingPriceItem({ id: item.id, price: e.target.value })}
                                  className="w-20 p-1 border rounded-sm font-mono-num text-xs bg-white"
                                />
                                <button
                                  onClick={() => handleSavePrice(item.id)}
                                  className="px-2 py-1 bg-emerald-700 text-white rounded-sm text-[10px] font-bold cursor-pointer"
                                >
                                  Save
                                </button>
                              </div>
                            ) : (
                              <span className="font-mono-num font-extrabold text-[#123c32]">
                                {formatKWD(item.basePrice)}
                              </span>
                            )}
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            <button
                              onClick={() => toggleMenuItemSoldOut(item.id)}
                              className={`px-2.5 py-1 rounded-md text-[11px] font-bold cursor-pointer transition-colors ${
                                item.isSoldOut
                                  ? 'bg-red-100 text-red-800 border border-red-300'
                                  : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              }`}
                            >
                              {item.isSoldOut ? 'Sold Out' : 'In Stock'}
                            </button>
                          </td>
                          <td className="py-2.5 px-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setEditingPriceItem({ id: item.id, price: item.basePrice.toFixed(3) })}
                                className="text-stone-600 hover:text-[#123c32] p-1 font-semibold text-xs cursor-pointer inline-flex items-center gap-1 transition-colors"
                                title="Edit Price"
                              >
                                <Edit2 className="w-3 h-3" />
                                <span>Edit</span>
                              </button>

                              <button
                                onClick={() => {
                                  deleteMenuItem(item.id);
                                }}
                                className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1 px-2 rounded-md font-semibold text-xs cursor-pointer inline-flex items-center gap-1 transition-colors"
                                title="Remove Item from Menu"
                              >
                                <Trash2 className="w-3 h-3 text-red-500" />
                                <span>Remove</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 3: ADD MENU ITEM */}
            {adminTab === 'add_item' && (
              <div className="flex-1 overflow-y-auto p-6 max-w-xl mx-auto w-full space-y-4">
                <h4 className="font-bold text-sm text-stone-900">Add New Dish or Catering Option</h4>
                
                <form onSubmit={handleCreateMenuItem} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Item English Name *</label>
                    <input
                      type="text"
                      required
                      value={newItemName}
                      onChange={e => setNewItemName(e.target.value)}
                      placeholder="e.g. Halloumi & Pesto Baguette"
                      className="w-full p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-[#123c32]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Item Arabic Name (Optional)</label>
                    <input
                      type="text"
                      value={newItemNameAr}
                      onChange={e => setNewItemNameAr(e.target.value)}
                      placeholder="e.g. سندويش حلومي بالبيستو"
                      className="w-full p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-[#123c32] font-arabic"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Category *</label>
                      <select
                        value={newItemCategory}
                        onChange={e => setNewItemCategory(e.target.value as CategoryId)}
                        className="w-full p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-[#123c32]"
                      >
                        {categories.map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Base Price in KWD (3 decimals) *</label>
                      <input
                        type="number"
                        step="0.005"
                        required
                        value={newItemPrice}
                        onChange={e => setNewItemPrice(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-[#123c32] font-mono-num"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Description</label>
                    <textarea
                      rows={3}
                      value={newItemDesc}
                      onChange={e => setNewItemDesc(e.target.value)}
                      placeholder="Describe ingredients, cooking method, sides..."
                      className="w-full p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-[#123c32] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#123c32] hover:bg-[#1a4f42] text-white font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Save & Add to Live Menu
                  </button>
                </form>
              </div>
            )}

            {/* TAB 4: ADD CATEGORY */}
            {adminTab === 'add_category' && (
              <div className="flex-1 overflow-y-auto p-6 max-w-xl mx-auto w-full space-y-4">
                <h4 className="font-bold text-sm text-stone-900">Add New Menu Category</h4>
                
                <form onSubmit={handleCreateCategory} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Category Name (English) *</label>
                    <input
                      type="text"
                      required
                      value={newCatName}
                      onChange={e => setNewCatName(e.target.value)}
                      placeholder="e.g. Bakery & Pastries"
                      className="w-full p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-[#123c32]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Category Name (Arabic)</label>
                    <input
                      type="text"
                      value={newCatNameAr}
                      onChange={e => setNewCatNameAr(e.target.value)}
                      placeholder="e.g. المخبوزات والمعجنات"
                      className="w-full p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-[#123c32] font-arabic"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={newCatDesc}
                      onChange={e => setNewCatDesc(e.target.value)}
                      placeholder="Category description shown to employees"
                      className="w-full p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-[#123c32] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#123c32] hover:bg-[#1a4f42] text-white font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Create Category
                  </button>
                </form>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
