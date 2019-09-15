/** JWT config declaration */
export class JwtCfg {
  // http request round-trip in seconds
  networkDelay?: number;
  // refresh expired token up to leeway amount in seconds
  expiryLeeway?: number;
  // refresh initial token up to total number of days
  maxExpiry?: number;
}
