import { Allergens } from "./alergens.enum";
import { BasicData } from "./basic-data.model";
import { PizzaIngredientName } from "./pizza-ingredient-name.enum";

export class PizzaIngredient extends BasicData {
    name: PizzaIngredientName;
    allergens: Allergens[] = [];
    calories: number;
}