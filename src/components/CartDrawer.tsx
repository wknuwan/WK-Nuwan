/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { KNPC_LOCATIONS, Order } from '../types.ts';
import { formatKWD, validateKuwaitPhone } from '../utils/format.ts';
import { generateKitchenOrderWhatsAppLink, KITCHEN_PHONE } from '../utils/whatsapp.ts';
import { X, Trash2, Plus, Minus, ShoppingBag, Truck, MessageSquare, AlertCircle, CheckCircle } from 'lucide-react';

interface CartDrawerProps {
  onOrderPlaced: (order: Order) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onOrderPlaced }) => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateCartQuantity, clearCart, placeOrder } = useApp();

  const [customerName, setCustomerName] = useState('');
  const [employeeNumber, setEmployeeNumber] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isCartOpen) return null;

  const totalAmount = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (cart.length === 0) {
      setErrorMsg('Your order bag is currently empty.');
      return;
    }

    if (!customerName.trim()) {
      setErrorMsg('Please enter your Name or Department Contact.');
      return;
    }

    if (!selectedLocation.trim()) {
      setErrorMsg('Please enter your KNPC Delivery Location (e.g. MAB FIRE).');
      return;
    }

    const phoneCheck = validateKuwaitPhone(mobileNumber);
    if (!phoneCheck.isValid) {
      setErrorMsg(phoneCheck.message || 'Please enter a valid 8 or 5-digit Kuwait mobile number.');
      return;
    }

    const finalLocation = selectedLocation.trim();

    const newOrder = placeOrder({
      customerName: customerName.trim(),
      employeeNumber: employeeNumber.trim() || undefined,
      deliveryLocation: finalLocation,
      mobileNumber: mobileNumber.trim(),
      notes: orderNotes.trim() || undefined
    });

    setIsCartOpen(false);
    onOrderPlaced(newOrder);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
      >
        
        {/* Drawer Header */}
        <div className="px-6 py-4 bg-[#123c32] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#d7a94b]" />
            <h3 id="cart-drawer-title" className="font-bold text-base text-white">
              Shift Order Bag ({totalItems})
            </h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1 rounded-lg text-stone-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Announcement */}
        <div className="bg-emerald-50 border-b border-emerald-100 px-6 py-2.5 flex items-center gap-2 text-xs text-emerald-900 font-medium">
          <Truck className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>Always-Free Continuous Delivery to all KNPC MAB & SHU</span>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-stone-800 text-sm">Your order bag is empty</h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Explore our sandwiches, club sandwiches, Arabic breakfast mezze, and feast packages.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-5 py-2 bg-[#123c32] text-white rounded-lg text-xs font-semibold hover:bg-[#1a4f42] transition-colors cursor-pointer"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <>
              {/* Itemized List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-stone-500 uppercase tracking-wider">
                  <span>Ordered Items</span>
                  <button
                    onClick={clearCart}
                    className="text-stone-400 hover:text-red-600 transition-colors cursor-pointer normal-case text-xs font-normal"
                  >
                    Clear All
                  </button>
                </div>

                <div className="divide-y divide-stone-100 border border-stone-200 rounded-xl overflow-hidden bg-white">
                  {cart.map(item => (
                    <div key={item.cartId} className="p-3.5 space-y-2 hover:bg-stone-50/50 transition-colors">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h4 className="font-bold text-xs sm:text-sm text-stone-900">
                            {item.menuItem.name}
                          </h4>
                          {/* Selected bread */}
                          {item.selectedBread && (
                            <div className="text-[11px] text-stone-600 mt-0.5">
                              Bread: <strong>{item.selectedBread.name}</strong>
                              {item.selectedBread.priceDelta > 0 && ` (+${formatKWD(item.selectedBread.priceDelta)})`}
                            </div>
                          )}
                          {/* Extras */}
                          {item.selectedExtras.length > 0 && (
                            <div className="text-[11px] text-emerald-700 mt-0.5">
                              + {item.selectedExtras.map(e => e.name).join(', ')}
                            </div>
                          )}
                          {/* Removals */}
                          {item.selectedRemovals.length > 0 && (
                            <div className="text-[11px] text-amber-700 mt-0.5">
                              - Excluded: {item.selectedRemovals.map(r => r.name).join(', ')}
                            </div>
                          )}
                          {/* Notes */}
                          {item.notes && (
                            <div className="text-[11px] text-stone-500 italic mt-0.5">
                              Note: {item.notes}
                            </div>
                          )}
                        </div>

                        {/* Price & Trash */}
                        <div className="text-right shrink-0">
                          <span className="font-mono-num font-bold text-xs text-[#123c32]">
                            {formatKWD(item.totalPrice)}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.cartId)}
                            className="block ml-auto mt-1 text-stone-400 hover:text-red-500 p-1 cursor-pointer transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center justify-between pt-1 border-t border-stone-100">
                        <span className="text-[11px] text-stone-500">
                          Unit: {formatKWD(item.unitPrice)}
                        </span>
                        <div className="flex items-center bg-stone-100 rounded-md overflow-hidden">
                          <button
                            onClick={() => updateCartQuantity(item.cartId, -1)}
                            className="p-1 px-2 text-stone-600 hover:text-stone-900 hover:bg-stone-200 transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold font-mono-num text-stone-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.cartId, 1)}
                            className="p-1 px-2 text-stone-600 hover:text-stone-900 hover:bg-stone-200 transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Details Form */}
              <form onSubmit={handleSubmitOrder} className="space-y-4 pt-2">
                <div className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#123c32]" />
                  <span>Kuwait Delivery Details</span>
                </div>

                {errorMsg && (
                  <div className="bg-red-50 border border-red-200 text-red-800 text-xs p-3 rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="space-y-3">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Customer / Recipient Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={e => setCustomerName(e.target.value)}
                      placeholder=" "
                      className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-[#123c32] focus:outline-none bg-stone-50"
                    />
                  </div>

                  {/* Employee ID */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      KNPC Employee ID / Badge Number 
                    </label>
                    <input
                      type="text"
                      value={employeeNumber}
                      onChange={e => setEmployeeNumber(e.target.value)}
                      placeholder=" "
                      className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-[#123c32] focus:outline-none bg-stone-50"
                    />
                  </div>

                  {/* KNPC Delivery Location Building */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      KNPC Delivery Location (MAB & SHU) *
                    </label>
                    <input
                      type="text"
                      required
                      list="knpc-locations-list"
                      value={selectedLocation}
                      onChange={e => setSelectedLocation(e.target.value)}
                      placeholder="e.g. MAB FIRE"
                      className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-[#123c32] focus:outline-none bg-stone-50"
                    />
                    <datalist id="knpc-locations-list">
                      {KNPC_LOCATIONS.map(loc => (
                        <option key={loc} value={loc} />
                      ))}
                    </datalist>
                  </div>

                  {/* Kuwait Mobile */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Kuwait Mobile Number (+965) *
                    </label>
                    <div className="flex items-center">
                      <span className="bg-stone-200 border border-r-0 border-stone-300 px-3 py-2.5 text-xs font-bold text-stone-700 rounded-l-xl">
                        +965
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={8}
                        value={mobileNumber}
                        onChange={e => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                        placeholder="83277"
                        className="w-full text-xs p-2.5 rounded-r-xl border border-stone-300 focus:ring-2 focus:ring-[#123c32] focus:outline-none bg-stone-50 font-mono-num"
                      />
                    </div>
                  </div>
                </div>

                {/* Bill Breakdown */}
                <div className="bg-[#f7f5ef] p-3.5 rounded-xl border border-stone-200 space-y-2 text-xs">
                  <div className="flex justify-between text-stone-600">
                    <span>Order Subtotal:</span>
                    <span className="font-mono-num font-semibold">{formatKWD(totalAmount)}</span>
                  </div>
                  <div className="flex justify-between text-emerald-800">
                    <span>Delivery (KNPC):</span>
                    <span className="font-bold uppercase tracking-wide">FREE</span>
                  </div>
                  <div className="border-t border-stone-200 pt-2 flex justify-between font-bold text-stone-900 text-sm">
                    <span>Total Amount:</span>
                    <span className="font-mono-num text-[#123c32] text-base">{formatKWD(totalAmount)}</span>
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 bg-[#123c32] hover:bg-[#1a4f42] text-white font-bold text-sm rounded-xl shadow-lg transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-[#d7a94b]" />
                  <span>Place Shift Order & WhatsApp Confirmation</span>
                </button>
              </form>
            </>
          )}

        </div>

      </div>
    </div>
  );
};
