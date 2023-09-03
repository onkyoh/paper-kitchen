/// <reference types="cypress" />

import {
  ingredientGenerator,
  instructionsGenerator,
  tagGenerator,
  titleGenerator,
  userGenerator,
} from "../../src/test/data-generators";

describe("paperkitchen", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it("test auth", () => {
    const user = userGenerator();

    //registration

    cy.visit("http://127.0.0.1:5173/");

    cy.get("a").click();

    cy.get("input").eq(0).type(user.name);
    cy.get("input").eq(1).type(user.username);
    cy.get("input").eq(2).type(user.password);

    cy.get("button").click();

    //logout

    cy.url().should("eq", "http://127.0.0.1:5173/recipes");

    cy.get('button[aria-label="open options main"]').click();

    cy.contains("li", /logout/i).click();

    cy.contains("button", /logout/i).click();

    //login

    cy.url().should("eq", "http://127.0.0.1:5173/auth/login");

    cy.get("input").eq(0).type(user.username);
    cy.get("input").eq(1).type(user.password);

    cy.get("button").click();

    cy.url().should("eq", "http://127.0.0.1:5173/recipes");
  });

  it("tests recipe functionality", () => {
    const user = userGenerator();
    const title = titleGenerator();

    cy.visit("http://127.0.0.1:5173/auth/register");

    cy.get("input").eq(0).type(user.name);
    cy.get("input").eq(1).type(user.username);
    cy.get("input").eq(2).type(user.password);

    cy.get("button").click();

    cy.url().should("eq", "http://127.0.0.1:5173/recipes");

    //create new

    cy.get('button[aria-label="create new"]').click();

    cy.get("input").type(title);
    cy.get("li").eq(3).click();

    cy.get('button[aria-label="submit create card"]').click();

    cy.checkAndDismissNotification();

    cy.get("li").contains("p", title).click();

    //add updates

    cy.get('button[aria-label="edit mode"]').click();

    const updatedRecipe = {
      title: titleGenerator(),
      ingredient: ingredientGenerator(),
      instruction: instructionsGenerator(),
      cost: tagGenerator(),
    };

    cy.get(`input[value="${title}"]`).clear().type(updatedRecipe.title);
    cy.get('input[name="cost"]').type(updatedRecipe.cost.toString());
    cy.get('input[name="amount"]').type(
      updatedRecipe.ingredient.amount.toString()
    );
    cy.get('input[name="unit"]').type(updatedRecipe.ingredient.unit.toString());
    cy.get('input[name="name"]').type(updatedRecipe.ingredient.name);
    cy.get('button[aria-label="add ingredient"]').click();
    cy.get('input[name="new instruction"]').type(updatedRecipe.instruction);
    cy.get('button[aria-label="add instruction"]').click();

    cy.get('button[aria-label="save changes"]').click();

    cy.checkAndDismissNotification();

    //remove updates

    cy.get('button[aria-label="edit mode"]').click();

    cy.get('button[aria-label="delete instruction"]').click();

    cy.get('button[aria-label="save changes"]').click();

    cy.checkAndDismissNotification();

    //filter recipe

    cy.get('button[aria-label="back"]').click();

    cy.get('button[aria-label="open options main"]').click();

    cy.contains("li", /filter/i).click();

    cy.get('input[aria-label="ingredient filter input"]').type(
      updatedRecipe.ingredient.name
    );

    cy.get('button[aria-label="add ingredient filter"]').click();

    cy.get('button[aria-label="submit filtered search"]').click();

    cy.get("li").contains("p", updatedRecipe.title).click();

    //delete recipe

    cy.get('button[aria-label="open options page"]').click();

    cy.contains("li", /delete/i).click();

    cy.get('input[aria-label="delete input"]').type(updatedRecipe.title);

    cy.get('button[aria-label="submit delete"]').click();

    cy.url().should("eq", "http://127.0.0.1:5173/recipes");

    cy.checkAndDismissNotification();

    cy.contains("p", updatedRecipe.title).should("not.exist");
  });

  it("tests share link functionaliy", () => {
    const user = userGenerator();
    const joiner = userGenerator();
    const title = titleGenerator();

    cy.visit("http://127.0.0.1:5173/auth/register");

    cy.get("input").eq(0).type(user.name);
    cy.get("input").eq(1).type(user.username);
    cy.get("input").eq(2).type(user.password);

    cy.get("button").click();

    cy.url().should("eq", "http://127.0.0.1:5173/recipes");

    cy.get('button[aria-label="create new"]').click();

    cy.get("input").type(title);
    cy.get("li").eq(3).click();

    cy.get('button[aria-label="submit create card"]').click();

    cy.checkAndDismissNotification();

    cy.get("li").contains("p", title).click();

    cy.get('button[aria-label="get share link"]').click();

    cy.wait(2000);

    cy.get('button[aria-label="copy link"]').click();

    cy.window().then((win) => {
      win.navigator.clipboard.readText().then((text) => {
        expect(text).to.exist;
      });
    });
  });
});
