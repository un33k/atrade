import { BaseLogger } from './ag-logger';

class Logger extends BaseLogger {}

describe('Agnostic Base - BaseLogger', function() {
  let logger;

  beforeEach(() => {
    logger = new Logger();
  });

  it('should create', () => {
    expect(logger).toBeDefined();
  });

  it('should not detect IE', () => {
    expect(logger.platformIsIE).toBe(false);
  });

  it('should not log anything at log level of none (default)', () => {
    const logSpy = jest.spyOn(console, 'log');
    logger.log('Testing');
    expect(logSpy).not.toHaveBeenCalled();
  });

  it('should invoke log when logger.info is called', () => {
    const logSpy = jest.spyOn(logger, 'log');
    logger.info('Testing');
    expect(logSpy).toHaveBeenCalled();
  });

  it('should invoke log when logger.warn is called', () => {
    const logSpy = jest.spyOn(logger, 'log');
    logger.info('Testing');
    expect(logSpy).toHaveBeenCalled();
  });
});
