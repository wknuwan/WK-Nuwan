/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export interface PWAInstallState {
  isInstallable: boolean;
  isInstalled: boolean;
  isDesktop: boolean;
  isIOS: boolean;
  isChromeOrEdge: boolean;
  install: () => Promise<boolean>;
}

export function usePWAInstall(): PWAInstallState {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(true);
  const [isIOS, setIsIOS] = useState<boolean>(false);
  const [isChromeOrEdge, setIsChromeOrEdge] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Detect if running in standalone mode (already installed on Desktop / Mobile)
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true ||
      document.referrer.includes('android-app://');
    setIsInstalled(isStandalone);

    // Detect User Agent / OS
    const ua = window.navigator.userAgent.toLowerCase();
    const isMobileDevice = /android|iphone|ipad|ipod|mobile|phone|blackberry|iemobile|opera mini/i.test(ua);
    setIsDesktop(!isMobileDevice);
    setIsIOS(/iphone|ipad|ipod/.test(ua));
    setIsChromeOrEdge(/chrome|edg|chromium|brave/i.test(ua) && !/firefox|safari/i.test(ua));

    // Listen for beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const install = async (): Promise<boolean> => {
    if (!deferredPrompt) {
      return false;
    }

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
        setDeferredPrompt(null);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error during PWA installation:', err);
      return false;
    }
  };

  return {
    isInstallable: !!deferredPrompt,
    isInstalled,
    isDesktop,
    isIOS,
    isChromeOrEdge,
    install,
  };
}
