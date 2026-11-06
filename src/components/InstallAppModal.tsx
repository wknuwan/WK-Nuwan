/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  X, 
  Monitor, 
  Download, 
  CheckCircle2, 
  Laptop, 
  Smartphone, 
  HelpCircle, 
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall.ts';

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isDesktop, install } = usePWAInstall();
  const [activeTab, setActiveTab] = useState<'desktop' | 'mobile'>('desktop');
  const [isInstalling, setIsInstalling] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDirectInstall = async () => {
    setIsInstalling(true);
    try {
      const success = await install();
      if (success) {
        setInstallSuccess(true);
      }
    } catch {
      // User dismissed or error
    } finally {
      setIsInstalling(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-[#123c32] text-white p-5 px-6 flex items-center justify-between border-b border-[#1b5245]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-[#d7a94b]/30 flex items-center justify-center p-1 shrink-0">
              <img src="/src/assets/images/KNPC.png" alt="KNPC Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                Install KNPC Kitchen App
                <span className="text-[10px] font-semibold bg-[#d7a94b] text-[#123c32] px-2 py-0.5 rounded-full uppercase">
                  Desktop & Mobile
                </span>
              </h3>
              <p className="text-xs text-stone-300">
                Run natively from your Desktop, Taskbar, or Home Screen
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-200 bg-stone-50 px-6 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('desktop')}
            className={`flex items-center gap-2 pb-3 px-3 text-sm font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'desktop'
                ? 'border-[#123c32] text-[#123c32]'
                : 'border-transparent text-stone-500 hover:text-stone-700'
            }`}
          >
            <Laptop className="w-4 h-4 text-[#d7a94b]" />
            <span>Desktop (Windows / Mac / PC)</span>
          </button>
          <button
            onClick={() => setActiveTab('mobile')}
            className={`flex items-center gap-2 pb-3 px-3 text-sm font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'mobile'
                ? 'border-[#123c32] text-[#123c32]'
                : 'border-transparent text-stone-500 hover:text-stone-700'
            }`}
          >
            <Smartphone className="w-4 h-4 text-[#d7a94b]" />
            <span>Mobile (Phone / Tablet)</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Status Message if already installed */}
          {isInstalled && (
            <div className="flex items-start gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">App Already Installed!</strong>
                <p className="text-xs text-emerald-700 mt-0.5">
                  KNPC Center Kitchen is installed on this device. You can launch it directly from your Desktop shortcut, Start Menu, or Applications folder.
                </p>
              </div>
            </div>
          )}

          {/* 1-Click Install Button when browser supports direct prompt */}
          {isInstallable && !isInstalled && (
            <div className="p-5 bg-[#f7f5ef] rounded-xl border border-[#d7a94b]/40 shadow-sm text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#123c32] text-[#d7a94b] shadow-md">
                <Download className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#123c32]">Instant 1-Click Desktop Install</h4>
                <p className="text-xs text-stone-600 max-w-sm mx-auto mt-1">
                  Click the button below to add KNPC Center Kitchen directly to your computer’s Desktop & Taskbar.
                </p>
              </div>
              <button
                onClick={handleDirectInstall}
                disabled={isInstalling}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 bg-[#123c32] hover:bg-[#1a4f42] text-white font-bold text-sm rounded-xl transition-all shadow-md active:scale-95 cursor-pointer disabled:opacity-50"
              >
                <Download className="w-4 h-4 text-[#d7a94b]" />
                <span>{isInstalling ? 'Opening Installer...' : 'Install Desktop App Now'}</span>
              </button>
            </div>
          )}

          {installSuccess && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Installation successful! Look for the app on your Desktop or taskbar.</span>
            </div>
          )}

          {activeTab === 'desktop' ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider text-xs">
                  How to install on Windows PC / Chrome / Edge:
                </h4>
                <span className="text-xs text-stone-500 font-mono">Refinery Workstations</span>
              </div>

              {/* Step 1: Address bar button */}
              <div className="flex items-start gap-3.5 p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div className="w-7 h-7 rounded-lg bg-[#123c32] text-[#d7a94b] font-bold text-xs flex items-center justify-center shrink-0">
                  1
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-bold text-stone-800 flex items-center gap-2">
                    <span>Look in your browser's address bar</span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    In <strong>Google Chrome</strong> or <strong>Microsoft Edge</strong> on Windows/Mac, look at the right end of the URL address bar at the top of your screen. Look for the <strong>Install App</strong> icon (an icon with a computer screen or a down arrow / ⊕ plus sign).
                  </p>
                  <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-stone-300 rounded text-[11px] text-stone-700 font-medium">
                    <Monitor className="w-3.5 h-3.5 text-[#123c32]" />
                    <span>Click "Install KNPC Center Kitchen"</span>
                  </div>
                </div>
              </div>

              {/* Step 2: Browser 3-dots Menu */}
              <div className="flex items-start gap-3.5 p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div className="w-7 h-7 rounded-lg bg-[#123c32] text-[#d7a94b] font-bold text-xs flex items-center justify-center shrink-0">
                  2
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-bold text-stone-800">
                    Via Browser Menu (Chrome / Edge)
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Click the <strong>three dots menu (⋮ or …)</strong> in the top-right corner of Chrome or Edge:
                  </p>
                  <ul className="text-xs text-stone-600 list-disc pl-4 space-y-1 mt-1">
                    <li><strong>In Chrome:</strong> Select <em>"Save and share"</em> or <em>"Cast, save, and share"</em> → click <strong>"Install page as app..."</strong> or <strong>"Install KNPC Center Kitchen"</strong>.</li>
                    <li><strong>In Edge:</strong> Select <em>"Apps"</em> → click <strong>"Install this site as an app"</strong>.</li>
                  </ul>
                </div>
              </div>

              {/* Step 3: Desktop Benefits */}
              <div className="p-3.5 bg-[#f7f5ef] border border-[#d7a94b]/30 rounded-xl text-xs space-y-2">
                <div className="font-bold text-[#123c32] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#d7a94b]" />
                  <span>Desktop App Features</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-stone-700">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Launches in clean window without browser tabs</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Instant access from Windows Taskbar</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Works fast with offline asset caching</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Direct Kitchen Hotline & WhatsApp</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider text-xs">
                Mobile & Tablet Installation:
              </h4>

              <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-2">
                <div className="font-bold text-stone-800 text-sm flex items-center gap-2">
                  <span>Apple iPhone / iPad (Safari)</span>
                </div>
                <ol className="text-xs text-stone-600 list-decimal pl-4 space-y-1.5">
                  <li>Open this website in <strong>Safari</strong> on your iPhone or iPad.</li>
                  <li>Tap the <strong>Share</strong> button (box with an arrow pointing up at the bottom).</li>
                  <li>Scroll down and tap <strong>Add to Home Screen</strong>.</li>
                  <li>Tap <strong>Add</strong> in the top right.</li>
                </ol>
              </div>

              <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-2">
                <div className="font-bold text-stone-800 text-sm flex items-center gap-2">
                  <span>Android (Chrome)</span>
                </div>
                <ol className="text-xs text-stone-600 list-decimal pl-4 space-y-1.5">
                  <li>Tap the <strong>three dots (⋮)</strong> in Chrome.</li>
                  <li>Tap <strong>Add to Home screen</strong> or <strong>Install app</strong>.</li>
                  <li>Follow the on-screen prompt to confirm installation.</li>
                </ol>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-stone-50 px-6 py-4 border-t border-stone-200 flex items-center justify-between">
          <span className="text-xs text-stone-500">
            KNPC Center Kitchen (MAB) · Mina Abdulla Refinery
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
