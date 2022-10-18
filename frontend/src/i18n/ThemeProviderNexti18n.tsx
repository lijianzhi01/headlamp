import { deDE, enUS, esES, hiIN, ptPT } from '@material-ui/core/locale';
import { createTheme, Theme, ThemeProvider } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Loader } from '../components/common';

function getLocale(locale: string): typeof enUS {
  const LOCALES = {
    en: enUS,
    pt: ptPT,
    es: esES,
    de: deDE,
    ta: enUS, // @todo: material ui needs a translation for this.
    hi: hiIN,
  };
  type LocalesType = 'en' | 'pt' | 'es' | 'ta' | 'de' | 'hi';
  return locale in LOCALES ? LOCALES[locale as LocalesType] : LOCALES['en'];
}

/** Like a ThemeProvider but uses reacti18next for the language selection
 *  Because Material UI is localized as well.
 */
const ThemeProviderNexti18n: React.FunctionComponent<{ theme: Theme }> = props => {
  const { i18n, ready: isI18nReady } = useTranslation(
    ['sidebar', 'frequent', 'glossary', 'auth', 'resource', 'notifications'],
    {
      useSuspense: false,
    }
  );
  const [lang, setLang] = useState(i18n.language);

  function changeLang(lng: string) {
    if (lng) {
      document.documentElement.lang = lng;
      document.body.dir = i18n.dir();
      setLang(lng);
    }
  }

  useEffect(() => {
    i18n.on('languageChanged', changeLang);
    return () => {
      i18n.off('languageChanged', changeLang);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const theme = createTheme(props.theme, getLocale(lang));

  return (
    <ThemeProvider theme={theme}>
      {!!isI18nReady ? props.children : <Loader title="Loading..." />}
    </ThemeProvider>
  );
};

export default ThemeProviderNexti18n;
