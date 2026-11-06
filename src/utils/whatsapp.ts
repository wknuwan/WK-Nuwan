/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Order } from '../types.ts';
import { formatKWD } from './format.ts';

export const KITCHEN_PHONE = '+965 23884237';
export const KITCHEN_WA_NUMBER = '96598951187';

export function generateKitchenOrderWhatsAppLink(order: Order): string {
  const lines: string[] = [];
  lines.push(`*KNPC CENTER KITCHEN (MAB) - ORDER #${order.orderNumber}*`);
  lines.push(`Mina Abdulla Refinery - Kuwait`);
  lines.push(`----------------------------------------`);
  lines.push(`*Customer:* ${order.customerName}`);
  if (order.employeeNumber) {
    lines.push(`*Employee ID:* ${order.employeeNumber}`);
  }
  lines.push(`*Location:* ${order.deliveryLocation}`);
  lines.push(`*Mobile:* +965 ${order.mobileNumber}`);
  lines.push(`*Time:* ${new Date(order.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`);
  lines.push(`----------------------------------------`);
  lines.push(`*ITEMS ORDERED:*`);

  order.items.forEach((item, idx) => {
    lines.push(`\n${idx + 1}. *${item.quantity}x ${item.menuItem.name}* (${formatKWD(item.totalPrice)})`);
    if (item.selectedBread) {
      lines.push(`   - Bread: ${item.selectedBread.name}${item.selectedBread.priceDelta > 0 ? ` (+${formatKWD(item.selectedBread.priceDelta)})` : ''}`);
    }
    if (item.selectedExtras.length > 0) {
      lines.push(`   - Extras: ${item.selectedExtras.map(e => `${e.name}${e.price > 0 ? ` (+${formatKWD(e.price)})` : ''}`).join(', ')}`);
    }
    if (item.selectedRemovals.length > 0) {
      lines.push(`   - Removals: ${item.selectedRemovals.map(r => `${r.name}${r.discount > 0 ? ` (-${formatKWD(r.discount)})` : ''}`).join(', ')}`);
    }
    if (item.notes) {
      lines.push(`   - Note: ${item.notes}`);
    }
  });

  lines.push(`\n----------------------------------------`);
  lines.push(`*TOTAL AMOUNT:* ${formatKWD(order.totalAmount)}`);
  lines.push(`*DELIVERY:* FREE to KNPC MAB Buildings`);
  lines.push(`*PAYMENT:* Cash / KNET on Handover`);
  if (order.notes) {
    lines.push(`*Special Instructions:* ${order.notes}`);
  }
  lines.push(`----------------------------------------`);
  lines.push(`Thank you for ordering with KNPC Center Kitchen!`);

  const encoded = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${KITCHEN_WA_NUMBER}?text=${encoded}`;
}

export function generateEmployeeStatusWhatsAppLink(order: Order, newStatus: string): string {
  const cleanMobile = order.mobileNumber.replace(/\D/g, '');
  const lines: string[] = [];

  let statusText = 'being prepared in the kitchen';
  if (newStatus === 'in_kitchen') {
    statusText = 'is currently being prepared by our chefs 🍳';
  } else if (newStatus === 'ready') {
    statusText = 'is READY and dispatched with delivery team 🛵';
  } else if (newStatus === 'delivered') {
    statusText = 'has been successfully delivered. Sahtain / Enjoy your meal! ✨';
  }

  lines.push(`*KNPC Center Kitchen (MAB) Order Update*`);
  lines.push(`Dear ${order.customerName},`);
  lines.push(`Your order *#${order.orderNumber}* for *${order.deliveryLocation}* ${statusText}.`);
  lines.push(`Total Amount: *${formatKWD(order.totalAmount)}*`);
  lines.push(`Direct Kitchen: ${KITCHEN_PHONE}`);

  const encoded = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/965${cleanMobile}?text=${encoded}`;
}
