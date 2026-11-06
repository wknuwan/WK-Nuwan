/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone, MapPin, Clock, ShieldCheck, Mail, Monitor } from 'lucide-react';
import { KITCHEN_PHONE } from '../utils/whatsapp.ts';
import { useApp } from '../context/AppContext.tsx';

export const Footer: React.FC = () => {
  const { setIsInstallModalOpen } = useApp();
  return (
    <footer className="bg-[#123c32] text-stone-300 border-t border-[#1b5245] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-white/10 p-1 flex items-center justify-center border border-white/20 shrink-0">
                <img
                  src="/src/assets/images/KNPC.png"
                  alt="KNPC Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-extrabold text-white text-base tracking-tight">
                KNPC Center Kitchen
              </span>
            </div>
            <p className="text-stone-300 text-xs leading-relaxed">
              Official corporate and shift catering facility servicing Kuwait National Petroleum Company at Mina Abdulla Refinery.
            </p>
          </div>

          {/* Service Hours & Locations */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider text-[#d7a94b]">
              Refinery Logistics
            </h4>
            <ul className="space-y-1.5 text-xs text-stone-300">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#d7a94b] shrink-0 mt-0.5" />
                <span>KNPC MAB Refinery, Mina Abdulla, Kuwait</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-[#d7a94b] shrink-0 mt-0.5" />
                <span>Continuous Operations: Morning & Evening Shift Prep</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#d7a94b] shrink-0 mt-0.5" />
                <span>HSE Certified Food Safety Standards</span>
              </li>
            </ul>
          </div>

          {/* Quick Contact */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider text-[#d7a94b]">
              Direct Kitchen Line
            </h4>
            <div className="space-y-1 text-xs">
              <p className="text-stone-300">Call for immediate shift orders or inquiries:</p>
              <a
                href="tel:+96523884237"
                className="text-base font-extrabold text-white hover:text-[#d7a94b] transition-colors flex items-center gap-2 font-mono-num"
              >
                <Phone className="w-4 h-4 text-[#d7a94b]" />
                <span>{KITCHEN_PHONE}</span>
              </a>
              <p className="text-[11px] text-stone-400 mt-1">
                WhatsApp automated notification supported.
              </p>
            </div>
          </div>

          {/* Delivery Note & Desktop Install */}
          <div className="space-y-3 bg-[#1a4f42]/70 p-4 rounded-xl border border-[#236353]">
            <div>
              <h4 className="font-bold text-white text-xs">Always-Free Delivery</h4>
              <p className="text-stone-300 text-xs leading-relaxed mt-0.5">
                Dispatched continuously to Maintenance Workshops, Fire Stations, and all Security Gates at Mina Abdulla.
              </p>
            </div>
            
            <button
              onClick={() => setIsInstallModalOpen(true)}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-[#d7a94b] hover:bg-[#c9993c] text-[#123c32] font-bold text-xs rounded-lg transition-colors cursor-pointer shadow-sm"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Install Desktop App</span>
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#1b5245] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-400">
          <div>
            © {new Date().getFullYear()} Kuwait National Petroleum Company  · Center Kitchen MAB. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Mina Abdulla Refinery</span>
            <span>·</span>
            <span>State of Kuwait</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
