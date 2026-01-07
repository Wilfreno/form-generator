import ComponentProvider from '@/providers/ComponentProvider'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Poppins } from 'next/font/google'

const poppins = Poppins({ weight: ['400', '500', '600', '700'], subsets: ['latin'] })
export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={poppins.className}>
      <ComponentProvider>
        <Component {...pageProps} />
      </ComponentProvider>
    </div>
  )
}
