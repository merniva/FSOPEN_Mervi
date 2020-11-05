describe("Blog ", function() {
  beforeEach(function() {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "Saima",
      username: "testisaima",
      password: "testisaima"
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("Näytetään kirjautumislomake", function() {
    cy.contains("Kirjaudu");
  });

  describe("Kirjautuminen", function() {
    it("Kirjautuminen oikeilla tunnuksilla onnistuu", function() {
      cy.contains("Kirjaudu").click();
      cy.get("#username").type("testisaima");
      cy.get("#password").type("testisaima");
      cy.get("#loginBtn").click();

      cy.contains("Kirjautuneena sisään nimellä Saima");
    });

    it("Kirjautuminen väärillä tunnuksilla epäonnistuu", function() {
      cy.contains("Kirjaudu").click();
      cy.get("#username").type("testisaima");
      cy.get("#password").type("testisaima");
      cy.get("#loginBtn").click();

      cy.get(".errorMsg")
        .should("contain", "Virheellinen käyttäjätieto!")
        .and("have.css", "border-style", "solid");
    });
  });

  describe("Kirjautumisen jälkeen", function() {
    beforeEach(function() {
      cy.server();
      cy.contains("Kirjaudu").click();
      cy.get("#username").type("testisaima");
      cy.get("#password").type("testisaima");
      cy.get("#loginBtn").click();
      cy.contains("Lisää blogi").click();
      cy.get("#blogName").type("Testausblogi t. Cypress");
      cy.get("#blogAuthor").type("Teppo Tetsaa");
      cy.get("#blogUrl").type("teppo.net/cypresstest");
      cy.get("#addBtn").click();
    });

    it("Uuden blogin lisäys onnistuu", function() {
      cy.route("**/blogs").as("blogs");
      cy.wait("@blogs");
      cy.contains("Testausblogi");
      cy.contains("Lisää blogi").click();
      cy.get("#blogName").type("Hitsausblogi");
      cy.get("#blogAuthor").type("Teppo Hitsaa");
      cy.get("#blogUrl").type("teppo.net/hits");
      cy.get("#addBtn").click();
      cy.wait("@blogs");
      cy.contains("Hitsausblogi");
    });

    it("Blogin tykkäys onnistuu", function() {
      cy.route("**/blogs").as("likes");
      cy.wait("@likes");
      cy.contains("Testausblogi").parent().find("#showBtn").click();
      cy.get("#likes").contains("0");
      cy.get("#likeBtn").click();
      cy.wait("@likes");
      cy.get("#likes").contains("1");
    });

    it("Blogin poistaminen onnistuu", function() {
      cy.route("**/blogs").as("blogs");
      cy.contains("Lisää blogi").click();
      cy.get("#blogName").type("Hitsausblogi");
      cy.get("#blogAuthor").type("Teppo Hitsaa");
      cy.get("#blogUrl").type("teppo.net/hits");
      cy.get("#addBtn").click();
      cy.wait("@blogs");
      cy.contains("Hitsausblogi").parent().find("#showBtn").click();
      cy.get("#removeBtn").click();
      cy.wait("@blogs");
      cy.contains("Hitsausblogi").should("not.exist");
      cy.contains("Testausblogi").should("exist");
    });

    it("Blogien sorttaus onnistuu", function() {
      cy.route("**/blogs").as("blogs");
      cy.contains("Lisää blogi").click();
      cy.get("#blogName").type("Hitsausblogi");
      cy.get("#blogAuthor").type("Teppo Hitsaa");
      cy.get("#blogUrl").type("teppo.net/hits");
      cy.get("#addBtn").click();
      cy.wait("@blogs");
      cy.contains("Testausblogi").parent().find("#showBtn").click();
      cy.get("#likes").contains("0");
      cy.get("#likeBtn").click();
      cy.wait("@blogs");
      cy.contains("Hitsausblogi").parent().find("#showBtn").click();
      cy.get("[data-cy=likes1]").contains("Tykkäykset: 1");
      cy.get("[data-cy=likes0]").contains("Tykkäykset: 0");
    });

  });
});