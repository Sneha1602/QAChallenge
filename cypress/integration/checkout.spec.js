/// <reference types="cypress" />

describe("Kinexon QA Challenge", () => {
  let userDetails;
  beforeEach(() => {
    cy.fixture("userData").then((user) => {
      userDetails = user;
    });
    cy.visit("http://localhost:4200/");
  });

  it("Add one product to cart and delete it", () => {
    //Esnure the page is loaded with 4 cards
    cy.get('[data-cy="addToCartButton"]').should("have.length", 4);

    //Click on the first product to be added to cart
    cy.get('[data-cy="addToCartButton"]').first().click();

    //Ensure that the remove button is displayed
    cy.get('[data-cy="removeFromCartButton"]').should("have.length", 1);

    //Proceed to checkout
    cy.get('[aria-label="Checkout"]').click();

    //Ensure product is added to the table
    cy.get(".mat-table").find("tr").should("have.length", 3);

    //Remove from cart
    cy.contains("remove_shopping_cart").click();

    //Ensure product is removed
    cy.get(".mat-table").find("tr").should("have.length", 2);
  });

  it("Add two products and complete checkout", () => {
    //Ensure the page is loaded with 4 cards
    cy.get('[data-cy="addToCartButton"]').should("have.length", 4);

    //Click on the first product to be added to cart
    cy.get('[data-cy="addToCartButton"]').first().click();

    //Click on second product to be added to cart
    cy.get('[data-cy="addToCartButton"]').eq(1).click();

    //Ensure that the remove buttons are displayed
    cy.get('[data-cy="removeFromCartButton"]').should("have.length", 2);

    //Proceed to cart--> bug regarding naming mentioned in the bug report
    cy.get('[aria-label="Checkout"]').click();

    //Ensure product is added to the table
    cy.get(".mat-table").find("tr").should("have.length", 4);

    // Proceed to checkout
    cy.contains("Continue to checkout").click();

    //Enter user details
    cy.get('[data-cy="name"]').type(userDetails.name);
    cy.get('[data-cy="address"]').type(userDetails.address);
    cy.contains("Next").click();
    cy.get('[data-cy="nameOnCard"]').type(userDetails.name);
    cy.get('[data-cy="creditCardNumber"]').type(userDetails.creditCardNumber);

    //This button seems to be flaky so had to force a click
    cy.contains("Next").click({ force: true });

    //Verify details are displayed correctly on checkout
    cy.verifyDetailsOnCheckout(userDetails);
    cy.contains("Order").click();

    cy.get('[data-cy="successMessage"]').should("be.visible");
  });
});
