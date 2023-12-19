/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

declare namespace Cypress {
  interface Chainable {
    checkAndDismissNotification(): Chainable<void>;
  }
}

// cypress/support/commands.js

Cypress.Commands.add("checkAndDismissNotification", () => {
  // Wait for the notification to appear
  cy.get('[aria-label="notification"]').should("be.visible");

  // Check for successful notification (green background)
  cy.get('[aria-label="notification"]').should("have.class", "bg-green-400");

  // Click the button to dismiss the notification
  cy.get('[aria-label="dismiss notification"]').click();

  // Wait for the notification to disappear after dismissal
  cy.get('[aria-label="notification"]').should("not.exist");
});
