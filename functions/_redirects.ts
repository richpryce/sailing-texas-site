// Cloudflare Pages Function to handle redirects for trailing slashes
// This middleware runs on every request and redirects paths without trailing slashes
// to their trailing slash versions if the directory exists

export async function onRequest(context: any): Promise<Response> {
  const url = new URL(context.request.url);
  const pathname = url.pathname;

  // Skip redirects for:
  // - Root path
  // - Paths that already have trailing slashes
  // - Paths with file extensions (like .html, .css, .js, .jpg, etc.)
  // - API paths or special paths
  if (
    pathname === '/' ||
    pathname.endsWith('/') ||
    pathname.match(/\.(html|css|js|jpg|jpeg|png|gif|svg|webp|ico|json|xml|txt|pdf|woff|woff2|ttf|eot)$/i) ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_')
  ) {
    return context.next();
  }

  // Check if this path should have a trailing slash by trying to fetch the directory version
  // For now, we'll redirect common page paths
  const pathsThatNeedTrailingSlash = [
    '/weather',
    '/regattas',
    '/gallery',
    '/sailing-class',
    '/boats',
    '/rentals',
    '/how-to',
    '/videos',
    '/lakes',
    '/contact',
    '/bookstore',
    '/search',
    '/lessons',
    '/sails',
    '/scam-warnings',
    '/state-parks',
    '/clubs',
    '/post-ad'
  ];

  if (pathsThatNeedTrailingSlash.includes(pathname)) {
    return Response.redirect(`${url.origin}${pathname}/`, 301);
  }

  // Continue with normal request handling
  return context.next();
}
