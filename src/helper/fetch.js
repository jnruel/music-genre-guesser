export const getSpotifyAuthData = async () => {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

  const response = await fetch('https://accounts.spotify.com/api/token?grant_type=client_credentials', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret, 'utf8').toString('base64')),
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

  const data = await response.json();

  return data;
}