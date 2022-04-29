Cypress.Commands.add("verifyDetailsOnCheckout", (userDetails) => {
  cy.get(".mat-list-item-content").should("have.length", 5);
  cy.get(".mat-list-item-content").eq(0).contains(userDetails.name);
  cy.get(".mat-list-item-content").eq(1).contains(userDetails.address);
  cy.get(".mat-list-item-content").eq(2).contains(userDetails.name);
  cy.get(".mat-list-item-content").eq(3).contains(userDetails.creditCardNumber);
});
