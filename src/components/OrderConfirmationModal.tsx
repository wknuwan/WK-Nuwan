/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Order } from '../types.ts';
import { formatKWD, formatDateTime } from '../utils/format.ts';
import { generateKitchenOrderWhatsAppLink, KITCHEN_PHONE } from '../utils/whatsapp.ts';
import { CheckCircle2, MessageSquare, Printer, X, Phone, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';

interface OrderConfirmationModalProps {
  order: Order;
  onClose: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({ order, onClose }) => {
  const { setPrintSlipOrder } = useApp();
  const whatsappUrl = generateKitchenOrderWhatsAppLink(order);

  const handlePrint = () => {
    setPrintSlipOrder(order);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-confirmed-title"
      >
        
        {/* Header */}
        <div className="bg-[#123c32] p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-stone-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close confirmation"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 rounded-full bg-[#d7a94b]/20 border-2 border-[#d7a94b] flex items-center justify-center mx-auto text-[#d7a94b] mb-3">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h3 id="order-confirmed-title" className="text-xl font-extrabold text-white">
            Order Confirmed!
          </h3>
          <p className="text-xs text-stone-200 mt-1">
            Order <strong className="text-[#d7a94b] font-mono-num font-bold">#{order.orderNumber}</strong> received by KNPC Center Kitchen
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-xs text-stone-700">
          
          {/* Quick Details Box */}
          <div className="bg-[#f7f5ef] p-4 rounded-xl border border-stone-200 space-y-2">
            <div className="flex justify-between">
              <span className="text-stone-500">Recipient:</span>
              <span className="font-semibold text-stone-900">{order.customerName}</span>
            </div>
            {order.employeeNumber && (
              <div className="flex justify-between">
                <span className="text-stone-500">Employee ID:</span>
                <span className="font-semibold text-stone-900 font-mono-num">{order.employeeNumber}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-stone-500">Delivery Location:</span>
              <span className="font-semibold text-[#123c32] text-right">{order.deliveryLocation}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Mobile:</span>
              <span className="font-semibold font-mono-num">+965 {order.mobileNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Time:</span>
              <span className="font-medium text-stone-600">{formatDateTime(order.createdAt)}</span>
            </div>
            <div className="border-t border-stone-200 pt-2 flex justify-between font-bold text-stone-900 text-sm">
              <span>Total Payable:</span>
              <span className="font-mono-num text-[#123c32]">{formatKWD(order.totalAmount)}</span>
            </div>
          </div>

          {/* Ordered items preview */}
          <div>
            <div className="font-bold text-stone-700 uppercase tracking-wider mb-2 text-[11px]">
              Summary of Items
            </div>
            <ul className="divide-y divide-stone-100 border border-stone-200 rounded-xl overflow-hidden bg-white max-h-40 overflow-y-auto">
              {order.items.map((item, idx) => (
                <li key={idx} className="p-2.5 flex items-start justify-between">
                  <div>
                    <span className="font-bold text-stone-900">{item.quantity}x {item.menuItem.name}</span>
                    {item.selectedBread && (
                      <span className="block text-[11px] text-stone-500">Bread: {item.selectedBread.name}</span>
                    )}
                    {item.selectedExtras.length > 0 && (
                      <span className="block text-[11px] text-emerald-700">+ {item.selectedExtras.map(e => e.name).join(', ')}</span>
                    )}
                    {item.selectedRemovals.length > 0 && (
                      <span className="block text-[11px] text-amber-700">- {item.selectedRemovals.map(r => r.name).join(', ')}</span>
                    )}
                  </div>
                  <span className="font-mono-num font-bold text-stone-700">{formatKWD(item.totalPrice)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-200" />
              <span>Send Order to Kitchen WhatsApp (+965 98951187)</span>
            </a>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handlePrint}
                className="flex-1 py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4 text-[#123c32]" />
                <span>Print Kitchen Slip (A4)</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-6 bg-stone-200 hover:bg-stone-300 text-stone-800 font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
