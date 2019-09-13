import { getGreeting } from '../support/app.po';

describe('marbles-testing-jasmine', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to marbles-testing-jasmine!');
  });
});
