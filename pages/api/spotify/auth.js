import Cookies from 'cookies';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

export default async function handler(req, res) {
  try {
    const authResponse = await fetch('https://accounts.spotify.com/api/token?grant_type=client_credentials', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret, 'utf8').toString('base64')),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const data = await authResponse.json();
    const { access_token: accessToken, token_type: tokenType, expires_in: expiresIn } = data;

    const cookies = new Cookies(req, res);

    let expiresDate = new Date();
    expiresDate.setSeconds(expiresDate.getSeconds() + expiresIn);

    cookies.set('spotify-access-token', accessToken, {
      sameSite: 'strict',
      httpOnly: true,
      expires: expiresDate
    });

    res.status(200).json({access_token: accessToken});
  }
  catch (error) {
    res.status(401);
  }

  res.end();
}