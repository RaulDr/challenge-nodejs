import { Allergens } from "./alergens.enum";
import { FoodType } from "./food-type.enum";
import { PizzaIngredientName } from "./pizza-ingredient-name.enum";
import { PizzaIngredient } from "./pizza-ingredient.model";
import { PizzaReceipe } from "./pizza-receipe";
import { PizzaUtils } from "./pizza-utils";

const random = () => (Math.random() + 1).toString(36).substring(7);

describe('PizzaUtils test', () => {
    let pizza1: PizzaReceipe;
    let pizza2: PizzaReceipe;
    let salami: PizzaIngredient;
    let rise: PizzaIngredient;
    beforeEach(() => {
        // Declare dummy ingredients
        rise = {
            id: 'ztmx8',
            name: PizzaIngredientName.RICE,
            allergens: [],
            calories: 130
        }

        const potato: PizzaIngredient = {
            id: 'ph62o',
            name: PizzaIngredientName.POTATO,
            allergens: [],
            calories: 77
        }

        const tomato: PizzaIngredient = {
            id: 'l2wxn',
            name: PizzaIngredientName.TOMATO,
            allergens: [Allergens.TOMATO],
            calories: 18
        }

        salami = {
            id: 'lppko',
            name: PizzaIngredientName.SALAMI,
            allergens: [Allergens.MILK, Allergens.GLUTEN],
            calories: 336
        }

        //Declare dummy pizza recipies

        pizza1 = {
            id: 'atyz2',
            name: 'Pizza with allergens',
            ingredients: [rise, salami, tomato],
            foodTypes: [FoodType.WITHOUT_RESTRICTIONS]
        };

        pizza2 = {
            id: 'd3qu8',
            name: 'Pizza without allergens',
            ingredients: [rise, potato],
            foodTypes: [FoodType.VEGAN, FoodType.GLUTEN_FREE]
        };
    });

    describe('hasAllergens()', () => {
        it('should have allergens', () => {
            expect(PizzaUtils.hasAllergens(pizza1, [Allergens.TOMATO])).toEqual(true);
        });
        it('shouldnt have allergens', () => {
            expect(PizzaUtils.hasAllergens(pizza2, [Allergens.TOMATO, Allergens.GLUTEN])).toEqual(false);
        });
    });

    describe('hasFoodTypes()', () => {
        it('should have foodTypes', () => {
            expect(PizzaUtils.hasFoodTypes(pizza2, [FoodType.VEGAN, FoodType.GLUTEN_FREE])).toEqual(true);
        });
        it('shouldnt have allergens', () => {
            expect(PizzaUtils.hasFoodTypes(pizza1, [FoodType.VEGAN, FoodType.GLUTEN_FREE])).toEqual(false);
        });
    });

    describe('removeAllergens()', () => {
        it('should remove the tomato allergen', () => {
            const response = {
                id: 'atyz2',
                name: 'Pizza with allergens',
                ingredients: [
                    { id: 'ztmx8', name: 'RICE', allergens: [], calories: 130 },
                    { id: 'lppko', name: 'SALAMI', allergens: ['MILK', 'GLUTEN'], calories: 336 },
                    { id: 'l2wxn', name: 'TOMATO', allergens: [], calories: 18 }
                ],
                foodTypes: ['WITHOUT_RESTRICTIONS']
            };
            expect(PizzaUtils.removeAllergens(pizza1, [Allergens.TOMATO])).toEqual(response);
        });
    });

    describe('removeFoodTypes()', () => {
        it('should remove food type', () => {
            const response = {
                id: 'd3qu8',
                name: 'Pizza without allergens',
                ingredients: [
                    { id: 'ztmx8', name: 'RICE', allergens: [], calories: 130 },
                    { id: 'ph62o', name: 'POTATO', allergens: [], calories: 77 }
                ],
                foodTypes: []
            };
            expect(PizzaUtils.removeFoodTypes(pizza2, [FoodType.VEGAN, FoodType.GLUTEN_FREE])).toEqual(response);
        });
    });

    describe('removeFoodTypes()', () => {
        it('should remove food type', () => {
            const response = {
                id: 'atyz2',
                name: 'Pizza with allergens',
                ingredients: [
                  { id: 'ztmx8', name: 'RICE', allergens: [], calories: 130 },
                  { id: 'lppko', name: 'SALAMI', allergens: ['MILK', 'GLUTEN'], calories: 336 },
                  { id: 'l2wxn', name: 'TOMATO', allergens: ['TOMATO'], calories: 18 },
                  { id: 'ztmx8', name: 'RICE', allergens: [], calories: 130 },
                  { id: 'lppko', name: 'SALAMI', allergens: ['MILK', 'GLUTEN'], calories: 336 }
                ],
                foodTypes: [ 'WITHOUT_RESTRICTIONS' ]
              };
            expect(PizzaUtils.doubleIngredients(pizza1, [salami, rise])).toEqual(response);
        });
    });
});


// console.log("has allergens", PizzaUtils.hasAllergens(pizza1, [Allergens.TOMATO]));
// console.log("hasn't allergens", !PizzaUtils.hasAllergens(pizza2, [Allergens.TOMATO, Allergens.GLUTEN]));
// console.log("has food types", PizzaUtils.hasFoodTypes(pizza2, [FoodType.VEGAN, FoodType.GLUTEN_FREE]));
// console.log("hasn't food types", !PizzaUtils.hasFoodTypes(pizza1, [FoodType.VEGAN, FoodType.GLUTEN_FREE]));
// console.log("remove tomato allergen", PizzaUtils.removeAllergens(pizza1, [Allergens.TOMATO]));
// console.log("remove vegan and gluten free food type", PizzaUtils.removeFoodTypes(pizza2, [FoodType.VEGAN, FoodType.GLUTEN_FREE]));
// console.log("double ingredients", PizzaUtils.doubleIngredients(pizza1, [salami, rise]));
