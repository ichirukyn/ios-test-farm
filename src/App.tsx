
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Providers from './providers'
import Cabinet from './layout/cabinet'

import useTelegramWebApp from '@/hooks/useTelegramApp'
//import useIntroCustomize from './hooks/useIntroCustomize'

import '@/types/telegram-webapp.d.ts'

function App() {

  useTelegramWebApp()
  //useIntroCustomize()

  return (
    <Providers>
    <BrowserRouter>
      <Cabinet />
    </BrowserRouter>
  </Providers>
  )
}

export default App
