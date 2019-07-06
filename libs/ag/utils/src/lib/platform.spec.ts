import { isBrowser, isElectron, isIOS, isAndriod } from './platform';

describe('Agnostic Utils - Platform', function() {
  it('should return false as we are not running on a browser', function() {
    const platform = isBrowser();
    // expect(platform).toBe(undefined);
  });

  // it('should return false as we are not running on electron', function() {
  //   const platform = isElectron();
  //   expect(platform).toBe(undefined);
  // });

  // it('should return false as we are not running on iOS', function() {
  //   const platform = isIOS();
  //   expect(platform).toBe(undefined);
  // });

  // it('should return false as we are not running on Andriod', function() {
  //   const platform = isAndriod();
  //   expect(platform).toBe(undefined);
  // });
});
