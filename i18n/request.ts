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
      HackerTyper: (await import(`./messages/${locale}/HackerTyper.json`)).default,
      HackerSimulator: (await import(`./messages/${locale}/HackerSimulator.json`)).default,
      
      // System simulation screens
      BiosScreen: (await import(`./messages/${locale}/BiosScreen.json`)).default,
      AndroidUpdateScreen: (await import(`./messages/${locale}/AndroidUpdateScreen.json`)).default,
      MacOSXUpdateScreen: (await import(`./messages/${locale}/MacOSXUpdateScreen.json`)).default,
      UbuntuUpdateScreen: (await import(`./messages/${locale}/UbuntuUpdateScreen.json`)).default,
      Windows10UpdateScreen: (await import(`./messages/${locale}/Windows10UpdateScreen.json`)).default,
      Windows11UpdateScreen: (await import(`./messages/${locale}/Windows11UpdateScreen.json`)).default,
      WindowsXPUpdateScreen: (await import(`./messages/${locale}/WindowsXPUpdateScreen.json`)).default,
      FakeDosScreen: (await import(`./messages/${locale}/FakeDosScreen.json`)).default,
      FakeVirusScreen: (await import(`./messages/${locale}/FakeVirusScreen.json`)).default,
      FbiWarningScreen: (await import(`./messages/${locale}/FbiWarningScreen.json`)).default,
      
      // Screensaver and effects
      DVDScreensaver: (await import(`./messages/${locale}/DVDScreensaver.json`)).default,
      NoSignalSMPTEColorBarsScreensaver: (await import(`./messages/${locale}/NoSignalSMPTEColorBarsScreensaver.json`)).default,
      BrokenScreen: (await import(`./messages/${locale}/BrokenScreen.json`)).default,
      BlueScreenOfDeath: (await import(`./messages/${locale}/BlueScreenOfDeath.json`)).default,
      BlueScreenOfDeathWindows10: (await import(`./messages/${locale}/BlueScreenOfDeathWindows10.json`)).default,
      
      // Other tools section
      OtherTools: (await import(`./messages/${locale}/OtherTools.json`)).default,
      
      // Color screens section
      ColorScreens: (await import(`./messages/${locale}/ColorScreens.json`)).default,
      
      // common
      ...common
    }
  };
});