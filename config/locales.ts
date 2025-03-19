export const localeData = {
    en: { flag: "/flags/en.png", short: "EN" },
    fr: { flag: "/flags/fr.png", short: "FR" },
  } as const;
  
  export type SupportedLocale = keyof typeof localeData;
  
  export const availableLocales: SupportedLocale[] = Object.keys(localeData) as SupportedLocale[];
  