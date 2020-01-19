describe("Homepage", () => {
  it("Visits the app root and checking for correct rendering", () => {
    cy.visit("http://localhost:8081");
    cy.expect("h1").to.exist;
    cy.get("h1").should("not.be.empty");
    // cy.wait(3000);
    cy.expect('[data-cy="image"]').to.exist;
    cy.get('[data-cy="image"]').should("not.be.empty");
  });
});
