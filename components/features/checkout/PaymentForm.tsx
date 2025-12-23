'use client';

import { useState } from 'react';
import { PaymentInfo } from '@/types/order';

interface PaymentFormProps {
  paymentInfo: PaymentInfo;
  onChange: (info: PaymentInfo) => void;
}

export default function PaymentForm({ paymentInfo, onChange }: PaymentFormProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentInfo['paymentMethod']>(
    paymentInfo.paymentMethod || 'card'
  );

  const handleChange = (field: keyof PaymentInfo, value: string) => {
    onChange({ ...paymentInfo, [field]: value });
  };

  const handleMethodChange = (method: PaymentInfo['paymentMethod']) => {
    setSelectedMethod(method);
    onChange({ ...paymentInfo, paymentMethod: method });
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  return (
    <div className='space-y-6'>
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-4'>Payment Method</label>
        <div className='grid grid-cols-3 gap-4'>
          <button
            type='button'
            onClick={() => handleMethodChange('card')}
            className={`p-4 border-2 rounded-lg transition-colors ${
              selectedMethod === 'card'
                ? 'border-beige-600 bg-beige-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div className='text-center'>
              <div className='text-2xl mb-2'>💳</div>
              <div className='text-sm font-medium'>Card</div>
            </div>
          </button>
          <button
            type='button'
            onClick={() => handleMethodChange('paypal')}
            className={`p-4 border-2 rounded-lg transition-colors ${
              selectedMethod === 'paypal'
                ? 'border-beige-600 bg-beige-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div className='text-center'>
              <div className='text-2xl mb-2'>🅿️</div>
              <div className='text-sm font-medium'>PayPal</div>
            </div>
          </button>
          <button
            type='button'
            onClick={() => handleMethodChange('bank_transfer')}
            className={`p-4 border-2 rounded-lg transition-colors ${
              selectedMethod === 'bank_transfer'
                ? 'border-beige-600 bg-beige-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div className='text-center'>
              <div className='text-2xl mb-2'>🏦</div>
              <div className='text-sm font-medium'>Bank</div>
            </div>
          </button>
        </div>
      </div>

      {selectedMethod === 'card' && (
        <div className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Card Number</label>
            <input
              type='text'
              value={paymentInfo.cardNumber}
              onChange={(e) => handleChange('cardNumber', formatCardNumber(e.target.value))}
              placeholder='1234 5678 9012 3456'
              maxLength={19}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-beige-600 focus:border-transparent'
              required={selectedMethod === 'card'}
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Card Holder Name</label>
            <input
              type='text'
              value={paymentInfo.cardHolder}
              onChange={(e) => handleChange('cardHolder', e.target.value.toUpperCase())}
              placeholder='JOHN DOE'
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-beige-600 focus:border-transparent'
              required={selectedMethod === 'card'}
            />
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Expiry Date</label>
              <input
                type='text'
                value={paymentInfo.expiryDate}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, '');
                  if (value.length >= 2) {
                    value = value.substring(0, 2) + '/' + value.substring(2, 4);
                  }
                  handleChange('expiryDate', value);
                }}
                placeholder='MM/YY'
                maxLength={5}
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-beige-600 focus:border-transparent'
                required={selectedMethod === 'card'}
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>CVV</label>
              <input
                type='text'
                value={paymentInfo.cvv}
                onChange={(e) =>
                  handleChange('cvv', e.target.value.replace(/\D/g, '').substring(0, 3))
                }
                placeholder='123'
                maxLength={3}
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-beige-600 focus:border-transparent'
                required={selectedMethod === 'card'}
              />
            </div>
          </div>
        </div>
      )}

      {selectedMethod === 'paypal' && (
        <div className='p-6 bg-blue-50 rounded-lg border border-blue-200'>
          <p className='text-sm text-blue-800'>
            You will be redirected to PayPal to complete your payment.
          </p>
        </div>
      )}

      {selectedMethod === 'bank_transfer' && (
        <div className='p-6 bg-gray-50 rounded-lg border border-gray-200'>
          <p className='text-sm text-gray-700 mb-2 font-semibold'>Bank Transfer Details:</p>
          <p className='text-sm text-gray-600'>
            Account: 1234 5678 9012 3456
            <br />
            Bank: Funiro Bank
            <br />
            Please include your order number in the transfer reference.
          </p>
        </div>
      )}
    </div>
  );
}
