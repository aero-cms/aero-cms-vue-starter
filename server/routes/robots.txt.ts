export default defineEventHandler((event) => {
  const config = useRuntimeConfig();
  const siteUrl = String(config.public.siteUrl || 'http://localhost:3000').replace(/\/$/, '');

  setHeader(event, 'content-type', 'text/plain; charset=utf-8');
  return `User-agent: *\nAllow: /\nDisallow: /admin\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
});
