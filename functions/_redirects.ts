// Cloudflare Pages Function to handle redirects for trailing slashes
// This middleware runs on every request and redirects paths without trailing slashes
// to their trailing slash versions

export async function onRequest(context: any): Promise<Response> {
  const url = new URL(context.request.url);
  const pathname = url.pathname;

  // Skip redirects for:
  // - Root path
  // - Paths that already have trailing slashes
  // - Paths with file extensions (like .html, .css, .js, .jpg, etc.)
  // - API paths or special paths
  // - Assets directory
  if (
    pathname === '/' ||
    pathname.endsWith('/') ||
    pathname.match(/\.(html|css|js|jpg|jpeg|png|gif|svg|webp|ico|json|xml|txt|pdf|woff|woff2|ttf|eot)$/i) ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_') ||
    pathname.startsWith('/assets/')
  ) {
    return context.next();
  }

  // Try to fetch the path with a trailing slash to see if it exists
  // If it does, redirect to it
  try {
    const response = await fetch(`${url.origin}${pathname}/index.html`, {
      method: 'HEAD',
      cf: { cacheTtl: 0 } // Don't cache this check
    });

    // If the directory exists (status 200), redirect to trailing slash version
    if (response.ok || response.status === 200) {
      return Response.redirect(`${url.origin}${pathname}/`, 301);
    }
  } catch (e) {
    // If fetch fails, continue with normal handling
  }

  // Continue with normal request handling
  return context.next();
}
