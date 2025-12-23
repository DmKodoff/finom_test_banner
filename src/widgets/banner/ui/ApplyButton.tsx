import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { Button } from '@/shared/ui/Button'

interface ApplyButtonProps {
  onApply?: () => void
  isOpen?: boolean
  className?: string
}

const APPLY_DELAY_MS = 2_000

const ApplyButton = memo(
  ({ onApply, isOpen = true, className }: ApplyButtonProps) => {
    const [isApplying, setIsApplying] = useState(false)
    const applyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const isApplyingRef = useRef(false)

    useEffect(() => {
      isApplyingRef.current = isApplying
    }, [isApplying])

    const handleApplyClick = useCallback(() => {
      if (isApplyingRef.current) {
        return
      }

      if (applyTimeoutRef.current !== null) {
        clearTimeout(applyTimeoutRef.current)
        applyTimeoutRef.current = null
      }

      setIsApplying(true)
      applyTimeoutRef.current = setTimeout(() => {
        setIsApplying(false)
        onApply?.()
        applyTimeoutRef.current = null
      }, APPLY_DELAY_MS)
    }, [onApply])

    useEffect(() => {
      if (!isOpen && applyTimeoutRef.current !== null) {
        clearTimeout(applyTimeoutRef.current)
        applyTimeoutRef.current = null
        setIsApplying(false)
      }

      return () => {
        if (applyTimeoutRef.current !== null) {
          clearTimeout(applyTimeoutRef.current)
          applyTimeoutRef.current = null
        }
      }
    }, [isOpen])

    return (
      <Button
        variant='primary'
        onClick={handleApplyClick}
        disabled={isApplying}
        loading={isApplying}
        className={className}
      >
        {isApplying ? 'Applying...' : 'Apply Now'}
      </Button>
    )
  }
)

ApplyButton.displayName = 'ApplyButton'

export default ApplyButton
