import { expect, afterEach, beforeAll, afterAll } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers)

// Suppress React error logs in tests (errors are expected when testing ErrorBoundary)
const originalError = console.error
const originalWarn = console.warn

beforeAll(() => {
  // Suppress React error logs about uncaught errors in ErrorBoundary tests
  console.error = (...args: unknown[]) => {
    const message = String(args[0] || '')
    if (
      message.includes('Error:') ||
      message.includes('Uncaught') ||
      message.includes('The above error occurred') ||
      message.includes('at ThrowError')
    ) {
      return // Suppress these expected errors
    }
    originalError.call(console, ...args)
  }

  // Also suppress warnings about uncaught errors
  console.warn = (...args: unknown[]) => {
    const message = String(args[0] || '')
    if (
      message.includes('Error:') ||
      message.includes('Uncaught') ||
      message.includes('at ThrowError')
    ) {
      return // Suppress these expected warnings
    }
    originalWarn.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
  console.warn = originalWarn
})

// Cleanup after each test
afterEach(() => {
  cleanup()
})
