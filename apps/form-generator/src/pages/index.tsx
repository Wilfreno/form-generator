import Main from '@/components/main/Main'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Form Generator</title>
        <meta name="description" content="Form Generator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main />
    </>
  )
}
