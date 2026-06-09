import { AppRouter } from '@/app/router'
import AuthInitWrapper from '@/features/auth/components/AuthInitWrapper'

const App = () => (
  <AuthInitWrapper>
    <AppRouter />
  </AuthInitWrapper>
)

export default App
