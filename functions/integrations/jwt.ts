import * as jwt from "jsonwebtoken"

interface Env {
  JWT_SECRET: string;
  API_KEY_NAME: string;
  API_KEY_VALUE: string;
}

export const onRequest: PagesFunction<Env> = async (context): Promise<Response> => {
  if (context.env.API_KEY_NAME && context.env.API_KEY_VALUE && context.request.headers.get(context.env.API_KEY_NAME) !== context.env.API_KEY_VALUE) {
    return new Response("Unauthorized", { status: 401 })
  }

  return new Response(jwt.sign({ aud: context.params.id }, context.env.JWT_SECRET, { expiresIn: '1h' }))
}