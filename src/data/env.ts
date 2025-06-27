import env from "astro:env/client"

export const GITHUB_REPO_URL = env.GITHUB_REPO_URL
export const SERVER_URL =
  process.env.NODE_ENV === "production" ? env.URL : env.DEPLOY_PRIME_URL
