import * as jose from "jose"

interface Env {
  JWT_SECRET: string;
  API_KEY_NAME: string;
  API_KEY_VALUE: string;
}

export const onRequest: PagesFunction<Env> = async (context): Promise<Response> => {
  if (context.env.API_KEY_NAME && context.env.API_KEY_VALUE && context.request.headers.get(context.env.API_KEY_NAME) !== context.env.API_KEY_VALUE) {
    return new Response("Unauthorized", { status: 401 })
  }

  try {
    const searchParams = new URL(context.request.url).searchParams
    const id = searchParams?.get("id")
    const owner = searchParams?.get("owner")
    const repo = searchParams?.get("repo")

    if (!id) {
      return new Response("Bad Request, search params should contain valid MOD ID", { status: 400 })
    }

    if (!owner || !repo) {
      return new Response("Bad Request, search params should contain valid owner and repo", { status: 400 })
    }

    const secret = new TextEncoder().encode(context.env.JWT_SECRET)
    const jwt = await new jose.SignJWT({ id, owner, repo }).setProtectedHeader({ alg: "HS256" }).setIssuedAt(Date.now()).sign(secret)

    return new Response(jwt, { headers: { "X-DROPZONE-ID": id } })
  } catch (e) {
    console.error("Error while generating JWT", e)
    return new Response("Internal Server Error", { status: 500 })
  }
}