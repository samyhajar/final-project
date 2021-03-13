// For server-side cookies
import cookie from 'cookie';
// For client-side cookies
import Cookies from 'js-cookie';

export function setVisitsCookieClientSide(newVisits) {
  Cookies.set('visits', newVisits);
}

export function serializeSecureCookieServerSide(
  name,
  value,
  maxAge = 60 * 60 * 24, // 24 hours
) {
  // Detect whether we're in a production environment
  // eg. Heroku
  const isProduction = process.env.NODE_ENV === 'production';

  return cookie.serialize(name, value, {
    // maxAge: maxAge,
    maxAge,

    expires: new Date(Date.now() + maxAge * 1000),

    // Important for security
    // Deny cookie access from frontend JavaScript
    httpOnly: true,

    // Important for security
    // Set secure cookies on production
    secure: isProduction,

    path: '/',

    // https://web.dev/samesite-cookies-explained/
    sameSite: 'lax',
  });
}

export function serializeEmptyCookieServerSide(name) {
  return cookie.serialize(name, '', {
    maxAge: -1,
    path: '/',
  });
}
