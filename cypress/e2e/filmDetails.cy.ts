it('Can visit film details when navigating from the homepage', () => {
  cy.visit('http://localhost:5173');
  cy.get('article:first-child').find('a').click();
  cy.get('ul').find('li').should('have.length', 3);
});
