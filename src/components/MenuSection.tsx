/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { MenuItem, CategoryId } from '../types.ts';
import { formatKWD } from '../utils/format.ts';
import { Search, Plus, Utensils, Sparkles, AlertCircle } from 'lucide-react';

export const MenuSection: React.FC = () => {
  const { categories, menuItems, activeCategoryId, setActiveCategoryId, setCustomizingItem } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter items by category and search
  const filteredItems = menuItems.filter(item => {
    const matchesCategory = activeCategoryId === 'all' || item.categoryId === activeCategoryId;
    if (!matchesCategory) return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const matchesName = item.name.toLowerCase().includes(q);
    const matchesDesc = item.description.toLowerCase().includes(q);
    const matchesArabic = item.nameAr ? item.nameAr.includes(q) : false;
    return matchesName || matchesDesc || matchesArabic;
  });

  const activeCategory = categories.find(c => c.id === activeCategoryId);

  return (
    <section id="menu-section" className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      {/* Category Navigation Tabs */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#123c32]">
              Refinery Catering Menu
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Freshly prepared orders dispatched continuously to all KNPC Mina Abdulla facilities.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search sandwiches, foul, shakshuka..."
              className="w-full text-xs pl-9 pr-4 py-2.5 rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#123c32] focus:border-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-1.5 p-1.5 bg-stone-200/70 rounded-xl overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveCategoryId('all')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              activeCategoryId === 'all'
                ? 'bg-white text-[#123c32] shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            All Items ({menuItems.length})
          </button>
          {categories.map(cat => {
            const count = menuItems.filter(i => i.categoryId === cat.id).length;
            const isSelected = activeCategoryId === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategoryId(cat.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#123c32] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-300/40'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[11px] opacity-75 font-normal`}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Header banner if selected */}
      {activeCategory && activeCategoryId !== 'all' && (
        <div className="bg-[#f7f5ef] border border-stone-200/80 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-[#123c32] text-base">{activeCategory.name}</h3>
              <span className="text-xs text-stone-400 font-arabic">{activeCategory.nameAr}</span>
            </div>
            <p className="text-xs text-stone-600 mt-0.5">{activeCategory.description}</p>
          </div>
          <span className="text-xs font-bold text-[#123c32] bg-white px-2.5 py-1 rounded-md border border-stone-200 shrink-0 font-mono-num">
            {activeCategory.countBadge || `${filteredItems.length} Available`}
          </span>
        </div>
      )}

      {/* Grid of Menu Cards */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-stone-300 p-8 space-y-3">
          <Utensils className="w-10 h-10 text-stone-400 mx-auto stroke-[1.5]" />
          <h4 className="text-base font-bold text-stone-800">No menu items found</h4>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            We couldn't find anything matching "{searchQuery}". Try searching for another ingredient or reset the filter.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setActiveCategoryId('all'); }}
            className="px-4 py-2 text-xs font-semibold text-[#123c32] bg-stone-100 rounded-lg hover:bg-stone-200 transition-colors"
          >
            Show All Items
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map(item => {
            const hasCustomizations = (item.availableBreads && item.availableBreads.length > 0) ||
              (item.extras && item.extras.length > 0) ||
              (item.removals && item.removals.length > 0);

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-stone-200/90 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Card Content */}
                  <div className="p-4 space-y-2.5">
                    {/* Badges row: Category / Package / Sold Out */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {item.isPackage ? (
                          <span className="bg-[#d7a94b] text-[#123c32] font-extrabold text-[10px] px-2 py-0.5 rounded-sm uppercase tracking-wider">
                            {item.packageItemCount} Dishes Included
                          </span>
                        ) : (
                          <span className="text-[11px] font-semibold text-stone-500 capitalize">
                            {item.categoryId.replace(/_/g, ' ')}
                          </span>
                        )}
                      </div>

                      {item.isSoldOut && (
                        <span className="bg-red-50 text-red-700 border border-red-200 font-bold text-[10px] uppercase px-2 py-0.5 rounded-sm">
                          Sold Out
                        </span>
                      )}
                    </div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-stone-900 text-sm leading-snug group-hover:text-[#123c32] transition-colors">
                          {item.name}
                        </h4>
                        {item.nameAr && (
                          <div className="text-[11px] text-stone-500 font-arabic mt-0.5">
                            {item.nameAr}
                          </div>
                        )}
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-mono-num font-extrabold text-sm text-[#123c32]">
                          {formatKWD(item.basePrice)}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Quiet summary of available options */}
                    {hasCustomizations && (
                      <div className="text-[11px] text-stone-400 flex items-center gap-1.5 pt-1">
                        {item.availableBreads && <span>Bread choices</span>}
                        {item.availableBreads && item.removals && <span>·</span>}
                        {item.removals && <span>Customizable</span>}
                        {item.isPackage && <span>· Live Discounts</span>}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Action Button */}
                <div className="p-4 pt-0">
                  <button
                    onClick={() => setCustomizingItem(item)}
                    disabled={item.isSoldOut}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      item.isSoldOut
                        ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                        : 'bg-stone-100 hover:bg-[#123c32] text-stone-800 hover:text-white active:scale-98'
                    }`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{hasCustomizations ? 'Customize & Add' : 'Add to Order'}</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </section>
  );
};
