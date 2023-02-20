import { type NextPage } from "next"
import Head from "next/head"
import { api } from "~/utils/api"

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "19/27 - Link Shortner" })
  console.log(hello.data?.greeting)

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
          19/27 - Link Shortner
        </h1>
      </main>
    </>
  )
}

export default Home
