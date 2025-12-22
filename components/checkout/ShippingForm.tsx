'use client'

import { ShippingAddress } from '@/types/order'

interface ShippingFormProps {
  address: ShippingAddress
  onChange: (address: ShippingAddress) => void
}

export default function ShippingForm({ address, onChange }: ShippingFormProps) {
  const handleChange = (field: keyof ShippingAddress, value: string) => {
    onChange({ ...address, [field]: value })
  }

  return (
    <div className='space-y-4'>
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-2'>Full Name</label>
        <input
          type='text'
          value={address.fullName}
          onChange={(e) => handleChange('fullName', e.target.value)}
          className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-beige-600 focus:border-transparent'
          required
        />
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-2'>Email</label>
        <input
          type='email'
          value={address.email}
          onChange={(e) => handleChange('email', e.target.value)}
          className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-beige-600 focus:border-transparent'
          required
        />
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-2'>Phone</label>
        <input
          type='tel'
          value={address.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-beige-600 focus:border-transparent'
          required
        />
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-2'>Address</label>
        <input
          type='text'
          value={address.address}
          onChange={(e) => handleChange('address', e.target.value)}
          className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-beige-600 focus:border-transparent'
          required
        />
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>City</label>
          <input
            type='text'
            value={address.city}
            onChange={(e) => handleChange('city', e.target.value)}
            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-beige-600 focus:border-transparent'
            required
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>State</label>
          <input
            type='text'
            value={address.state}
            onChange={(e) => handleChange('state', e.target.value)}
            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-beige-600 focus:border-transparent'
            required
          />
        </div>
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>ZIP Code</label>
          <input
            type='text'
            value={address.zipCode}
            onChange={(e) => handleChange('zipCode', e.target.value)}
            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-beige-600 focus:border-transparent'
            required
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>Country</label>
          <input
            type='text'
            value={address.country}
            onChange={(e) => handleChange('country', e.target.value)}
            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-beige-600 focus:border-transparent'
            required
          />
        </div>
      </div>
    </div>
  )
}

