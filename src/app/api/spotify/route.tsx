// -import { NextResponse } from "next/server";
// -
// -export async function GET() {
// -  const base = "https://accounts.spotify.com/authorize";
// -  const params = new URLSearchParams({
// -    response_type: "code",
// -    client_id: process.env.SPOTIFY_CLIENT_ID!,
// -    scope: "user-top-read",
// -    redirect_uri: process.env.SPOTIFY_REDIRECT_URI!,
// -  });
// -  return NextResponse.redirect(`${base}?${params}`);
// -}