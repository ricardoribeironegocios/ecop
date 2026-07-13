/*
 * Cloudflare Workers – Intelligent cache and compression
 * Deployed alongside the static `out/` directory via `wrangler publish`
 *
 * Strategies:
 *  - Static assets (JS/CSS/images): immutable, 1 year cache
 *  - HTML pages: no-cache (always revalidate for fresh content)
 *  - All responses: Brotli/Gzip via Cloudflare automatic compression
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Attempt to serve from cache first
    const cache = caches.default;
    let response = await cache.match(request);

    if (!response) {
      // Fetch from origin/assets
      response = await env.ASSETS.fetch(request);

      if (response.ok || response.status === 304) {
        const headers = new Headers(response.headers);

        // Determine cache strategy by file type
        const isStaticAsset = /\.(js|css|woff2?|ttf|ico|svg|png|jpe?g|webp|avif|gif)(\?.*)?$/i.test(pathname);
        const isHtml = pathname.endsWith(".html") || pathname === "/" || !pathname.includes(".");

        if (isStaticAsset) {
          // Immutable static assets – cache for 1 year
          headers.set("Cache-Control", "public, max-age=31536000, immutable");
          headers.set("Vary", "Accept-Encoding");
        } else if (isHtml) {
          // HTML – always revalidate for fresh content
          headers.set("Cache-Control", "public, max-age=0, must-revalidate");
          headers.set("Vary", "Accept-Encoding");
        } else {
          // Default: short cache
          headers.set("Cache-Control", "public, max-age=3600, stale-while-revalidate=86400");
        }

        // Security headers (improve Lighthouse Best Practices score)
        headers.set("X-Content-Type-Options", "nosniff");
        headers.set("X-Frame-Options", "SAMEORIGIN");
        headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
        headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

        response = new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers,
        });

        // Cache static assets in the edge cache
        if (isStaticAsset) {
          ctx.waitUntil(cache.put(request, response.clone()));
        }
      }
    }

    return response;
  },
};
