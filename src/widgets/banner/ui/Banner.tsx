import { useEffect, useRef, useState } from 'react'
import { Modal } from '@/shared/ui/Modal'
import { Button } from '@/shared/ui/Button'
import { Title } from '@/shared/ui/Title/Title'
import { Text } from '@/shared/ui/Text'
import CheckIcon from '@/widgets/banner/assets/icons/check-solid.svg?react'
import BackgroundImage from './BackgroundImage'

interface BannerProps {
  isOpen?: boolean
  onClose?: () => void
}

const FEATURES_LIST = [
  'Fast approval process',
  'Flexible repayment terms',
  'Competitive interest rates',
]

const Banner = ({ isOpen = true, onClose = () => {} }: BannerProps) => {
  const [isApplying, setIsApplying] = useState(false)
  const applyTimeoutRef = useRef<number | null>(null)
  const bannerContainerRef = useRef<HTMLDivElement>(null)

  const handleApplyClick = () => {
    if (isApplying) {
      return
    }

    setIsApplying(true)
    applyTimeoutRef.current = window.setTimeout(() => {
      setIsApplying(false)
      window.alert('Applied')
      onClose()
      applyTimeoutRef.current = null
    }, 2_000)
  }

  useEffect(() => {
    return () => {
      if (applyTimeoutRef.current !== null) {
        window.clearTimeout(applyTimeoutRef.current)
      }
    }
  }, [])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className='w-[89.33vw] md:w-[700px] md:max-w-[700px] h-[auto] md:h-[376px] border-[3px] border-border-modal rounded-[12px]'
    >
      <div
        ref={bannerContainerRef}
        className='relative p-5 md:py-8 md:px-11 h-full flex flex-col'
      >
        <Title className='mb-5 md:mb-8 w-full text-[20px] leading-6 tracking-normal md:text-[24px] md:leading-[28px]'>
          Get the Business Funding You Need
        </Title>

        <div className='flex flex-col md:flex-row gap-5 md:gap-10 flex-grow relative z-10 items-start'>
          <div className='flex-1 flex flex-col'>
            <Text
              variant='light'
              className='mb-0 md:mb-6 flex-grow tracking-normal'
            >
              Expand your business with a flexible loan tailored to your needs.
              Whether you're investing in new equipment, increasing inventory,
              or boosting cash flow, we offer quick approvals and competitive
              rates to keep your business growing.
            </Text>
          </div>

          <div className='flex-1 flex flex-col justify-start md:justify-center gap-3'>
            <ul className='space-y-[12px]'>
              {FEATURES_LIST.map((feature) => (
                <li key={feature} className='flex items-start gap-3'>
                  <CheckIcon
                    className='w-[24px] h-[24px] flex-shrink-0'
                    style={{ color: 'var(--text-success)' }}
                    aria-hidden='true'
                  />

                  <span className='text-base font-medium leading-6 tracking-normal text-text-default'>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className='flex flex-col md:flex-row gap-4 items-center mt-8 md:mt-5'>
          <Button
            variant='primary'
            onClick={handleApplyClick}
            disabled={isApplying}
            loading={isApplying}
            className='h-auto py-3 px-6 w-full md:w-auto '
          >
            {isApplying ? 'Applying...' : 'Apply Now'}
          </Button>

          <Button
            variant='ghost'
            href='https://finom.co'
            target='_blank'
            rel='noopener noreferrer'
            className='text-xs font-semibold leading-none tracking-[0.5px] text-center uppercase'
          >
            More Information
          </Button>
        </div>

        <BackgroundImage bannerContainerRef={bannerContainerRef} />
      </div>
    </Modal>
  )
}

export default Banner
