/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { Order } from '../types.ts';
import { formatKWD, formatDateTime } from '../utils/format.ts';
import { Printer, X, Check, Building2, Phone, Calendar } from 'lucide-react';
import { KITCHEN_PHONE } from '../utils/whatsapp.ts';

interface PrintSlipModalProps {
  order: Order;
  onClose: () => void;
}

export const PrintSlipModal: React.FC<PrintSlipModalProps> = ({ order, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* Screen Modal view */}
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 no-print">
        <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
          
          {/* Modal Header */}
          <div className="px-6 py-4 bg-[#123c32] text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Printer className="w-5 h-5 text-[#d7a94b]" />
              <h3 className="font-bold text-base">Print Kitchen Slip (A4 Single-Page)</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="px-4 py-1.5 bg-[#d7a94b] hover:bg-[#c9993c] text-[#123c32] font-bold text-xs rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Slip Now</span>
              </button>
              <button
                onClick={onClose}
                className="p-1 rounded-lg text-stone-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Preview Area */}
          <div className="p-4 sm:p-6 overflow-y-auto bg-stone-200 flex-1 flex justify-center">
            {/* Render paper preview */}
            <div className="bg-white w-full max-w-[210mm] shadow-xl border border-stone-300">
              <SlipContent order={order} />
            </div>
          </div>

        </div>
      </div>

      {/* Actual Print-Only DOM element that gets printed when window.print() is executed */}
      <div className="print-only-container">
        <SlipContent order={order} />
      </div>
    </>
  );
};

// Pure Slip Content Component used for both screen preview and @media print
const SlipContent: React.FC<{ order: Order }> = ({ order }) => {
  return (
    <div className="w-full max-w-[210mm] mx-auto p-6 sm:p-8 bg-white text-black font-sans leading-tight min-h-[272mm] flex flex-col justify-between box-border">
      
      {/* Top and Body Section */}
      <div className="space-y-4">
        
        {/* Official KNPC Header */}
        <div className="border-b-2 border-black pb-3 flex items-center justify-between gap-4">
          <img
            src="/src/assets/images/KNPC.png"
            alt="KNPC Logo"
            className="h-14 sm:h-16 w-auto object-contain shrink-0"
          />
          <div className="flex-1 text-center space-y-1">
            <div className="text-xl sm:text-2xl font-black tracking-wider uppercase">
              KUWAIT NATIONAL PETROLEUM COMPANY
            </div>
            <div className="text-sm sm:text-base font-extrabold text-stone-900 tracking-wide">
              CENTER KITCHEN · MINA ABDULLA (MAB) REFINERY
            </div>
            <div className="text-xs text-stone-700 font-medium">
              Direct Kitchen Hotline: <strong>{KITCHEN_PHONE}</strong> · Always-Free Shift Delivery to MAB & SHU
            </div>
          </div>
          <div className="w-14 sm:w-16 shrink-0 hidden sm:block" />
        </div>

        {/* Order Meta & Status Grid */}
        <div className="py-2.5 border-b-2 border-black grid grid-cols-2 gap-4 items-center">
          <div>
            <div className="text-[11px] uppercase font-bold text-stone-600">Official Order No.</div>
            <div className="text-base sm:text-lg font-bold font-mono-num tracking-tight mt-0.5">
              {order.orderNumber}
            </div>
            <div className="text-xs text-stone-700 mt-0.5">
              Order Date/Time: <strong className="font-semibold">{formatDateTime(order.createdAt)}</strong>
            </div>
          </div>

          <div className="text-right space-y-1">
            <div className="text-xs sm:text-sm text-stone-800">
              Payment: <strong className="font-bold">Cash on Delivery</strong>
            </div>
          </div>
        </div>

        {/* Customer & Delivery Location Box */}
        <div className="border-2 border-black bg-stone-50 p-3.5 rounded-xs grid grid-cols-2 gap-4">
          <div>
            <span className="text-xs uppercase font-bold text-stone-600 block">Customer / Employee Name:</span>
            <span className="font-black text-base sm:text-lg text-black block mt-0.5">
              {order.customerName}
            </span>
            {order.employeeNumber && (
              <span className="block text-xs font-mono-num text-stone-800 font-semibold mt-0.5">
                Badge / Employee ID: <strong>{order.employeeNumber}</strong>
              </span>
            )}
          </div>

          <div>
            <span className="text-xs uppercase font-bold text-stone-600 block">KNPC Delivery Location:</span>
            <span className="font-bold text-sm sm:text-base text-black block mt-0.5">
              {order.deliveryLocation}
            </span>
            <span className="text-xs font-mono-num text-stone-800 font-semibold block mt-0.5">
              Contact Mobile: <strong>+965 {order.mobileNumber}</strong>
            </span>
          </div>
        </div>

        {/* Special Kitchen Notes if any */}
        {order.notes && (
          <div className="p-2.5 border-2 border-black bg-amber-50 text-xs">
            <strong className="text-xs uppercase block text-amber-950 font-bold mb-0.5">
              Kitchen Preparation & Delivery Instructions:
            </strong>
            <span className="text-sm font-medium">{order.notes}</span>
          </div>
        )}

        {/* Kitchen Itemized Customization Table */}
        <div className="mt-2">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b-2 border-black bg-stone-100 text-xs uppercase font-extrabold">
                <th className="py-2 px-3 w-14 text-center">Qty</th>
                <th className="py-2 px-3">Item & Kitchen Recipe Customizations</th>
                <th className="py-2 px-3 text-right w-28">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-300">
              {order.items.map((item, idx) => (
                <tr key={idx} className="page-break-avoid">
                  <td className="py-2.5 px-3 text-center font-black font-mono-num text-base align-top">
                    {item.quantity}x
                  </td>
                  <td className="py-2.5 px-3 align-top space-y-1">
                    <div className="font-bold text-sm sm:text-base text-black">
                      {item.menuItem.name}
                    </div>
                    
                    {/* Bread specification */}
                    {item.selectedBread && (
                      <div className="text-xs font-semibold text-stone-800">
                        • Bread: <span className="underline font-bold">{item.selectedBread.name}</span>
                      </div>
                    )}

                    {/* Extras added */}
                    {item.selectedExtras.length > 0 && (
                      <div className="text-xs text-emerald-900 font-bold">
                        • Extras: {item.selectedExtras.map(e => `${e.name}${e.price > 0 ? ` (+${formatKWD(e.price)})` : ''}`).join(', ')}
                      </div>
                    )}

                    {/* Removals specified */}
                    {item.selectedRemovals.length > 0 && (
                      <div className="text-xs text-amber-950 font-extrabold bg-amber-100 px-1.5 py-0.5 rounded-xs inline-block my-0.5 border border-amber-300">
                        • REMOVED / EXCLUDE: {item.selectedRemovals.map(r => `${r.name}${r.discount > 0 ? ` (-${formatKWD(r.discount)})` : ''}`).join(', ')}
                      </div>
                    )}

                    {/* Item note */}
                    {item.notes && (
                      <div className="text-xs text-stone-700 italic">
                        • Note: {item.notes}
                      </div>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono-num font-extrabold text-sm sm:text-base align-top">
                    {formatKWD(item.totalPrice)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* Bottom Footer Section: Total and Sign-off Anchored to Page Bottom */}
      <div className="space-y-4 mt-6 pt-3 border-t-2 border-black page-break-avoid">
        
        {/* Total Amount Box */}
        <div className="flex justify-between items-center py-2 bg-stone-50 px-3 border border-black">
          <div>
            <div className="text-xs font-extrabold uppercase text-stone-700">Refinery Shift Kitchen Logistics</div>
            <div className="text-xs text-stone-600">Continuous Dispatch · Mina Abdulla (MAB) & Shuaiba (SHU)</div>
          </div>

          <div className="text-right">
            <div className="text-xs font-bold uppercase text-stone-700">Total Net Payable:</div>
            <div className="text-2xl sm:text-3xl font-black font-mono-num text-black">
              {formatKWD(order.totalAmount)}
            </div>
          </div>
        </div>

        {/* Delivery Receipt Handover Section */}
        <div className="space-y-3">
          <div className="text-xs font-black uppercase tracking-wider text-black text-center bg-stone-200 py-1.5 border border-black">
            Delivery Receipt
          </div>

          <div className="grid grid-cols-3 gap-6 pt-1 text-xs">
            <div className="space-y-2">
              <span className="block text-xs uppercase font-extrabold text-stone-800">Employee Name:</span>
              <div className="border-b-2 border-black h-12"></div>
            </div>

            <div className="space-y-2">
              <span className="block text-xs uppercase font-extrabold text-stone-800">Employee Number (ID):</span>
              <div className="border-b-2 border-black h-12"></div>
            </div>

            <div className="space-y-2">
              <span className="block text-xs uppercase font-extrabold text-stone-800">Employee Signature:</span>
              <div className="border-b-2 border-black h-12"></div>
            </div>
          </div>

          <div className="flex justify-between items-center text-[10px] text-stone-500 pt-2 border-t border-stone-300">
            <span>KNPC Center Kitchen Official Slip (MAB) · Form Ref: KNPC-CK-A4-2026</span>
            <span>Printed: {new Date().toLocaleString('en-GB')}</span>
          </div>
        </div>

      </div>

    </div>
  );
};
