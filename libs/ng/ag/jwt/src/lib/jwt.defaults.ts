import { JwtCfg } from './jwt.models';

/** Default configuration - JWT module */
export const DefaultJwtCfg: JwtCfg = {
  // http request/response overhead - default of 1 second. frontend specific
  networkDelay: 1,
  // few seconds to make the randomizer work. backend can overwrite
  expiryLeeway: 5,
  // a week without asking the user to re-authenticate
  maxExpiry: 7
};
