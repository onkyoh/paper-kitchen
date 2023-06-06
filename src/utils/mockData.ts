import { IGroceryList, IRecipe } from "../types";

export const groceriesData: IGroceryList[] = [
  {
    id: 1,
    ownerId: 1,
    title: "DAB",
    ingredients: [
      {
        id: "a1b2c3d4-e567-890a-b1c2-d3e4f567890a",
        name: "Milk",
        amount: "1",
        unit: "gallon",
      },
      {
        id: "b2c3d4e5-6789-0a1b-c2d3-e4f567890a1",
        name: "Eggs",
        amount: "1",
        unit: "dozen",
      },
      {
        id: "c3d4e567-890a-1b2c-d3e4-f567890a1b2",
        name: "Butter",
        amount: "2",
        unit: "sticks",
      },
      {
        id: "d4e56789-0a1b-2c3d-e4f5-67890a1b2c3",
        name: "Bread",
        amount: "1",
        unit: "loaf",
      },
      {
        id: "e567890a-1b2c-3d4e-f567-890a1b2c3d4",
        name: "Cheese",
        amount: "1",
        unit: "block",
      },
    ],
    color: "bg-purple-400",
    type: "grocery",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    ownerId: 1,
    title: "Amy and Me",
    ingredients: [
      {
        id: "f567890a-1b2c-3d4e-f567-890a1b2c3d4",
        name: "Apples",
        amount: "4",
        unit: null,
      },
      {
        id: "g567890a-1b2c-3d4e-f567-890a1b2c3d4",
        name: "Oranges",
        amount: "6",
        unit: null,
      },
      {
        id: "h567890a-1b2c-3d4e-f567-890a1b2c3d4",
        name: "Spinach",
        amount: "1",
        unit: "bunch",
      },
      {
        id: "i567890a-1b2c-3d4e-f567-890a1b2c3d4",
        name: "Chicken",
        amount: "2",
        unit: "breasts",
      },
      {
        id: "j567890a-1b2c-3d4e-f567-890a1b2c3d4",
        name: "Rice",
        amount: "1",
        unit: "cup",
      },
    ],
    color: "bg-pink-400",
    type: "grocery",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const recipeData: IRecipe[] = [
  {
    id: 1,
    ownerId: 1,
    title: "Creamy Chicken Alfredo",
    serves: 4,
    cookingTime: 30,
    cost: 15,
    favourite: true,
    type: "recipe",
    instructions: [
      {
        id: "d6935b74-a663-4850-b23e-594202649000",
        text: "Cook the pasta according to package instructions",
      },
      {
        id: "b8358374-8235-4454-b33e-412202649000",
        text: "In a separate pan, cook the chicken until golden brown",
      },
      {
        id: "74539374-3673-4850-b33e-542202649000",
        text: "Prepare the Alfredo sauce by mixing cream, butter, and Parmesan cheese",
      },
      {
        id: "54329374-2367-4850-b33e-422202649000",
        text: "Combine the cooked pasta, chicken, and sauce",
      },
      {
        id: "3219374-1236-4850-b33e-222202649000",
        text: "Serve hot and enjoy!",
      },
    ],
    ingredients: [
      {
        id: "a1b2c3d4-e567-890a-b1c2-d3e4f567890a",
        name: "Chicken",
        amount: "2",
        unit: "breasts",
      },
      {
        id: "b2c3d4e5-6789-0a1b-c2d3-e4f567890a1",
        name: "Pasta",
        amount: "8",
        unit: "oz",
      },
      {
        id: "c3d4e567-890a-1b2c-d3e4-f567890a1b2",
        name: "Cream",
        amount: "1",
        unit: "cup",
      },
      {
        id: "d4e56789-0a1b-2c3d-e4f5-67890a1b2c3",
        name: "Butter",
        amount: "2",
        unit: "tbsp",
      },
      {
        id: "e567890a-1b2c-3d4e-f567-890a1b2c3d4",
        name: "Parmesan cheese",
        amount: "0.5",
        unit: "cup",
      },
    ],
    color: "bg-red-400",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    ownerId: 2,
    title: "Spicy Shrimp Tacos",
    serves: 2,
    cookingTime: 20,
    cost: 12,
    favourite: false,
    type: "recipe",
    instructions: [
      {
        id: "d6935b74-a663-4850-b23e-594202649000",
        text: "Preheat the grill or a skillet over medium-high heat",
      },
      {
        id: "b8358374-8235-4454-b33e-412202649000",
        text: "In a bowl, combine shrimp, olive oil, lime juice, chili powder, cumin, garlic powder, salt, and pepper. Toss to coat the shrimp evenly",
      },
      {
        id: "74539374-3673-4850-b33e-542202649000",
        text: "Grill the shrimp for 2-3 minutes on each side, until opaque and cooked through",
      },
      {
        id: "54329374-2367-4850-b33e-422202649000",
        text: "Warm the tortillas on the grill or in a dry skillet for about 30 seconds on each side",
      },
      {
        id: "3219374-1236-4850-b33e-222202649000",
        text: "Assemble the tacos by placing shrimp, avocado slices, shredded cabbage, and chopped cilantro on each tortilla",
      },
      {
        id: "9374-1236-4850-b33e-222202649000",
        text: "Serve hot with lime wedges and your favorite salsa or hot sauce",
      },
    ],
    ingredients: [
      {
        id: "a1b2c3d4-e567-890a-b1c2-d3e4f567890a",
        name: "Shrimp",
        amount: "1/2",
        unit: "pound",
      },
      {
        id: "b2c3d4e5-6789-0a1b-c2d3-e4f567890a1",
        name: "Olive oil",
        amount: "2",
        unit: "tbsp",
      },
      {
        id: "c3d4e567-890a-1b2c-d3e4-f567890a1b2",
        name: "Lime juice",
        amount: "2",
        unit: "tbsp",
      },
      {
        id: "d4e56789-0a1b-2c3d-e4f5-67890a1b2c3",
        name: "Chili powder",
        amount: "1",
        unit: "tsp",
      },
      {
        id: "e567890a-1b2c-3d4e-f567-890a1b2c3d4",
        name: "Cumin",
        amount: "1",
        unit: "tsp",
      },
      {
        id: "f567890a-1b2c-3d4e-f567-890a1b2c3d4",
        name: "Garlic powder",
        amount: "1/2",
        unit: "tsp",
      },
      {
        id: "g567890a-1b2c-3d4e-f567-890a1b2c3d4",
        name: "Salt",
        amount: "1/2",
        unit: "tsp",
      },
      {
        id: "h567890a-1b2c-3d4e-f567-890a1b2c3d4",
        name: "Black pepper",
        amount: "1/4",
        unit: "tsp",
      },
      {
        id: "i567890a-1b2c-3d4e-f567-890a1b2c3d4",
        name: "Tortillas",
        amount: "4",
        unit: "small",
      },
      {
        id: "j567890a-1b2c-3d4e-f567-890a1b2c3d4",
        name: "Avocado",
        amount: "1",
        unit: "large",
      },
      {
        id: "k567890a-1b2c-3d4e-f567-890a1b2c3d4",
        name: "Shredded cabbage",
        amount: "1/2",
        unit: "cup",
      },
      {
        id: "l567890a-1b2c-3d4e-f567-890a1b2c3d4",
        name: "Cilantro",
        amount: "2",
        unit: "tbsp",
      },
    ],
    color: "bg-blue-400",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    ownerId: 1,
    title: "Vegetarian Quinoa Salad",
    serves: 6,
    cookingTime: null,
    cost: 10,
    favourite: true,
    type: "recipe",
    instructions: [
      {
        id: "d6935b74-a663-4850-b23e-594202649000",
        text: "Cook the quinoa according to package instructions and let it cool",
      },
      {
        id: "b8358374-8235-4454-b33e-412202649000",
        text: "In a large bowl, combine the cooked quinoa, chopped vegetables, and herbs",
      },
      {
        id: "74539374-3673-4850-b33e-542202649000",
        text: "In a small bowl, whisk together the olive oil, lemon juice, salt, and pepper to make the dressing",
      },
      {
        id: "54329374-2367-4850-b33e-422202649000",
        text: "Pour the dressing over the quinoa mixture and toss well to combine",
      },
      {
        id: "3219374-1236-4850-b33e-222202649000",
        text: "Refrigerate the salad for at least 1 hour before serving to allow the flavors to blend",
      },
      {
        id: "9374-1236-4850-b33e-222202649000",
        text: "Serve chilled and enjoy!",
      },
    ],
    ingredients: [
      {
        id: "a1b2c3d4-e567-890a-b1c2-d3e4f567890a",
        name: "Quinoa",
        amount: "1",
        unit: "cup",
      },
      {
        id: "b2c3d4e5-6789-0a1b-c2d3-e4f567890a1",
        name: "Cucumber",
        amount: "1",
        unit: "medium",
      },
      {
        id: "c3d4e567-890a-1b2c-d3e4-f567890a1b2",
        name: "Cherry tomatoes",
        amount: "1",
        unit: "cup",
      },
      {
        id: "d4e56789-0a1b-2c3d-e4f5-67890a1b2c3",
        name: "Red onion",
        amount: "1/4",
        unit: "cup",
      },
      {
        id: "e567890a-1b2c-3d4e-f567-890a1b2c3d4",
        name: "Fresh parsley",
        amount: "1/4",
        unit: "cup",
      },
      {
        id: "f567890a-1b2c-3d4e-f567-890a1b2c3d4",
        name: "Fresh mint",
        amount: "1/4",
        unit: "cup",
      },
      {
        id: "g567890a-1b2c-3d4e-f567-890a1b2c3d4",
        name: "Olive oil",
        amount: null,
        unit: null,
      },
      {
        id: "h567890a-1b2c-3d4e-f567-890a1b2c3d4",
        name: "Lemon juice",
        amount: null,
        unit: null,
      },
      {
        id: "i567890a-1b2c-3d4e-f567-890a1b2c3d4",
        name: "Salt",
        amount: null,
        unit: null,
      },
      {
        id: "j567890a-1b2c-3d4e-f567-890a1b2c3d4",
        name: "Black pepper",
        amount: null,
        unit: null,
      },
    ],
    color: "bg-green-400",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    ownerId: 1,
    title: "Banana Bread",
    serves: 8,
    cookingTime: 60,
    cost: 8,
    favourite: true,
    type: "recipe",
    instructions: [
      {
        id: "d6935b74-a663-4850-b23e-594202649000",
        text: "Preheat the oven to 350°F (175°C) and grease a loaf pan",
      },
      {
        id: "b8358374-8235-4454-b33e-412202649000",
        text: "In a large mixing bowl, cream together the butter and sugar until light and fluffy",
      },
      {
        id: "74539374-3673-4850-b33e-542202649000",
        text: "Add the eggs one at a time, beating well after each addition",
      },
      {
        id: "54329374-2367-4850-b33e-422202649000",
        text: "In a separate bowl, mash the bananas with a fork or potato masher until smooth",
      },
      {
        id: "3219374-1236-4850-b33e-222202649000",
        text: "Add the mashed bananas and vanilla extract to the butter mixture, and mix until well combined",
      },
      {
        id: "9374-1236-4850-b33e-222202649000",
        text: "In another bowl, whisk together the flour, baking soda, and salt",
      },
      {
        id: "8374-1236-4850-b33e-222202649000",
        text: "Gradually add the dry ingredients to the wet ingredients, mixing until just combined",
      },
      {
        id: "9284-1236-4850-b33e-222202649000",
        text: "Pour the batter into the greased loaf pan and smooth the top with a spatula",
      },
      {
        id: "0293-1236-4850-b33e-222202649000",
        text: "Bake for 50-60 minutes, or until a toothpick inserted into the center comes out clean",
      },
      {
        id: "9373-1236-4850-b33e-222202649000",
        text: "Remove from the oven and let the banana bread cool in the pan for 10 minutes",
      },
      {
        id: "8373-1236-4850-b33e-222202649000",
        text: "Transfer the bread to a wire rack to cool completely before slicing and serving",
      },
    ],
    ingredients: [
      {
        id: "a1b2c3d4-e567-890a-b1c2-d3e4f567890a",
        name: "Butter",
        amount: "1/2",
        unit: "cup",
      },
      {
        id: "b2c3d4e5-6789-0a1b-c2d3-e4f567890a1",
        name: "Granulated sugar",
        amount: "1",
        unit: "cup",
      },
      {
        id: "c3d4e567-890a-1b2c-d3e4-f567890a1b2",
        name: "Eggs",
        amount: "2",
        unit: null,
      },
      {
        id: "d4e56789-0a1b-2c3d-e4f5-67890a1b2c3",
        name: "Ripe bananas",
        amount: "3",
        unit: null,
      },
      {
        id: "e567890a-1b2c-3d4e-f567-890a1b2c3d4",
        name: "Vanilla extract",
        amount: "1",
        unit: "tsp",
      },
      {
        id: "f567890a-1b2c-3d4e-f567-890a1b2c3d4",
        name: "All-purpose flour",
        amount: "2",
        unit: "cups",
      },
      {
        id: "g567890a-1b2c-3d4e-f567-890a1b2c3d4",
        name: "Baking soda",
        amount: "1",
        unit: "tsp",
      },
      {
        id: "h567890a-1b2c-3d4e-f567-890a1b2c3d4",
        name: "Salt",
        amount: "1/2",
        unit: "tsp",
      },
    ],
    color: "bg-yellow-400",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    ownerId: 1,
    title: "Caprese Salad",
    serves: 4,
    cookingTime: 15,
    cost: 12,
    favourite: true,
    type: "recipe",
    instructions: [
      {
        id: "d6935b74-a663-4850-b23e-594202649000",
        text: "Slice the tomatoes and mozzarella cheese into rounds",
      },
      {
        id: "b8358374-8235-4454-b33e-412202649000",
        text: "Arrange the tomato and mozzarella slices alternately on a platter",
      },
      {
        id: "74539374-3673-4850-b33e-542202649000",
        text: "Tuck the fresh basil leaves in between the tomato and mozzarella slices",
      },
      {
        id: "54329374-2367-4850-b33e-422202649000",
        text: "Drizzle with extra-virgin olive oil and balsamic glaze",
      },
      {
        id: "3219374-1236-4850-b33e-222202649000",
        text: "Season with salt and pepper to taste",
      },
      {
        id: "9374-1236-4850-b33e-222202649000",
        text: "Serve immediately and enjoy!",
      },
    ],
    ingredients: [
      {
        id: "a1b2c3d4-e567-890a-b1c2-d3e4f567890a",
        name: "Tomatoes",
        amount: "4",
        unit: null,
      },
      {
        id: "b2c3d4e5-6789-0a1b-c2d3-e4f567890a1",
        name: "Fresh mozzarella cheese",
        amount: "8",
        unit: "oz",
      },
      {
        id: "c3d4e567-890a-1b2c-d3e4-f567890a1b2",
        name: "Fresh basil leaves",
        amount: "1/2",
        unit: "cup",
      },
      {
        id: "d4e56789-0a1b-2c3d-e4f5-67890a1b2c3",
        name: "Extra-virgin olive oil",
        amount: null,
        unit: null,
      },
      {
        id: "e567890a-1b2c-3d4e-f567-890a1b2c3d4",
        name: "Balsamic glaze",
        amount: null,
        unit: null,
      },
      {
        id: "f567890a-1b2c-3d4e-f567-890a1b2c3d4",
        name: "Salt",
        amount: null,
        unit: null,
      },
      {
        id: "g567890a-1b2c-3d4e-f567-890a1b2c3d4",
        name: "Black pepper",
        amount: null,
        unit: null,
      },
    ],
    color: "bg-blue-400",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
