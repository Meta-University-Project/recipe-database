type Recipe = {
  img: string,
  title: string,
  id: string,
  description: string,
  ingredients: RecipeIngredient[],
  instructions: string[]
};

type SearchedRecipe = Recipe & {
  match: number
};

type Ingredient = {
  id: string,
  quantity: number,
  form: FoodForm,
  unit: Unit,
};

// Note: excluding quantity assumes ingredient is "to taste" -- i.e. ingredient will be excluded from search
// (but still present in recipe)
type RecipeIngredient = Ingredient | (Omit<Ingredient, "quantity"> & {
  quantity: undefined
});

// Note: omitting quantity & unit will query for any amount of ingredient
type SearchedIngredient = Omit<Ingredient, "form"> | Omit<Ingredient, "form", "quantity", "unit">;

type IngredientOption = {
  id: string,
  name: string,
  forms: FoodForm[] // array of possible forms this ingredient can take
  units: Unit[] // array of possible units this can be measured in
}

// TODO: add unit support (make unit an enum, not string)
type Unit = string;

// TODO: add form support (make form an enum, not string)
type FoodForm = string;