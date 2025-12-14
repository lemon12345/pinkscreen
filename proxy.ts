import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export async function proxy(request: Request) {
  const intl = createIntlMiddleware(routing);
  // next-intl 的 createIntlMiddleware 期望 NextRequest，但 proxy 接收标准 Request
  // 我们需要将其转换为 NextRequest 兼容格式
  const nextRequest = request as any;
  return intl(nextRequest);
}

export const config = {
  matcher: [
    // 匹配所有语言路径
    '/(de|en|es|fr|it|ja|ko|pl|pt|ru|zh)/:path*',
    // 匹配根路径
    '/',
    // 排除不需要处理的路径：
    // - api (API 路由)
    // - _next (Next.js 内部)
    // - _vercel (Vercel 内部)
    // - sitemap.xml 和 robots.txt (由 Next.js 直接处理)
    // - 静态资源文件
    '/((?!api|_next|_vercel|auth|sitemap\\.xml|robots\\.txt|favicon\\.ico|.*\\.(?:jpg|jpeg|png|gif|svg|webp|ico|css|js|woff|woff2|ttf|eot|pdf|zip|json)).*)'
  ]
};

