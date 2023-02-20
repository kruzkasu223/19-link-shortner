import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export const middleware = async (request: NextRequest) => {
  if (request.nextUrl.pathname === "/") return

  const alias = request.nextUrl.pathname.replace("/", "")
  if (!alias) return
  try {
    const res = await fetch(
      `${request.nextUrl.origin}/api/trpc/linkShortner.getLink?batch=1&input=%7B%220%22%3A%7B%22json%22%3A%7B%22alias%22%3A%22${alias}%22%7D%7D%7D`
    )
    const data = (await res.json()) as unknown

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const isError = Boolean(data?.[0]?.error)
    if (isError) return NextResponse.redirect(`${request.nextUrl.origin}`)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const url = String(data?.[0]?.result?.data?.json?.url)
    if (!url) return NextResponse.redirect(`${request.nextUrl.origin}`)

    return NextResponse.redirect(url)
  } catch {
    return NextResponse.redirect(`${request.nextUrl.origin}`)
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", "/:slug"],
}
