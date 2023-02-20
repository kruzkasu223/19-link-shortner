import { type NextPage } from "next"
import Head from "next/head"
import { type ChangeEvent, type FormEvent, useState, useEffect } from "react"
import { UNIDENTIFIED_ERROR } from "~/constants"
import { Loading } from "~/Loading"
import { api } from "~/utils/api"

const initialFormValues = {
  url: "",
  alias: "",
}

const Home: NextPage = () => {
  const [formValues, setFormValues] = useState(initialFormValues)
  const [error, setError] = useState("")
  const [generatedLink, setGeneratedLink] = useState("")

  useEffect(() => {
    setError("")
  }, [formValues])

  const { mutate: addLinkMutation, isLoading } =
    api.linkShortner.addLink.useMutation({
      onSuccess(data) {
        if (!data.success) return setError(UNIDENTIFIED_ERROR)
        setGeneratedLink(`${window.location.origin}/${data.alias}`)
        setFormValues(initialFormValues)
      },
      onError(error) {
        setError(error.message)
      },
    })

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addLinkMutation(formValues)
  }

  const handleAutoGenerate = () => {
    const randomString = Math.random().toString(36).substring(2, 10)
    setFormValues((prev) => ({ ...prev, alias: randomString }))
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleCopyLink = () => {
    void navigator.clipboard.writeText(generatedLink)
  }

  const handleOkayLink = () => {
    setGeneratedLink("")
  }

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
        <Loading loading={isLoading} />

        <div className="mx-auto flex max-w-7xl flex-col gap-8">
          {error && (
            <div className="flex flex-col items-center">
              <div className="alert alert-error shadow-lg">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 flex-shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <h3 className="text-left font-bold">
                      Error! Something went wrong...
                    </h3>
                    <div className="text-left text-xs">
                      message: {error ? error : UNIDENTIFIED_ERROR}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {generatedLink && (
            <div className="alert alert-info shadow-lg">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="h-6 w-6 flex-shrink-0 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <div>
                  <h3 className="text-left font-bold">
                    Link Generated Successfully!
                  </h3>
                  <div className="text-left text-xs">{generatedLink}</div>
                </div>
                <div className="ml-2 flex-none">
                  <button
                    className="btn-ghost btn-sm btn"
                    onClick={handleOkayLink}
                  >
                    Okay
                  </button>
                  <button
                    className="btn-primary btn-sm btn"
                    onClick={handleCopyLink}
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-8">
            <form
              className="flex flex-col gap-8 bg-secondary p-8"
              onSubmit={handleFormSubmit}
            >
              <div>
                <label htmlFor="url" className="label">
                  URL
                </label>
                <input
                  required
                  id="url"
                  name="url"
                  type="url"
                  value={formValues.url}
                  onChange={handleInputChange}
                  placeholder="Enter valid URL"
                  className="input-bordered input-primary input w-full max-w-xs"
                />
              </div>
              <div>
                <label htmlFor="alias" className="label">
                  Alias
                </label>
                <input
                  required
                  id="alias"
                  name="alias"
                  type="text"
                  value={formValues.alias}
                  onChange={handleInputChange}
                  placeholder="Enter an alias"
                  className="input-bordered input-primary input w-full max-w-xs"
                />
                <label className="label justify-end">
                  <button
                    type="button"
                    className="btn-accent btn-xs btn"
                    onClick={handleAutoGenerate}
                  >
                    Auto Generate
                  </button>
                </label>
              </div>
              <button className="btn-primary btn">Button</button>
            </form>
          </div>
        </div>
      </main>
    </>
  )
}

export default Home
