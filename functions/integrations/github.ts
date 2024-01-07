import { Octokit } from "octokit"
import { stringify } from "gray-matter"

let octokit: Octokit;

interface Env {
  GITHUB_TOKEN: string;
}

export const onRequest: PagesFunction<Env> = async (context): Promise<Response> => {
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

  return new Response(stringify({ content: latest.data.body }, {
    name: latest.data.name,
    version: latest.data.tag_name,
    date: latest.data.created_at
  }))
}