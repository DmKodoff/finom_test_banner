import React, { Component, ErrorInfo, ReactNode } from 'react'
import { Button } from '@/shared/ui/Button'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

/**
 * Error Boundary component for catching React rendering errors
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
    }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console in development
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught an error:', error, errorInfo)
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className='min-h-screen bg-bg-app flex items-center justify-center p-4'>
          <div className='max-w-md w-full bg-bg-content rounded-lg border-2 border-border-modal p-6 shadow-lg'>
            <h2 className='text-2xl font-bold text-text-default mb-4'>
              Something went wrong
            </h2>
            <p className='text-text-light mb-4'>
              {this.state.error?.message ||
                'An unexpected error occurred. Please try again.'}
            </p>
            <Button variant='primary' onClick={this.handleReset}>
              Try again
            </Button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

