import { data } from "./data/export";

export interface Rate {
    amount: number;
    name: string;
    type: "item" | "fluid" | "capsule" | "tool";
    probability?: number;
    catalyst_amount?: number;
    fluidbox_index?: number;
    maximum_temperature?: number;
    minimum_temperature?: number;
    temperature?: number;
}

export interface Recipe {
    name: string;
    category: string;
    energy: number;
    ingredients?: Rate[];
    products?: Rate[];
}

const makeIndices = () => {
    const ingredientIndex: Record<string, string[]> = {};
    const productIndex: Record<string, string[]> = {};

    Object.values(data.recipes).forEach((recipe) => {
        recipe.ingredients?.forEach((ingredient) => {
            ingredientIndex[ingredient.name] = [
                ...(ingredientIndex[ingredient.name] || []),
                recipe.name,
            ];
        });
        recipe.products?.forEach((product) => {
            productIndex[product.name] = [
                ...(productIndex[product.name] || []),
                recipe.name,
            ];
        });
    });

    return {
        recipeIndex: data.recipes,
        ingredientIndex,
        productIndex,
    };
};

export const {
    recipeIndex: RecipeIndex,
    ingredientIndex: IngredientIndex,
    productIndex: ProductIndex,
} = makeIndices();
