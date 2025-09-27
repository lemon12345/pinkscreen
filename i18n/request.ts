import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  const common = (await import(`./messages/${locale}/common.json`)).default;

  return {
    locale,
    messages: {
      // Screen components
      Home: (await import(`./messages/${locale}/Home.json`)).default,
      WhiteScreen: (await import(`./messages/${locale}/WhiteScreen.json`)).default,
      BlackScreen: (await import(`./messages/${locale}/BlackScreen.json`)).default,
      RedScreen: (await import(`./messages/${locale}/RedScreen.json`)).default,
      GreenScreen: (await import(`./messages/${locale}/GreenScreen.json`)).default,
      BlueScreen: (await import(`./messages/${locale}/BlueScreen.json`)).default,
      YellowScreen: (await import(`./messages/${locale}/YellowScreen.json`)).default,
      OrangeScreen: (await import(`./messages/${locale}/OrangeScreen.json`)).default,
      PinkScreen: (await import(`./messages/${locale}/PinkScreen.json`)).default,
      PurpleScreen: (await import(`./messages/${locale}/PurpleScreen.json`)).default,
      
      // Other screens (kept)
      ZoomLighting: (await import(`./messages/${locale}/ZoomLighting.json`)).default,
      
      // common
      ...common
    }
  };
});