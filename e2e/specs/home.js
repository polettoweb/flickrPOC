describe("Homepage", () => {
  it("Visits the app root and checking for correct rendering", () => {
    cy.visit("http://localhost:8080");
    cy.expect("h1").to.exist;
    cy.get("h1").should("not.be.empty");
    cy.expect('[data-cy="image"]').to.exist;
    cy.get('[data-cy="image"]').should("not.be.empty");
    cy.wait(2000);

    //testing infinte scroll
    cy.scrollTo("bottom", { duration: 2000 });
    cy.expect(".gallery__container:last-child").to.exist;
    cy.wait(500);

    //testing infinite scroll a second time
    cy.scrollTo("bottom", { duration: 2000 });
    cy.expect(".gallery__container:last-child").to.exist;
  });
});
