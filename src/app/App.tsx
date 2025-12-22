import { MainPage } from '@/pages/main'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary'

const App = () => {
  return (
    <ErrorBoundary>
      <MainPage />
    </ErrorBoundary>
  )
}

export default App
