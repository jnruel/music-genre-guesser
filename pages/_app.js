import '../src/styles/globals.css'
import AppContextProvider from '../src/contexts/AppContext';
import App from 'next/app';
import Cookies from 'cookies';
import { getSpotifyAuthData } from '../src/helper/fetch';

function MyApp({ Component, pageProps, accessToken }) {
  return (
    <AppContextProvider accessToken={accessToken}>
      <Component {...pageProps} />
    </AppContextProvider>
  );
}

MyApp.getInitialProps = async (appContext) => {
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
