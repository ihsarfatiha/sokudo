import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatCurrencyIDR,
  parseCurrencyIDR,
  formatCompactIDR,
  formatDateIndonesian,
  formatRelativeTimeID,
  isDateExpired,
  addDays,
  isValidEmail,
  isValidIndonesianPhone,
  normalizeIndonesianPhone,
  isValidPostalCode,
  isValidNIK,
  slugify,
  isValidSlug,
  validateRegisterInput,
  validateAddressInput,
  formatWeight,
  calculateDiscountPercentage,
  calculateDiscountAmount,
  generateOrderNumber,
  calculateOrderTotals,
  canTransitionOrderStatus,
  createApiResponse,
  createErrorResponse,
  createPaginatedResponse,
} from '../dist/index.js';
import { OrderStatus } from '@marketplace/types';

test('Currency Helpers', async (t) => {
  await t.test('formatCurrencyIDR formats correctly', () => {
    assert.equal(formatCurrencyIDR(150000), 'Rp 150.000');
    assert.equal(formatCurrencyIDR(0), 'Rp 0');
    assert.equal(formatCurrencyIDR(-50000), '-Rp 50.000');
    assert.equal(
      formatCurrencyIDR(125000.5, { showCents: true }),
      'Rp 125.000,50'
    );
    assert.equal(
      formatCurrencyIDR(150000, { space: false }),
      'Rp150.000'
    );
  });

  await t.test('parseCurrencyIDR parses correctly', () => {
    assert.equal(parseCurrencyIDR('Rp 150.000'), 150000);
    assert.equal(parseCurrencyIDR('150.000'), 150000);
    assert.equal(parseCurrencyIDR('-Rp 50.000,50'), -50000.5);
    assert.equal(parseCurrencyIDR('invalid'), 0);
  });

  await t.test('formatCompactIDR formats large figures', () => {
    assert.equal(formatCompactIDR(1500), 'Rp 1,5 Rb');
    assert.equal(formatCompactIDR(2500000), 'Rp 2,5 Jt');
    assert.equal(formatCompactIDR(1200000000), 'Rp 1,2 M');
    assert.equal(formatCompactIDR(1000000000000), 'Rp 1 T');
  });
});

test('Date Helpers', async (t) => {
  const fixedDate = new Date('2026-10-08T10:30:00Z');

  await t.test('formatDateIndonesian formats date strings', () => {
    const formatted = formatDateIndonesian(fixedDate);
    assert.match(formatted, /Oktober 2026/);
    
    const full = formatDateIndonesian(fixedDate, { format: 'full' });
    assert.match(full, /Kamis/);
  });

  await t.test('formatRelativeTimeID handles relative differences', () => {
    const now = new Date('2026-10-08T12:00:00Z');
    const fiveMinAgo = new Date('2026-10-08T11:55:00Z');
    const yesterday = new Date('2026-10-07T12:00:00Z');

    assert.equal(formatRelativeTimeID(fiveMinAgo, now), '5 menit yang lalu');
    assert.equal(formatRelativeTimeID(yesterday, now), 'kemarin');
  });

  await t.test('isDateExpired and addDays work correctly', () => {
    const now = new Date('2026-10-08T12:00:00Z');
    const past = new Date('2026-10-08T11:00:00Z');
    const future = addDays(now, 2);

    assert.equal(isDateExpired(past, now), true);
    assert.equal(isDateExpired(future, now), false);
  });
});

test('Validation Helpers', async (t) => {
  await t.test('email validation', () => {
    assert.equal(isValidEmail('buyer@tokokita.id'), true);
    assert.equal(isValidEmail('invalid-email'), false);
    assert.equal(isValidEmail(''), false);
  });

  await t.test('Indonesian phone validation & normalization', () => {
    assert.equal(isValidIndonesianPhone('081234567890'), true);
    assert.equal(isValidIndonesianPhone('+6281234567890'), true);
    assert.equal(isValidIndonesianPhone('6281234567890'), true);
    assert.equal(isValidIndonesianPhone('021123456'), false);

    assert.equal(normalizeIndonesianPhone('081234567890'), '+6281234567890');
    assert.equal(normalizeIndonesianPhone('6281234567890'), '+6281234567890');
    assert.equal(normalizeIndonesianPhone('+6281234567890'), '+6281234567890');
  });

  await t.test('postal code and NIK validation', () => {
    assert.equal(isValidPostalCode('12345'), true);
    assert.equal(isValidPostalCode('123'), false);
    assert.equal(isValidPostalCode('01234'), false);

    assert.equal(isValidNIK('3171012345678901'), true);
    assert.equal(isValidNIK('12345'), false);
  });

  await t.test('slugify and isValidSlug', () => {
    assert.equal(
      slugify('Kemeja Batik Pria Motif Megamendung 2026!'),
      'kemeja-batik-pria-motif-megamendung-2026'
    );
    assert.equal(isValidSlug('kemeja-batik-pria'), true);
    assert.equal(isValidSlug('Kemeja Batik'), false);
  });

  await t.test('schema validation for register and address', () => {
    const validRegister = validateRegisterInput({
      name: 'Budi Santoso',
      email: 'budi@example.com',
      password: 'password123',
      phone: '081234567890',
    });
    assert.equal(validRegister.isValid, true);

    const invalidRegister = validateRegisterInput({
      name: '',
      email: 'not-an-email',
      password: '123',
    });
    assert.equal(invalidRegister.isValid, false);
    assert.ok(invalidRegister.errors.name);
    assert.ok(invalidRegister.errors.email);
    assert.ok(invalidRegister.errors.password);

    const validAddress = validateAddressInput({
      recipientName: 'Siti Rahma',
      phone: '081398765432',
      street: 'Jl. Sudirman No. 45',
      city: 'Jakarta Selatan',
      province: 'DKI Jakarta',
      postalCode: '12190',
    });
    assert.equal(validAddress.isValid, true);
  });
});

test('Number and Weight Helpers', async (t) => {
  await t.test('formatWeight', () => {
    assert.equal(formatWeight(500), '500 g');
    assert.equal(formatWeight(1500), '1,5 kg');
    assert.equal(formatWeight(2000), '2 kg');
    assert.equal(formatWeight(0), '0 g');
  });

  await t.test('discount calculation', () => {
    assert.equal(calculateDiscountPercentage(100000, 80000), 20);
    assert.equal(calculateDiscountAmount(100000, 20), 20000);
  });
});

test('Order and State Machine Helpers', async (t) => {
  await t.test('generateOrderNumber', () => {
    const orderNo = generateOrderNumber();
    assert.match(orderNo, /^ORD-\d{8}-[A-Z0-9]{6}$/);
  });

  await t.test('calculateOrderTotals', () => {
    const items = [
      { price: 50000, quantity: 2 },
      { price: 25000, quantity: 1 },
    ];
    const totals = calculateOrderTotals(items, 15000, 1000, 10000);
    assert.equal(totals.subtotal, 125000);
    assert.equal(totals.shippingCost, 15000);
    assert.equal(totals.serviceFee, 1000);
    assert.equal(totals.discountAmount, 10000);
    assert.equal(totals.grandTotal, 131000);
  });

  await t.test('canTransitionOrderStatus state machine rules', () => {
    assert.equal(
      canTransitionOrderStatus(OrderStatus.PENDING_PAYMENT, OrderStatus.PAID),
      true
    );
    assert.equal(
      canTransitionOrderStatus(OrderStatus.PAID, OrderStatus.PROCESSING),
      true
    );
    assert.equal(
      canTransitionOrderStatus(OrderStatus.PROCESSING, OrderStatus.SHIPPED),
      true
    );
    assert.equal(
      canTransitionOrderStatus(OrderStatus.SHIPPED, OrderStatus.DELIVERED),
      true
    );
    assert.equal(
      canTransitionOrderStatus(OrderStatus.DELIVERED, OrderStatus.COMPLETED),
      true
    );
    // Invalid backward transitions
    assert.equal(
      canTransitionOrderStatus(OrderStatus.COMPLETED, OrderStatus.PENDING_PAYMENT),
      false
    );
    assert.equal(
      canTransitionOrderStatus(OrderStatus.CANCELLED, OrderStatus.PAID),
      false
    );
  });
});

test('API Response Helpers', async (t) => {
  await t.test('createApiResponse', () => {
    const res = createApiResponse({ id: 'user-1' }, 'User found');
    assert.equal(res.success, true);
    assert.equal(res.data.id, 'user-1');
    assert.equal(res.message, 'User found');
    assert.equal(res.statusCode, 200);
    assert.ok(res.timestamp);
  });

  await t.test('createErrorResponse', () => {
    const res = createErrorResponse('User not found', 404);
    assert.equal(res.success, false);
    assert.equal(res.error, 'User not found');
    assert.equal(res.statusCode, 404);
    assert.equal(res.data, null);
  });

  await t.test('createPaginatedResponse', () => {
    const items = ['a', 'b', 'c'];
    const res = createPaginatedResponse(items, 50, 2, 10);
    assert.equal(res.data.length, 3);
    assert.equal(res.meta.page, 2);
    assert.equal(res.meta.limit, 10);
    assert.equal(res.meta.total, 50);
    assert.equal(res.meta.totalPages, 5);
    assert.equal(res.meta.hasNextPage, true);
    assert.equal(res.meta.hasPrevPage, true);
  });
});
