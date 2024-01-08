import * as jose from "jose";
import { Octokit } from "octokit";
import * as integrations from "./integrations.json";
import { EntryIndexIntegrationOneOf } from "../client";

interface Env {
  JWT_SECRET: string;
}

/**
 * Handles incoming requests for registry integration API where the type is GitHub.
 */
const onGithubIntegrationRequest = async (
  context: EventContext<Env, any, Record<string, unknown>>,
  integrationUserToken: string,
  id: string,
  integration: EntryIndexIntegrationOneOf,
): Promise<Response> => {
  const octokit = new Octokit({ auth: integrationUserToken });
  const { data } = await octokit.rest.users.getAuthenticated();

  if (!integration || !integration.admins.includes(data.login)) {
    return new Response("Unauthorized", { status: 401 });
  }

  const secret = new TextEncoder().encode(context.env.JWT_SECRET);
  const jwt = await new jose.SignJWT({
    aud: id,
    sub: data.login,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt(Date.now())
    .sign(secret);

  return new Response(jwt, { headers: { "X-DROPZONE-ID": id } });
};

/**
 * Handles incoming requests for registry integration API checking for the following:
 *
 * - The request has a valid JWT token in the Authorization header.
 * - The Mod ID is present in the query params.
 * - The Mod ID is present in the registry.
 *
 * If all of the above are true, the integration token is generated using the specific integration handler and returned.
 */
export const onRequest: PagesFunction<Env> = async (
  context,
): Promise<Response> => {
  try {
    // Extract the JWT token from the Authorization header.
    const authHeader =
      context.request.headers.get("Authorization")?.startsWith("Bearer ") &&
      context.request.headers.get("Authorization");
    const integrationUserToken = authHeader.split(" ")[1];

    // If the request does not have an Authorization header, return a 401.
    if (!integrationUserToken) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Extract the ID from the query params.
    const searchParams = new URL(context.request.url).searchParams;
    const id = searchParams?.get("id");

    // If the ID is not present, return a 400.
    if (!id) {
      return new Response(
        "Bad Request, expected registry mod folder in query params, i.e. ?id=example-mod",
        { status: 400 },
      );
    }

    // Find the integration in the registry.
    const integration: EntryIndexIntegrationOneOf = integrations[id];

    // If the integration is not found, return a 404.
    if (!integration) {
      return new Response(`Mod with ID ${id} was not found in the registry`, {
        status: 404,
      });
    }

    // Handle the integration request.
    switch (integration.type) {
      case "github":
        return onGithubIntegrationRequest(
          context,
          integrationUserToken,
          id,
          integration,
        );
      default:
        return new Response(
          "Internal Server Error, unrecognised integration type, valid types are ['github']",
          { status: 500 },
        );
    }
  } catch (e) {
    console.error("Error while generating JWT", e);
    return new Response("Internal Server Error", { status: 500 });
  }
};
