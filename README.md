# PaperKitchen

Still using a REAL recipe book or writing your grocery lists on a piece of paper on the fridge? Well stop because it's 2023, and the future is now. PaperKitchen is the easiest (and prettiest) way to create, store, and share all of your recipes and grocery lists. Say goodbye to the days of using paper in your kitchen, from now on all you'll need is PaperKitchen.

Try it now here: [paperkitchen.ca](https://paperkitchen.ca).

## 21/12/2023 Update

During the holidays I decided to make some improvements to PaperKitchen. After a few weeks of brainstorming, developing, and testing I successfully implemented the following updates:

- **PWA:** By adding a service worker and utilizing TanStackQuery's `PersistedQueryClientProvider` PaperKitchen met the requirements to be a PWA. This means users can install PaperKitchen on their devices for a native feel, and more importantly the app has offline functionality.
- **Email:** I incorporated AWS Simple Email Service to allow users to attach emails to their account. This is mainly incase they forget their password and need to reset it (which I also enabled).
- **Settings:** There is now a settings tab, here users can see the personal information attached to their account and set some default preferences. The main benefits of this is handling email authentication and allowing users to toggle between light and dark mode.
- **Dedicated Card Routes:** Previously there was no `react-router` navigation for individual grocery lists and recipes. I decided to change this and add dedicated routes for individual resources. This means users can directly enter the url of a resource they wish to view directly.
- **Grocery List Clearing:** Initially grocery lists could be completely cleared with the click of the refresh button. This functionality was not the most useful implementation possible. Now when users are finished striking groceries they have collected they can click the button to clear the striked groceries and allow the uncollected ones to remain.

## Features

- Account creation, authentication, and subsequent authorization via JsonWebTokens added into authorization headers from local storage.
- Creation, updating, and deleting of all recipes and grocery lists.
- Filtering of recipes based on the following fields; ownership, favouriteness, cooking time, serving amount, cost, and even ingredients included.
- Recipes and grocery lists can also be shared with other users. Additionally, owners can change guests' editing permission and remove their access.

## Technologies

- Frontend constructed with React + Typescript.
- Backend RestAPI made with Express.js.
- PostgreSQL database with Prisma as ORM.
- React-Router for multi-page utility.
- TailwindCSS for styling.
- TanStack Query for API interactions and cache handling.
- Zustand for global state management.
- Vite for bundling and PWA functionality.
- Testing tools used include Jest, Supertest, React Testing Library, and Cypress for e2e tests.

## Preparation

As soon as I had the idea for this web app instead of immediately starting its construction I invested a lot of time and thought into system design and structure. [Here](https://www.notion.so/adnanradwan/Cooking-Webapp-564c3f285be64409ace1f72cfd20bfef?pvs=4) you can view my Notion notes where I laid out most of the major features and structure before I wrote a single line of code. Some things changed along the way and some features were scraped/added, but the groundwork allowed me to make more organized and efficient code.
