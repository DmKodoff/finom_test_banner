import { useId, useRef } from 'react'
import { Modal } from '@/shared/ui/Modal'
import { Button } from '@/shared/ui/Button'
import { Title } from '@/shared/ui/Title/Title'
import { Text } from '@/shared/ui/Text'
import CheckIcon from '@/widgets/banner/assets/icons/check-solid.svg?react'
import BackgroundImage from './BackgroundImage'
import ApplyButton from './ApplyButton'

interface BannerProps {
  isOpen?: boolean
  onClose: () => void
  onApply?: () => void
}

const FEATURES_LIST = [
  'Fast approval process',
  'Flexible repayment terms',
  'Competitive interest rates',
] as const

const Banner = ({ isOpen = true, onClose, onApply }: BannerProps) => {
  const handleApply = () => {
    onApply?.()
    onClose()
  }
  const bannerContainerRef = useRef<HTMLDivElement>(null)
  const titleId = useId()

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      aria-labelledby={titleId}
      className='w-[89.33vw] md:w-[700px] md:max-w-[700px] h-[auto] md:h-[376px] border-[3px] border-border-modal rounded-[12px]'
    >
      <div
        ref={bannerContainerRef}
        className='relative p-5 md:py-8 md:px-11 h-full flex flex-col'
      >
        <Title
          id={titleId}
          className='mb-5 md:mb-8 w-full text-[20px] leading-6 tracking-normal md:text-[24px] md:leading-[28px]'
        >
          Get the Business Funding You Need
        </Title>

        <div className='flex flex-col md:flex-row gap-5 md:gap-10 flex-grow relative z-10 items-start'>
          <div className='flex-1 flex flex-col'>
            <Text className='mb-0 md:mb-6 flex-grow tracking-normal'>
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
          <ApplyButton
            onApply={handleApply}
            isOpen={isOpen}
            className='h-auto py-3 px-6 w-full md:w-auto'
          />

          <Button
            variant='ghost'
            href='https://finom.co'
            target='_blank'
            rel='noopener noreferrer'
            className='text-xs text-text-light font-semibold leading-none tracking-[0.5px] text-center uppercase'
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
