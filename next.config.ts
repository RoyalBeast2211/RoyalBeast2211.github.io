import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS || false;
let repo = "";
if (isGithubActions && process.env.GITHUB_REPOSITORY) {
  repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, "");
}
// If repository is username.github.io or custom domain, basePath is empty, otherwise /<repo-name>
const isUserPage = repo.endsWith(".github.io");
const basePath = isGithubActions && !isUserPage && repo ? `/${repo}` : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
