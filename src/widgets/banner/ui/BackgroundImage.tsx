import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { cn } from '@/shared/lib/utils'
import coinsImage from '@/widgets/banner/assets/background/coins-currency.png'

interface BackgroundImageProps {
  bannerContainerRef: React.RefObject<HTMLDivElement>
}

const BackgroundImage = memo(({ bannerContainerRef }: BackgroundImageProps) => {
  const imageRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<ReturnType<
    typeof requestAnimationFrame
  > | null>(null)
  const [imageError, setImageError] = useState(false)
  const latestCoordsRef = useRef<{ x: number; y: number } | null>(null)

  const updateTransform = useCallback((x: number, y: number) => {
    if (!imageRef.current) {
      return
    }

    imageRef.current.style.transform = `translate(${x}px, ${y}px) translateY(2.5rem)`
  }, [])

  const processLatestCoords = useCallback(() => {
    if (!latestCoordsRef.current || !bannerContainerRef.current) {
      return
    }

    const { x: clientX, y: clientY } = latestCoordsRef.current
    const rect = bannerContainerRef.current.getBoundingClientRect()

    if (
      clientX < rect.left ||
      clientY < rect.top ||
      clientX > rect.right ||
      clientY > rect.bottom
    ) {
      updateTransform(0, 0)
      return
    }

    const x = ((clientX - rect.left) / rect.width - 0.5) * 15
    const y = ((clientY - rect.top) / rect.height - 0.5) * 15

    updateTransform(x, y)
    latestCoordsRef.current = null
  }, [bannerContainerRef, updateTransform])

  const throttledHandleMouseMove = useCallback(
    (e: MouseEvent) => {
      latestCoordsRef.current = { x: e.clientX, y: e.clientY }

      if (animationFrameRef.current === null) {
        animationFrameRef.current = requestAnimationFrame(() => {
          processLatestCoords()
          animationFrameRef.current = null
        })
      }
    },
    [processLatestCoords]
  )

  const handleMouseLeave = useCallback(() => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }
    updateTransform(0, 0)
  }, [updateTransform])

  const handleImageError = useCallback(() => {
    setImageError(true)
  }, [])

  useEffect(() => {
    const container = bannerContainerRef.current
    if (!container) {
      return
    }

    container.addEventListener('mousemove', throttledHandleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      container.removeEventListener('mousemove', throttledHandleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)

      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
    }
  }, [bannerContainerRef, throttledHandleMouseMove, handleMouseLeave])

  useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
    }
  }, [])

  return (
    <div
      ref={imageRef}
      className={cn(
        'absolute right-0 bottom-0 pointer-events-none z-0 translate-y-10 transition-transform duration-300 ease-out',
        imageError ? 'hidden' : 'hidden md:block'
      )}
    >
      <img
        src={coinsImage}
        alt=''
        className='max-w-[300px] max-h-[300px] w-auto h-auto object-contain'
        aria-hidden='true'
        onError={handleImageError}
      />
    </div>
  )
})

BackgroundImage.displayName = 'BackgroundImage'

export default BackgroundImage
