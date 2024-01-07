import { Octokit } from "octokit"

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
  });

  return new Response(latest.data.tag_name)
}