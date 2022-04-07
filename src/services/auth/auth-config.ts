const AUTHORIZATION_SCOPE = [
    'streaming',
    'user-library-read',
    'user-library-modify',
    'user-follow-read',
    'user-follow-modify',
    'user-read-private',
    'user-modify-playback-state',
    'user-read-playback-state',
    'user-read-playback-position',
    'playlist-modify-private',
    'playlist-read-collaborative',
    'user-read-email',
    'playlist-read-private',
    'user-top-read',
    'playlist-modify-public',
    'user-read-currently-playing',
    'user-read-recently-played'
]
export const IDENTITY_CONFIG = {
  authority: process.env.REACT_APP_AUTH_URL,
  client_id: process.env.REACT_APP_CLIENT_ID,
  response_type: "code",
  redirect_uri: window.location.origin,
  code_challenge_method: "S256",
  loadUserInfo: false,
  silent_redirect_uri: window.location.origin + "/callback",
  silentRequestTimeout: 2000,
  scope: AUTHORIZATION_SCOPE.join(' ')
};

export const METADATA_CONFIG = {
  issuer: process.env.REACT_APP_AUTH_URL,
  authorization_endpoint: process.env.REACT_APP_AUTH_URL + "/oauth2/v2/auth",
  token_endpoint: process.env.REACT_APP_AUTH_URL + "/api/token",
  userinfo_endpoint: process.env.REACT_APP_AUTH_URL + "/oidc/userinfo/v1",
  revocation_endpoint: process.env.REACT_APP_AUTH_URL + "/oauth2/revoke/v1",
  introspection_endpoint:
    process.env.REACT_APP_AUTH_URL + "/connect/introspect",
  jwks_uri: process.env.REACT_APP_AUTH_URL + "/oidc/certs/v1",
};
