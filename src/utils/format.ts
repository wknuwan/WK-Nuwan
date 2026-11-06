/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export function formatKWD(amount: number): string {
  if (isNaN(amount)) return '0.000 KWD';
  return `${amount.toFixed(3)} KWD`;
}

export function formatDateTime(isoString: string): string {
  try {
    const d = new Date(isoString);
    return d.toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  } catch {
    return isoString;
  }
}

export function validateKuwaitPhone(phone: string): { isValid: boolean; message?: string } {
  const clean = phone.replace(/\D/g, '');
  // Kuwait mobile numbers are 8 digits, and internal refinery extensions are 5 digits, starting with 9, 8, 7, 6, 5, or 4
  if (clean.length !== 8 && clean.length !== 5) {
    return { isValid: false, message: 'Phone number must be 8 or 5 digits (e.g. 99881234 or 83278)' };
  }
  const firstDigit = clean.charAt(0);
  if (!['9', '8', '7', '6', '5', '4'].includes(firstDigit)) {
    return { isValid: false, message: 'Phone number must start with 9, 8, 7, 6, 5, or 4' };
  }
  return { isValid: true };
}
