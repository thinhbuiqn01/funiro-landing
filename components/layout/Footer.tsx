'use client'

import { motion } from 'framer-motion'
import AnimatedSection from '@/components/ui/AnimatedSection'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    links: [
      { name: 'Home', href: '#' },
      { name: 'Shop', href: '#products' },
      { name: 'About', href: '#about' },
      { name: 'Contact', href: '#contact' },
    ],
    help: [
      { name: 'Payment Options', href: '#' },
      { name: 'Returns', href: '#' },
      { name: 'Privacy Policies', href: '#' },
    ],
  }

  return (
    <footer className='bg-white border-t border-gray-200'>
      <AnimatedSection>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-16'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12'>
            {/* Logo & Address */}
            <div>
              <h3 className='text-2xl font-bold text-gray-900 mb-4'>Funiro.</h3>
              <p className='text-gray-600 leading-relaxed'>
                400 University Drive Suite 200
                <br />
                Coral Gables, FL 33134 USA
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className='text-lg font-semibold text-gray-900 mb-4'>Links</h4>
              <ul className='space-y-3'>
                {footerLinks.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className='text-gray-600 hover:text-gray-900 transition-colors'
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help */}
            <div>
              <h4 className='text-lg font-semibold text-gray-900 mb-4'>Help</h4>
              <ul className='space-y-3'>
                {footerLinks.help.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className='text-gray-600 hover:text-gray-900 transition-colors'
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className='text-lg font-semibold text-gray-900 mb-4'>Newsletter</h4>
              <form className='space-y-3'>
                <input
                  type='email'
                  placeholder='Enter Your Email Address'
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-beige-600 focus:border-transparent'
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type='submit'
                  className='w-full px-6 py-3 bg-beige-600 text-white font-semibold rounded-lg hover:bg-beige-700 transition-colors'
                >
                  SUBSCRIBE
                </motion.button>
              </form>
            </div>
          </div>

          {/* Copyright */}
          <div className='mt-12 pt-8 border-t border-gray-200'>
            <p className='text-gray-600 text-sm'>{currentYear} furino. All rights reverved</p>
          </div>
        </div>
      </AnimatedSection>
    </footer>
  )
}
