export interface IRecipe { 
    id: number;
    ownerId: number;
    title: string;
    instructions: string[];
    ingredients: IIngredient[];
    serves?: number;
    cookingTime?: number;
    cost?: number;
    favourite: boolean;
    color: string;
    createdAt: Date;
    updatedAt: Date;
}
    
export interface IIngredient {
    name: string;
    amount: number | null;
    unit: string | null;
    }
    
export interface IGroceryList {
    id: number;
    ownerId: number;
    title: string;
    ingredients: IIngredient[];
    color: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUser {
    id: number,
    name: string
}