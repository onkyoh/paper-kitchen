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

    cy.contains("a", /Need an account?/i).click();

    cy.get("input").eq(0).type(user.name);
    cy.get("input").eq(1).type(user.email);
    cy.get("input").eq(2).type(user.username);
    cy.get("input").eq(3).type(user.password);

    cy.get("button").click();

    //logout

    cy.url().should("eq", "http://127.0.0.1:5173/recipes");

    cy.get('a[aria-label="to settings"]').click();

    cy.url().should("eq", "http://127.0.0.1:5173/settings/information");

    cy.contains("button", /logout/i).click();

    cy.contains("button", /confirm/i).click();

    //forgot password

    cy.url().should("eq", "http://127.0.0.1:5173/auth/login");

    cy.contains("a", /Forgot your password?/i).click();

    cy.url().should("eq", "http://127.0.0.1:5173/auth/forgot-password");

    cy.get("input").eq(0).type("adnanradwan_8@hotmail.com");

    cy.get("button").click();

    cy.contains(
      "div",
      "A reset link has been sent to the provided email. If you cannot find it check your junk/spam folders and make sure the email you entered was correct."
    ).should("exist");

    //login
    cy.visit("http://127.0.0.1:5173/");

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
    cy.get("input").eq(1).type(user.email);
    cy.get("input").eq(2).type(user.username);
    cy.get("input").eq(3).type(user.password);

    cy.get("button").click();

    cy.url().should("eq", "http://127.0.0.1:5173/recipes");

    //create new

    cy.get('button[aria-label="create new"]').click();

    cy.get("input").type(title);
    cy.get('li[aria-label="bg-red-400"]').click();

    cy.get('button[aria-label="submit create card"]').click();

    cy.checkAndDismissNotification();

    cy.get("a").contains("p", title).click();

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

    cy.get('button[aria-label="open filter"]').eq(0).click();

    cy.get('input[aria-label="ingredient filter input"]').type(
      updatedRecipe.ingredient.name
    );

    cy.get('button[aria-label="add ingredient filter"]').click();

    cy.get('button[aria-label="submit filtered search"]').click();

    cy.get("a").contains("p", updatedRecipe.title).click();

    //delete recipe

    cy.get('button[aria-label="open options page"]').click();

    cy.contains("li", /delete/i).click();

    cy.get('input[aria-label="delete input"]').type(updatedRecipe.title);

    cy.get('button[aria-label="submit delete"]').click();

    cy.url().should("eq", "http://127.0.0.1:5173/recipes");

    cy.checkAndDismissNotification();

    cy.contains("a", updatedRecipe.title).should("not.exist");

    //clear ingredients
    cy.contains("a", /Groceries/i).click();

    cy.get('button[aria-label="create new"]').eq(0).click();

    cy.get("input").type(title);
    cy.get('li[aria-label="bg-red-400"]').click();

    cy.get('button[aria-label="submit create card"]').click();

    cy.checkAndDismissNotification();

    cy.get("a").contains("p", title).click();

    cy.get('button[aria-label="edit mode"]').click();

    const ingredients = [
      ingredientGenerator(),
      ingredientGenerator(),
      ingredientGenerator(),
    ];

    for (let i = 0; i < ingredients.length; i++) {
      cy.get('input[name="name"]').last().type(ingredients[i].name);
      cy.get('button[aria-label="add ingredient"]').click();
    }

    cy.get('button[aria-label="save changes"]').click();

    cy.contains("p", ingredients[0].name).click();
    cy.contains("p", ingredients[2].name).click();

    cy.get('button[aria-label="remove selected ingredients"]').click();

    cy.contains("p", ingredients[0].name).should("not.exist");
    cy.contains("p", ingredients[1].name).should("exist");
    cy.contains("p", ingredients[2].name).should("not.exist");
  });

  it("tests share link functionaliy", () => {
    const user = userGenerator();
    const title = titleGenerator();

    cy.visit("http://127.0.0.1:5173/auth/register");

    cy.get("input").eq(0).type(user.name);
    cy.get("input").eq(1).type(user.email);
    cy.get("input").eq(2).type(user.username);
    cy.get("input").eq(3).type(user.password);

    cy.get("button").click();

    cy.url().should("eq", "http://127.0.0.1:5173/recipes");

    cy.get('button[aria-label="create new"]').click();

    cy.get("input").type(title);
    cy.get('li[aria-label="bg-red-400"]').click();

    cy.get('button[aria-label="submit create card"]').click();

    cy.checkAndDismissNotification();

    cy.get("a").contains("p", title).click();

    cy.intercept("POST", "http://localhost:5000/api/recipes/*/permissions").as(
      "shareLinkRequest"
    );

    cy.get('button[aria-label="get share link"]').click();

    //get share link and visit

    cy.wait("@shareLinkRequest").then(({ response }) => {
      if (!response) return;
      const url = response.body;

      cy.clearLocalStorage();

      cy.visit(`http://127.0.0.1:5173/join/${url}`);

      cy.contains("h3", title).should("exist");
      cy.contains("a", /login to join/i).should("exist");
    });
  });

  it("test settings functionality", () => {
    // change email
    const user = userGenerator();
    const newUser = userGenerator();

    cy.visit("http://127.0.0.1:5173/auth/register");

    cy.get("input").eq(0).type(user.name);
    cy.get("input").eq(1).type(user.email);
    cy.get("input").eq(2).type(user.username);
    cy.get("input").eq(3).type(user.password);

    cy.get("button").click();

    cy.url().should("eq", "http://127.0.0.1:5173/recipes");

    cy.get('a[aria-label="to settings"]').click();

    cy.url().should("eq", "http://127.0.0.1:5173/settings/information");

    cy.contains("p", `Email sent to: ${user.email}`);

    cy.contains("button", /resend/i).click();

    cy.checkAndDismissNotification();

    cy.contains("button", /change/i).click();

    cy.get("input").type(newUser.email);

    cy.contains("button", "+").click();

    cy.checkAndDismissNotification();

    cy.contains("p", `Email sent to: ${newUser.email}`);

    //change preferences

    cy.contains("a", /preferences/i).click();

    cy.url().should("eq", "http://127.0.0.1:5173/settings/preferences");

    cy.get("body").should("have.css", "color", "rgb(0, 0, 0)");

    cy.contains("label", "Dark").click();

    cy.get("body").should("have.css", "color", "rgb(255, 255, 255)");
  });
});
