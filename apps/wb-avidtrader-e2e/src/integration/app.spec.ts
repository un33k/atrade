import { getGreeting } from '../support/app.po';

describe('avidtrader', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to avidtrader!');
  });
});
