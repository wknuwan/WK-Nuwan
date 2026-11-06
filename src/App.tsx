/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext.tsx';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { MenuSection } from './components/MenuSection.tsx';
import { CustomizationModal } from './components/CustomizationModal.tsx';
import { CartDrawer } from './components/CartDrawer.tsx';
import { OrderConfirmationModal } from './components/OrderConfirmationModal.tsx';
import { AdminPortal } from './components/AdminPortal.tsx';
import { PrintSlipModal } from './components/PrintSlipModal.tsx';
import { InstallAppModal } from './components/InstallAppModal.tsx';
import { OfflineIndicator } from './components/OfflineIndicator.tsx';
import { Footer } from './components/Footer.tsx';
import { Order } from './types.ts';

const MainAppContent: React.FC = () => {
  const { 
    customizingItem, 
    setCustomizingItem, 
    printSlipOrder, 
    setPrintSlipOrder,
    isInstallModalOpen,
    setIsInstallModalOpen
  } = useApp();
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f5ef] text-stone-900 selection:bg-[#d7a94b] selection:text-[#123c32]">
      {/* Navigation Top Bar */}
      <Header />

      {/* Hero Section */}
      <main className="flex-1">
        <Hero />
        <MenuSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Customization Modal */}
      {customizingItem && (
        <CustomizationModal
          item={customizingItem}
          onClose={() => setCustomizingItem(null)}
        />
      )}

      {/* Cart & Checkout Drawer */}
      <CartDrawer
        onOrderPlaced={(newOrder) => setConfirmedOrder(newOrder)}
      />

      {/* Order Confirmation Screen */}
      {confirmedOrder && (
        <OrderConfirmationModal
          order={confirmedOrder}
          onClose={() => setConfirmedOrder(null)}
        />
      )}

      {/* Kitchen Operations & Admin Portal (PIN: 1631) */}
      <AdminPortal />

      {/* 1-Click Print Kitchen Slip (A4 Single-Page) */}
      {printSlipOrder && (
        <PrintSlipModal
          order={printSlipOrder}
          onClose={() => setPrintSlipOrder(null)}
        />
      )}

      {/* Desktop & Mobile App Install Modal */}
      <InstallAppModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
      />

      {/* Offline Status Badge */}
      <OfflineIndicator />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
