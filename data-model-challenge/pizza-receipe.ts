import { Allergens } from "./alergens.enum";
import { BasicData } from "./basic-data.model";
import { FoodType } from "./food-type.enum";
import { PizzaIngredient } from "./pizza-ingredient.model";

export class PizzaReceipe extends BasicData {
    name: string;
    ingredients: PizzaIngredient[];
    foodTypes: FoodType[];
    
    // constructor
    //setter & getters, depends on which ORM we are using, etc.
}