/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useId } from 'react';
import { MenuItem, BreadOption, ExtraOption, RemovalOption, CartItem } from '../types.ts';
import { useApp } from '../context/AppContext.tsx';
import { formatKWD } from '../utils/format.ts';
import { X, Plus, Minus, Check, Flame, AlertCircle } from 'lucide-react';

interface CustomizationModalProps {
  item: MenuItem;
  onClose: () => void;
}

export const CustomizationModal: React.FC<CustomizationModalProps> = ({ item, onClose }) => {
  const { addToCart } = useApp();
  const notesId = useId();

  // Selected Bread (defaults to first available or samoon/white_toast)
  const defaultBread = item.availableBreads && item.availableBreads.length > 0 
    ? (item.availableBreads.find(b => b.id === item.defaultBreadId) || item.availableBreads[0])
    : undefined;
  
  const [selectedBread, setSelectedBread] = useState<BreadOption | undefined>(defaultBread);
  const [selectedExtras, setSelectedExtras] = useState<ExtraOption[]>([]);
  const [selectedRemovals, setSelectedRemovals] = useState<RemovalOption[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  // Calculate live unit price
  const breadDelta = selectedBread ? selectedBread.priceDelta : 0;
  const extrasTotal = selectedExtras.reduce((sum, extra) => sum + extra.price, 0);
  const removalsDiscount = selectedRemovals.reduce((sum, rem) => sum + rem.discount, 0);

  // Price cannot drop below 0
  const unitPrice = Math.max(0, item.basePrice + breadDelta + extrasTotal - removalsDiscount);
  const totalPrice = unitPrice * quantity;

  const handleToggleExtra = (extra: ExtraOption) => {
    setSelectedExtras(prev => {
      const exists = prev.some(e => e.id === extra.id);
      if (exists) {
        return prev.filter(e => e.id !== extra.id);
      } else {
        return [...prev, extra];
      }
    });
  };

  const handleToggleRemoval = (removal: RemovalOption) => {
    setSelectedRemovals(prev => {
      const exists = prev.some(r => r.id === removal.id);
      if (exists) {
        return prev.filter(r => r.id !== removal.id);
      } else {
        return [...prev, removal];
      }
    });
  };

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      cartId: `cart_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      menuItem: item,
      quantity,
      selectedBread,
      selectedExtras,
      selectedRemovals,
      notes: notes.trim() || undefined,
      unitPrice,
      totalPrice
    };

    addToCart(cartItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="customization-title"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#123c32] text-white flex items-center justify-between shrink-0">
          <div>
            <h3 id="customization-title" className="text-lg font-bold text-white flex items-center gap-2">
              <span>{item.name}</span>
              {item.isPackage && (
                <span className="text-xs bg-[#d7a94b] text-[#123c32] font-semibold px-2 py-0.5 rounded-sm">
                  Feast Package
                </span>
              )}
            </h3>
            {item.nameAr && (
              <p className="text-xs text-stone-300 font-arabic mt-0.5">{item.nameAr}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-stone-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          
          {/* Base Item Description & Pricing */}
          <div className="bg-[#f7f5ef] p-3.5 rounded-xl border border-stone-200">
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">{item.description}</p>
            <div className="mt-2 flex items-center justify-between text-xs font-medium text-stone-600">
              <span>Base Price:</span>
              <span className="font-mono-num font-bold text-[#123c32] text-sm">{formatKWD(item.basePrice)}</span>
            </div>
          </div>

          {/* Bread Selection (if available) */}
          {item.availableBreads && item.availableBreads.length > 0 && (
            <div className="space-y-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center justify-between">
                <span>Select Bread Choice</span>
                <span className="text-stone-400 font-normal text-[11px]">Required</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {item.availableBreads.map(bread => {
                  const isSelected = selectedBread?.id === bread.id;
                  return (
                    <button
                      key={bread.id}
                      type="button"
                      onClick={() => setSelectedBread(bread)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected 
                          ? 'border-[#123c32] bg-[#123c32]/5 text-[#123c32] ring-1 ring-[#123c32]'
                          : 'border-stone-200 hover:border-stone-300 bg-white text-stone-800'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold">{bread.name}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#123c32]" />}
                      </div>
                      <div className="mt-1 flex items-center justify-between text-[11px]">
                        <span className="text-stone-500">{bread.nameAr || ''}</span>
                        <span className="font-mono-num font-semibold text-stone-700">
                          {bread.priceDelta > 0 ? `+${formatKWD(bread.priceDelta)}` : 'Free'}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Extras & Add-ons */}
          {item.extras && item.extras.length > 0 && (
            <div className="space-y-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center justify-between">
                <span>Extras & Add-ons</span>
                <span className="text-stone-400 font-normal text-[11px]">Optional</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {item.extras.map(extra => {
                  const isChecked = selectedExtras.some(e => e.id === extra.id);
                  return (
                    <button
                      key={extra.id}
                      type="button"
                      onClick={() => handleToggleExtra(extra)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                        isChecked 
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-600'
                          : 'border-stone-200 hover:border-stone-300 bg-white text-stone-800'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                          isChecked ? 'bg-emerald-700 border-emerald-700 text-white' : 'border-stone-300 bg-white'
                        }`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="text-xs font-medium">{extra.name}</span>
                      </div>
                      <span className="text-xs font-mono-num font-semibold text-stone-700">
                        {extra.price > 0 ? `+${formatKWD(extra.price)}` : 'Free'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Removals / Customizations (With Live Discount Recalculation if applicable) */}
          {item.removals && item.removals.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  Customization Removals
                </label>
                {removalsDiscount > 0 && (
                  <span className="text-xs text-amber-700 font-semibold font-mono-num bg-amber-50 px-2 py-0.5 rounded-sm border border-amber-200">
                    Live Discount: -{formatKWD(removalsDiscount)}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-stone-500">
                Check any ingredient or box you prefer excluded from this order.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {item.removals.map(removal => {
                  const isChecked = selectedRemovals.some(r => r.id === removal.id);
                  return (
                    <button
                      key={removal.id}
                      type="button"
                      onClick={() => handleToggleRemoval(removal)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                        isChecked 
                          ? 'border-amber-600 bg-amber-50 text-amber-950 ring-1 ring-amber-600'
                          : 'border-stone-200 hover:border-stone-300 bg-white text-stone-800'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                          isChecked ? 'bg-amber-600 border-amber-600 text-white' : 'border-stone-300 bg-white'
                        }`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="text-xs font-medium">{removal.name}</span>
                      </div>
                      {removal.discount > 0 ? (
                        <span className="text-xs font-mono-num font-bold text-amber-800">
                          -{formatKWD(removal.discount)}
                        </span>
                      ) : (
                        <span className="text-[11px] text-stone-400">Exclude</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Kitchen Preparation Notes */}
          <div className="space-y-1.5">
            <label htmlFor={notesId} className="text-xs font-bold uppercase tracking-wider text-stone-700">
              Special Kitchen Instructions
            </label>
            <textarea
              id={notesId}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="e.g. Well toasted, cut into halves, extra napkins, serve separately..."
              rows={2}
              className="w-full text-xs p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#123c32] bg-white resize-none"
            />
          </div>

        </div>

        {/* Modal Footer - Sticky Summary & Action */}
        <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          
          {/* Quantity Stepper */}
          <div className="flex items-center justify-between w-full sm:w-auto gap-4">
            <span className="text-xs font-medium text-stone-600">Quantity:</span>
            <div className="flex items-center bg-white border border-stone-300 rounded-lg overflow-hidden shadow-xs">
              <button
                type="button"
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 disabled:opacity-40 transition-colors cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="px-4 text-xs font-bold font-mono-num text-stone-900 min-w-8 text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(q => q + 1)}
                className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Pricing & Add to Cart button */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <div className="text-right">
              <div className="text-[11px] text-stone-500">Total Price</div>
              <div className="text-base font-extrabold font-mono-num text-[#123c32]">
                {formatKWD(totalPrice)}
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 sm:flex-none px-6 py-2.5 bg-[#123c32] hover:bg-[#1a4f42] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-95 cursor-pointer whitespace-nowrap"
            >
              Add to Order
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
