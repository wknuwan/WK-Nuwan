/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../context/AppContext.tsx';
import { formatKWD } from '../utils/format.ts';
import { ShoppingBag, Shield, Phone, Sparkles, Monitor, Download } from 'lucide-react';
import { KITCHEN_PHONE } from '../utils/whatsapp.ts';
import { usePWAInstall } from '../hooks/usePWAInstall.ts';

export const Header: React.FC = () => {
  const { 
    cart, 
    setIsCartOpen, 
    setIsAdminOpen, 
    activeCategoryId, 
    setActiveCategoryId,
    setIsInstallModalOpen
  } = useApp();
  const { isInstallable, isInstalled, install } = usePWAInstall();

  const handleInstallClick = async () => {
    if (isInstallable) {
      const success = await install();
      if (!success) {
        setIsInstallModalOpen(true);
      }
    } else {
      setIsInstallModalOpen(true);
    }
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartValue = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      {/* Top Banner: Direct kitchen phone & Free Delivery */}
      <div className="bg-[#123c32] text-stone-100 text-xs py-1.5 px-4 font-medium">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[#d7a94b] font-semibold">KNPC Center Kitchen (MAB)</span>
            <span className="text-stone-400">·</span>
            <span>Mina Abdulla Refinery, Kuwait</span>
            <span className="text-stone-400">·</span>
            <span className="text-emerald-300 font-medium">Always-Free Delivery to All KNPC Facilities</span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            {/* Install Desktop App trigger in top banner */}
            {!isInstalled && (
              <button
                onClick={handleInstallClick}
                className="flex items-center gap-1.5 text-stone-200 hover:text-[#d7a94b] bg-white/10 hover:bg-white/15 px-2.5 py-0.5 rounded text-[11px] font-semibold border border-white/20 transition-all cursor-pointer"
                title="Install app on your desktop computer"
              >
                <Monitor className="w-3 h-3 text-[#d7a94b]" />
                <span>Install Desktop App</span>
              </button>
            )}

            <a 
              href="tel:+96523884237" 
              className="flex items-center gap-1.5 text-stone-200 hover:text-[#d7a94b] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#d7a94b]" />
              <span>Kitchen Direct: <strong className="font-semibold text-white">{KITCHEN_PHONE}</strong></span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar - Following Top Bar Contract: 3 zones separated by gap-8 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={() => setActiveCategoryId('all')}
            className="flex items-center gap-3 text-left cursor-pointer group"
          >
            <img
              src="/src/assets/images/KNPC.png"
              alt="KNPC Logo"
              className="h-10 sm:h-11 w-auto object-contain shrink-0 transition-transform group-hover:scale-105"
            />
            <div>
              <div className="text-lg font-bold tracking-tight text-[#123c32] whitespace-nowrap leading-none group-hover:text-emerald-800 transition-colors">
                KNPC Center Kitchen
              </div>
              <div className="text-[11px] font-medium text-stone-500 whitespace-nowrap mt-0.5">
                Mina Abdulla (MAB) · Kuwait
              </div>
            </div>
          </button>
        </div>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-600">
          <button
            onClick={() => setActiveCategoryId('sandwiches')}
            className={`whitespace-nowrap shrink-0 hover:text-[#123c32] transition-colors ${
              activeCategoryId === 'sandwiches' ? 'text-[#123c32] font-semibold underline decoration-[#d7a94b] decoration-2 underline-offset-8' : ''
            }`}
          >
            Sandwiches
          </button>
          <button
            onClick={() => setActiveCategoryId('club_sandwiches')}
            className={`whitespace-nowrap shrink-0 hover:text-[#123c32] transition-colors ${
              activeCategoryId === 'club_sandwiches' ? 'text-[#123c32] font-semibold underline decoration-[#d7a94b] decoration-2 underline-offset-8' : ''
            }`}
          >
            Club Sandwiches
          </button>
          <button
            onClick={() => setActiveCategoryId('arabic_breakfast_select')}
            className={`whitespace-nowrap shrink-0 hover:text-[#123c32] transition-colors ${
              activeCategoryId === 'arabic_breakfast_select' ? 'text-[#123c32] font-semibold underline decoration-[#d7a94b] decoration-2 underline-offset-8' : ''
            }`}
          >
            Arabic Breakfast Select
          </button>
          <button
            onClick={() => setActiveCategoryId('arabic_breakfast_packages')}
            className={`whitespace-nowrap shrink-0 hover:text-[#123c32] transition-colors ${
              activeCategoryId === 'arabic_breakfast_packages' ? 'text-[#123c32] font-semibold underline decoration-[#d7a94b] decoration-2 underline-offset-8' : ''
            }`}
          >
            Packages (Feast)
          </button>
        </nav>

        {/* Zone 3: Primary Action & Admin trigger */}
        <div className="flex items-center gap-2.5 shrink-0">
          {!isInstalled && (
            <button
              onClick={handleInstallClick}
              title="Install KNPC Center Kitchen as Desktop App"
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#123c32] bg-[#f7f5ef] hover:bg-[#eae6db] border border-[#d7a94b]/70 rounded-lg transition-all shadow-xs active:scale-95 whitespace-nowrap cursor-pointer"
            >
              <Monitor className="w-3.5 h-3.5 text-[#d7a94b]" />
              <span className="hidden sm:inline">Install Desktop App</span>
              <span className="sm:hidden">Install</span>
            </button>
          )}

          <button
            onClick={() => setIsAdminOpen(true)}
            title="Kitchen Operations & Admin Portal (PIN: 1631)"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
          >
            <Shield className="w-3.5 h-3.5 text-[#123c32]" />
            <span className="hidden sm:inline">Kitchen Admin</span>
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2.5 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#123c32] hover:bg-[#1a4f42] rounded-lg transition-all shadow-sm active:scale-95 whitespace-nowrap cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-[#d7a94b]" />
            <span>Order</span>
            {totalCartCount > 0 ? (
              <span className="bg-[#d7a94b] text-[#123c32] text-xs font-bold px-2 py-0.5 rounded-full ml-0.5">
                {totalCartCount} · {formatKWD(totalCartValue)}
              </span>
            ) : (
              <span className="text-stone-300 text-xs hidden sm:inline">(0.000 KWD)</span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
