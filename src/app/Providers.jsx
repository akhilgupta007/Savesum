import { Provider } from 'react-redux'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'

import { store } from '@/store'
import { queryClient } from '@/lib/queryClient'
import { IS_DEV } from '@/constants/app.constants'

export const Providers = ({ children }) => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster position="top-right" />
      {IS_DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  </Provider>
)
