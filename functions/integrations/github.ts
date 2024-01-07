interface Env {
  ENVIRONMENT: string;
}


export const onRequest: PagesFunction<Env> = (context): Response => {
  return new Response(`Hello, world! ${context.env?.ENVIRONMENT}`)
}