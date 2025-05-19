const client_id = process.env.SPOTIFY_CLIENT_ID!;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN!;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

async function getAccessToken() {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  });
  return response.json();
}

export async function getTopArtists() {
  const { access_token } = await getAccessToken();
  const res = await fetch('https://api.spotify.com/v1/me/top/artists?limit=5', {
    headers: { Authorization: `Bearer ${access_token}` },
    next: { revalidate: 3600 }, // cache for 1 hour
  });
  return res.json();
}

export async function getTopTracks() {
  const { access_token } = await getAccessToken();
  const res = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=5', {
    headers: { Authorization: `Bearer ${access_token}` },
    next: { revalidate: 3600 }, // cache for 1 hour
  });
  return res.json();
} 