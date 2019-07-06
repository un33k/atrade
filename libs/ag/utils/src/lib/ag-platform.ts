import { isDefined } from './ag-types';

/** Electron - window (chrome) */
declare var window;

/** Andriod - Java */
declare var java, android;

/** iOS - NSObject & NSString */
declare var NSObject, NSString;

/** Returns true if running on a browser */
export function isBrowser() {
  return isDefined(window) && window.process && window.process.type;
}

/** Returns true if running on Chrome via Electron */
export function isElectron() {
  return isBrowser();
}

/** Returns true if running on native iOS app */
export function isIOS() {
  return isDefined(NSString) && isDefined(NSObject);
}

/** Returns true if running on native Andriod app */
export function isAndriod() {
  return isDefined(java) && isDefined(android);
}

/** Returns true if running on native iOS or andriod app */
export function isNativeScript() {
  return isAndriod() || isIOS();
}
