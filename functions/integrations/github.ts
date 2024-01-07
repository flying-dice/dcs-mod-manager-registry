import { Octokit } from "octokit"
import { stringify } from "gray-matter"
import * as jose from "jose"

let octokit: Octokit;

interface Env {
  JWT_SECRET: string;
  GITHUB_TOKEN: string;
}

export const onRequest: PagesFunction<Env> = async (context): Promise<Response> => {
  const searchParams = new URL(context.request.url).searchParams
  const token = searchParams?.get("token")

  if (!token) {
    return new Response("Unauthorized", { status: 401 })
  }

  const secret = new TextEncoder().encode(context.env.JWT_SECRET)
  let payload: any

  try {
    const verified = await jose.jwtVerify(token, secret)
    payload = verified.payload
  } catch (e) {
    return new Response("Unauthorized", { status: 401 })
  }

  if (!octokit) {
    octokit = new Octokit({
      auth: context.env.GITHUB_TOKEN,
    });
  }

  const latest = await octokit.rest.repos.getLatestRelease({
    owner: payload.owner,
    repo: payload.repo,
    mediaType: {format: "raw"},
  });

  const latestMd = stringify({ content: latest.data.body }, {
    name: latest.data.name,
    version: latest.data.tag_name,
    date: latest.data.created_at
  })

  return new Response(latestMd, { headers: { "X-DROPZONE-ID": `${payload.id}` } })
}