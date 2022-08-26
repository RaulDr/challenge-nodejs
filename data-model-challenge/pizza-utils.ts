import { Allergens } from "./alergens.enum";
import { FoodType } from "./food-type.enum";
import { PizzaIngredient } from "./pizza-ingredient.model";
import { PizzaReceipe } from "./pizza-receipe";

// I would add this methods on the pizza entity class but it's fine also in a util class
export class PizzaUtils {
    public static hasAllergens(pizza: PizzaReceipe, allergens: Allergens []): boolean {
        return allergens.some(item => pizza.ingredients.some(ingredient => ingredient.allergens.includes(item)));
    }

    public static hasFoodTypes(pizza: PizzaReceipe, foodTypes: FoodType[]): boolean {
        return foodTypes.some(item => pizza.foodTypes.includes(item));
    }

    public static removeFoodTypes(pizza: PizzaReceipe, foodTypes: FoodType[]): PizzaReceipe {
        pizza.foodTypes = pizza.foodTypes.filter( el => !foodTypes.includes( el ));
        return pizza;
    }

    public static removeAllergens(pizza: PizzaReceipe, allergens: Allergens []): PizzaReceipe {
        pizza.ingredients.forEach(ingredient => ingredient.allergens = ingredient.allergens.filter( ( el ) => !allergens.includes( el )));
        return pizza;
    }

    public static removeIngredients(pizza: PizzaReceipe, ingredients: PizzaIngredient[]): PizzaReceipe {
        pizza.ingredients = pizza.ingredients.filter(ingredient => !ingredients.find(i => i.id === ingredient.id));
        return pizza;
    }

    public static doubleIngredients(pizza: PizzaReceipe, ingredients: PizzaIngredient[]): PizzaReceipe {
        pizza.ingredients = [...pizza.ingredients, ...pizza.ingredients.filter(ingredient => ingredients.find(i => i.id === ingredient.id))];
        return pizza;
    }
}