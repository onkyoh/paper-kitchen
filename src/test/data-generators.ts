import { faker } from "@faker-js/faker";

export const userGenerator = () => ({
  name: faker.internet.displayName(),
  email: faker.internet.email(),
  username: faker.string.alphanumeric(15),
  password: faker.internet.password(),
});

export const titleGenerator = () => faker.string.alphanumeric(15);

export const ingredientGenerator = () => ({
  name: faker.animal.fish(),
  amount: faker.number.int(),
  unit: faker.string.alphanumeric(4),
});

export const instructionsGenerator = () => faker.lorem.sentence();

export const tagGenerator = () =>
  faker.number.int({
    min: 5,
    max: 30,
  });
