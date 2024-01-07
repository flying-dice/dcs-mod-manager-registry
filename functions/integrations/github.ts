import { Octokit } from "octokit"
import { stringify } from "gray-matter"
import * as jwt from "jsonwebtoken"

let octokit: Octokit;

interface Env {
  JWT_SECRET: string;
  GITHUB_TOKEN: string;
}

export const onRequest: PagesFunction<Env> = async (context): Promise<Response> => {
  const secret = context.request.headers.get("X-Hub-Signature-256")

  if (!secret) {
    return new Response("Unauthorized", { status: 401 })
  }

  let payload: jwt.JwtPayload

  try {
    payload = jwt.verify(secret, context.env.JWT_SECRET) as jwt.JwtPayload
  } catch (e) {
    return new Response("Unauthorized", { status: 401 })
  }

  if (!octokit) {
    octokit = new Octokit({
      auth: context.env.GITHUB_TOKEN,
    });
  }

  const latest = await octokit.rest.repos.getLatestRelease({
    owner: "flying-dice",
    repo: "hello-world-mod",
    mediaType: {format: "raw"},
  });

  const latestMd = stringify({ content: latest.data.body }, {
    name: latest.data.name,
    version: latest.data.tag_name,
    date: latest.data.created_at
  })

  return new Response(latestMd, { headers: { "X-DROPZONE-ID": `${payload.aud}` } })
}