import App from 'next/app';
import type { AppProps, AppContext } from 'next/app'
import '../src/styles/globals.scss'
import AppContextProvider from '../src/contexts/AppContext';
import { getSpotifyAuthData } from '../src/helper/fetch';
import Cookies from 'cookies';

interface ThisAppProps extends AppProps {
  accessToken?: string
}

function MyApp({ Component, pageProps, accessToken }: ThisAppProps) {
  return (
    <AppContextProvider accessToken={accessToken}>
      <Component {...pageProps} />
    </AppContextProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  let accessToken = null;

  const { req, res } = appContext.ctx;
  if (req && res) {
    const cookies = new Cookies(req, res);
    let accessTokenValue = cookies.get('spotify-access-token');

    if (accessTokenValue) {
      accessToken = accessTokenValue;
    }
    else {
      const data = await getSpotifyAuthData();
      accessToken = data.access_token;

      // Generate new cookie.
      let expiresDate = new Date();
      expiresDate.setSeconds(expiresDate.getSeconds() + data.expires_in);
      cookies.set('spotify-access-token', accessToken, {
        sameSite: 'strict',
        httpOnly: true,
        expires: expiresDate
      });
    }
  }

  // Call the page's `getInitialProps` and fill `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps, accessToken };
};

export default MyApp;
