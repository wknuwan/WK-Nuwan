/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Order } from '../types.ts';
import { formatDateTime } from './format.ts';

export function exportOrdersToExcelCSV(orders: Order[]): void {
  // Column Headers
  const headers = [
    'Order Number',
    'Date & Time',
    'Customer Name',
    'Employee ID',
    'Location (KNPC MAB)',
    'Mobile (+965)',
    'Status',
    'Total Amount (KWD)',
    'Item Count',
    'Items Summary',
    'Special Instructions'
  ];

  const escapeCSV = (val: string | number | undefined) => {
    if (val === undefined || val === null) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = orders.map(ord => {
    const itemsSummary = ord.items.map(i => {
      const parts = [`${i.quantity}x ${i.menuItem.name}`];
      if (i.selectedBread) parts.push(`Bread: ${i.selectedBread.name}`);
      if (i.selectedExtras.length > 0) parts.push(`Extras: [${i.selectedExtras.map(e => e.name).join(', ')}]`);
      if (i.selectedRemovals.length > 0) parts.push(`Removals: [${i.selectedRemovals.map(r => r.name).join(', ')}]`);
      return parts.join(' | ');
    }).join(' ;; ');

    const totalItemQty = ord.items.reduce((sum, item) => sum + item.quantity, 0);

    return [
      escapeCSV(ord.orderNumber),
      escapeCSV(formatDateTime(ord.createdAt)),
      escapeCSV(ord.customerName),
      escapeCSV(ord.employeeNumber || 'N/A'),
      escapeCSV(ord.deliveryLocation),
      escapeCSV(ord.mobileNumber),
      escapeCSV(ord.status.toUpperCase()),
      escapeCSV(ord.totalAmount.toFixed(3)),
      escapeCSV(totalItemQty),
      escapeCSV(itemsSummary),
      escapeCSV(ord.notes || '')
    ].join(',');
  });

  const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  link.setAttribute('href', url);
  link.setAttribute('download', `KNPC_MAB_Kitchen_Orders_Backup_${timestamp}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
