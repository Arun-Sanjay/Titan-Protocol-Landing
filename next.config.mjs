/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel's serverless function bundler (Next.js output file tracing) can't
  // auto-detect files that the /api/download/[platform] route reads via a
  // runtime-built `path.join(process.cwd(), "private", "downloads", ...)`
  // path. Explicitly include the installers so they ship inside the function.
  outputFileTracingIncludes: {
    "/api/download/[platform]": ["./private/downloads/**/*"],
  },
};

export default nextConfig;
