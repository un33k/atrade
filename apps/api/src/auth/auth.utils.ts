import * as jwt from 'jsonwebtoken';

import { AUTH_JWT_SESSION_TOKEN_EXPIRY, AUTH_JWT_ACCESS_TOKEN_EXPIRY } from './auth.constants';
import { AuthTokenPayload } from './auth.types';
import { UserEntity } from '../user/user.entity';
import { environment } from '../environments/environment';

/**
 *
 * @param payload Payload to be included in token
 * @param seekret Private seekret string - changing the secret invalidates all outstanding tokens
 * @param expiresIn Expriry string (e.g 14d, 2w, 1m, 15m, 1s)
 */
export const makeToken = (payload: AuthTokenPayload, seekret: string, expiresIn: string): string => {
  return jwt.sign(payload, seekret, { expiresIn });
};

/**
 * Given a user object, it returns a session token
 * @param user User entity object
 */
export const makeSessionToken = (user: UserEntity): string => {
  return makeToken(
    { userId: user.id, sessionId: user.sessionId.toString() },
    environment.seekret,
    AUTH_JWT_SESSION_TOKEN_EXPIRY
  );
};

/**
 * Given a user object, it returns an access token
 * @param user User entity object
 */
export const makeAccessToken = (user: UserEntity): string => {
  return makeToken(
    { userId: user.id, sessionId: user.sessionId.toString() },
    environment.seekret,
    AUTH_JWT_ACCESS_TOKEN_EXPIRY
  );
};
