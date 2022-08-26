import { Allergens } from "./alergens.enum";
import { FoodType } from "./food-type.enum";
import { PizzaIngredientName } from "./pizza-ingredient-name.enum";
import { PizzaIngredient } from "./pizza-ingredient.model";
import { PizzaReceipe } from "./pizza-receipe";
import { PizzaUtils } from "./pizza-utils";

const random = () => (Math.random() + 1).toString(36).substring(7);

// Declare dummy ingredients
const rise: PizzaIngredient = {
    id: random(),
    name: PizzaIngredientName.RICE,
    allergens: [],
    calories: 130
}

const potato: PizzaIngredient = {
    id: random(),
    name: PizzaIngredientName.POTATO,
    allergens: [],
    calories: 77
}

const tomato: PizzaIngredient = {
    id: random(),
    name: PizzaIngredientName.TOMATO,
    allergens: [Allergens.TOMATO],
    calories: 18
}

const salami: PizzaIngredient = {
    id: random(),
    name: PizzaIngredientName.SALAMI,
    allergens: [Allergens.MILK, Allergens.GLUTEN],
    calories: 336
}

//Declare dummy pizza recipies

const pizza1: PizzaReceipe = {
    id: random(),
    name: 'Pizza with allergens',
    ingredients: [rise, salami, tomato],
    foodTypes: [FoodType.WITHOUT_RESTRICTIONS]
};

const pizza2: PizzaReceipe = {
    id: random(),
    name: 'Pizza without allergens',
    ingredients: [rise, potato],
    foodTypes: [FoodType.VEGAN, FoodType.GLUTEN_FREE]
};

console.log("has allergens", PizzaUtils.hasAllergens(pizza1, [Allergens.TOMATO]));
console.log("hasn't allergens", !PizzaUtils.hasAllergens(pizza2, [Allergens.TOMATO, Allergens.GLUTEN]));
console.log("has food types", PizzaUtils.hasFoodTypes(pizza2, [FoodType.VEGAN, FoodType.GLUTEN_FREE]));
console.log("hasn't food type", !PizzaUtils.hasFoodTypes(pizza1, [FoodType.VEGAN, FoodType.GLUTEN_FREE]));
console.log("remove tomato allergen", PizzaUtils.removeAllergens(pizza1, [Allergens.TOMATO]));
console.log("remove vegan and gluten free food type", PizzaUtils.removeFoodTypes(pizza2, [FoodType.VEGAN, FoodType.GLUTEN_FREE]));
console.log("double ingredients", PizzaUtils.doubleIngredients(pizza1, [salami, rise]));
