import { memo, useCallback, useEffect, useRef } from 'react'
import coinsImage from '@/widgets/banner/assets/background/coins-currency.png'

interface BackgroundImageProps {
  bannerContainerRef: React.RefObject<HTMLDivElement>
}

const BackgroundImage = memo(({ bannerContainerRef }: BackgroundImageProps) => {
  const imageRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!imageRef.current || !bannerContainerRef.current) {
        return
      }

      const rect = bannerContainerRef.current.getBoundingClientRect()
      const { clientX, clientY } = e

      if (
        clientX < rect.left ||
        clientY < rect.top ||
        clientX > rect.right ||
        clientY > rect.bottom
      ) {
        imageRef.current.style.transform =
          'translate(0px, 0px) translateY(2.5rem)'
        return
      }

      const x = ((clientX - rect.left) / rect.width - 0.5) * 20
      const y = ((clientY - rect.top) / rect.height - 0.5) * 20

      imageRef.current.style.transform = `translate(${x}px, ${y}px) translateY(2.5rem)`
    },
    [bannerContainerRef]
  )

  const handleMouseLeave = useCallback(() => {
    if (!imageRef.current) {
      return
    }
    imageRef.current.style.transform = 'translate(0px, 0px) translateY(2.5rem)'
  }, [])

  useEffect(() => {
    const container = bannerContainerRef.current
    if (!container) {
      return
    }

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [bannerContainerRef, handleMouseMove, handleMouseLeave])

  return (
    <div
      ref={imageRef}
      className='hidden md:block absolute right-0 bottom-0 pointer-events-none z-0 translate-y-10 transition-transform duration-300 ease-out'
      style={{
        transform: 'translate(0px, 0px) translateY(2.5rem)',
      }}
    >
      <img
        src={coinsImage}
        alt=''
        className='max-w-[300px] max-h-[300px] w-auto h-auto object-contain'
        aria-hidden='true'
      />
    </div>
  )
})

BackgroundImage.displayName = 'BackgroundImage'

export default BackgroundImage
