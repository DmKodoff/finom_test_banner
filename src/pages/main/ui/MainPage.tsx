import { useState } from 'react'
import { Banner } from '@/widgets/banner'
import { Button } from '@/shared/ui/Button'

const MainPage = () => {
  const [isBannerOpen, setIsBannerOpen] = useState(true)

  const handleToggleBanner = () => {
    setIsBannerOpen((value) => !value)
  }

  return (
    <div className='min-h-screen bg-bg-app'>
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-2xl font-bold mb-4'>Finom Test Banner</h1>

        <p className='text-text-light mb-4'>
          This is the main page. The banner will appear as a modal overlay.
        </p>

        <Button onClick={handleToggleBanner} variant='primary'>
          Show Modal Banner
        </Button>
      </div>

      <Banner isOpen={isBannerOpen} onClose={handleToggleBanner} />
    </div>
  )
}

export default MainPage
