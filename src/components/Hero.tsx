/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone, Monitor } from 'lucide-react';
import { KITCHEN_PHONE } from '../utils/whatsapp.ts';
import { useApp } from '../context/AppContext.tsx';
import { usePWAInstall } from '../hooks/usePWAInstall.ts';

export const Hero: React.FC = () => {
  const { setIsInstallModalOpen } = useApp();
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
  return (
    <section className="relative bg-[#123c32] text-white overflow-hidden border-b border-[#1b5245]">
      {/* Background ambient pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d7a94b_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Brand & Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#d7a94b]">
              <span>Kuwait National Petroleum Company</span>
              <span className="text-stone-400">·</span>
              <span>Mina Abdulla Refinery</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Center Kitchen <span className="text-[#d7a94b]">MAB</span>
            </h1>

            <p className="text-base sm:text-lg text-stone-200 leading-relaxed max-w-2xl">
              Freshly prepared authentic Kuwaiti breakfast sandwiches, multi-layer toasted club sandwiches, and hearty Arabic feast packages crafted daily for KNPC refinery shifts and office departments.
            </p>

            {/* Direct hotline CTA row */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href="#menu-section"
                className="px-6 py-3 bg-[#d7a94b] hover:bg-[#c9993c] text-[#123c32] font-bold text-sm rounded-lg transition-all shadow-md active:scale-95"
              >
                Browse Daily Menu
              </a>

              {!isInstalled && (
                <button
                  onClick={handleInstallClick}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-white/15 hover:bg-white/20 text-white font-semibold text-sm rounded-lg border border-[#d7a94b]/60 transition-all shadow-sm active:scale-95 cursor-pointer"
                >
                  <Monitor className="w-4 h-4 text-[#d7a94b]" />
                  <span>Install Desktop App</span>
                </button>
              )}

              <a
                href="tel:+96523884237"
                className="inline-flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/15 text-white font-medium text-sm rounded-lg border border-white/20 transition-all"
              >
                <Phone className="w-4 h-4 text-[#d7a94b]" />
                <span>Kitchen Call: {KITCHEN_PHONE}</span>
              </a>
            </div>

          </div>

          {/* Right Column: Hero Visual Photo */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-[#225e50] aspect-[16/10] bg-[#1a4f42]">
              <img
                src="/src/assets/images/Maoun.jpg"
                alt="KNPC Center Kitchen authentic Kuwaiti breakfast spread"
                className="w-full h-full object-cover"
                loading="eager"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                <div className="text-xs text-stone-200">
                  <div className="font-semibold text-white">Center Kitchen (MAB) Daily Spread</div>
                  <div>Falafel, Shakshuka, Fresh Samoon, Halloumi & Arabic Mezze</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
