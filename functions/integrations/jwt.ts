import * as jose from "jose"
import debug0 from "debug"

const debug = debug0("jwt")

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

    if (!searchParams?.get("id")) {
      return new Response("Bad Request, search params should contain valid ID", { status: 400 })
    }

    const secret = new TextEncoder().encode(context.env.JWT_SECRET)
    const jwt = await new jose.SignJWT({ id: context.params.id }).sign(secret)

    return new Response(jwt, { headers: { "X-DROPZONE-ID": `${context.params.id}` } })
  } catch (e) {
    console.error("Error while generating JWT", e)
    debug("Error while generating JWT: %O", e)
    return new Response("Internal Server Error", { status: 500 })
  }
}