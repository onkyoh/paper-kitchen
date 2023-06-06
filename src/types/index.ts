export interface IRecipe {
  id: number;
  ownerId: number;
  title: string;
  instructions: IInstruction[];
  ingredients: IIngredient[];
  serves: number | null;
  cookingTime: number | null;
  cost: number | null;
  favourite: boolean;
  color: string;
  type: "recipe";
  createdAt: Date;
  updatedAt: Date;
}

export interface IInstruction {
  id: string;
  text: string;
}

export interface IIngredient {
  id: string;
  name: string;
  amount: string | null;
  unit: string | null;
}

export interface IGroceryList {
  id: number;
  ownerId: number;
  title: string;
  ingredients: IIngredient[];
  color: string;
  type: "grocery";
  createdAt: Date;
  updatedAt: Date;
}

export type TagField = "serves" | "cookingTime" | "cost" | "favourite";

export interface IUser {
  id: number;
  name: string;
}
