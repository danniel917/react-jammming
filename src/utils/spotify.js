/* ----------------------------------------------------------
   Get (or refresh) the access token – implicit grant
---------------------------------------------------------- */
/**
 * This is an example of a basic node.js script that performs
 * the Client Credentials oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/documentation/web-api/tutorials/client-credentials-flow
 */

/* utils/spotifyAuth.js  –  runs in the browser (front-end only)  */
const CLIENT_ID = "100bbbb101d144789002f4e92c8997e5";
const REDIRECT_URI = "http://127.0.0.1:5173/";
const SCOPES = [
  "playlist-modify-public",
  "playlist-modify-private",
  "user-read-private",
].join(" ");

/* ------------------------------------------------ helpers */
const rand = (len) =>
  [...crypto.getRandomValues(new Uint8Array(len))]
    .map(
      (x) =>
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"[x % 62]
    )
    .join("");

const sha256 = (plain) =>
  crypto.subtle.digest("SHA-256", new TextEncoder().encode(plain));

const b64url = (buf) =>
  btoa(String.fromCharCode(...new Uint8Array(buf)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

/* ------------------------------------------------ main API */
export async function getAccessToken() {
  /* 1️⃣  return cached token if it’s still good */
  const cached = JSON.parse(localStorage.getItem("sp_token") || "{}");
  if (cached.access_token && Date.now() < cached.expires_at) {
    return cached.access_token;
  }

  /* 2️⃣  see if we’ve just returned from Spotify with ?code=... */
  const urlParams = new URLSearchParams(window.location.search);
  const authCode = urlParams.get("code");

  if (authCode) {
    const verifier = localStorage.getItem("sp_pkce_verifier");
    if (!verifier) throw new Error("Missing PKCE verifier");

    const res = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        grant_type: "authorization_code",
        code: authCode,
        redirect_uri: REDIRECT_URI,
        code_verifier: verifier,
      }),
    }).then((r) => r.json());

    /* cache token with its absolute expiration time */
    localStorage.setItem(
      "sp_token",
      JSON.stringify({
        access_token: res.access_token,
        expires_at: Date.now() + res.expires_in * 1000,
      })
    );
    localStorage.removeItem("sp_pkce_verifier");
    window.history.replaceState({}, "", REDIRECT_URI); // clean ?code=

    return res.access_token;
  }

  /* 3️⃣  no token, no code → start the PKCE flow */
  const codeVerifier = rand(96);
  localStorage.setItem("sp_pkce_verifier", codeVerifier);

  const codeChallenge = b64url(await sha256(codeVerifier));

  const authUrl = new URL("https://accounts.spotify.com/authorize");
  authUrl.search = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: "code",
    redirect_uri: REDIRECT_URI,
    scope: SCOPES,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
  }).toString();

  window.location.assign(authUrl); // will reload the page
  return new Promise(() => {}); // keep caller waiting (never resolves)
}

/* ----------------------------------------------------------
   Search for tracks – returns [{ id, name, artist, album, uri }]
---------------------------------------------------------- */
async function search(term, limit = 20) {
    const token = getAccessToken(); // may redirect if absent
    console.log(token);

  const endpoint = new URL("https://api.spotify.com/v1/search");
  endpoint.search = new URLSearchParams({
    type: "track",
    q: term,
    limit: limit.toString(),
  });

  const response = await fetch(endpoint, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();
  if (!data.tracks) return [];

  return data.tracks.items.map((t) => ({
    id: t.id,
    name: t.name,
    artist: t.artists[0]?.name ?? "",
    album: t.album.name,
    uri: t.uri,
  }));
}

export default { search };
