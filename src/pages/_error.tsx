import { type NextPage } from "next"
import Head from "next/head"

const Error: NextPage = () => {
  return (
    <>
      <Head>
        <title>19/27 - Link Shortner</title>
      </Head>
      <main
        data-theme="cyberpunk"
        className="flex min-h-screen flex-col gap-4 text-center"
      >
        <h1 className="m-6 text-4xl font-extrabold tracking-tight">
          Seems like you&apos;re lost...
        </h1>
      </main>
    </>
  )
}

export default Error
