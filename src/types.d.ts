type Recipe = {
  img: string,
  title: string,
  id: string,
  ingredients: Ingredient[],
  instructions: string[]
};

type SearchedRecipe = Recipe;

type Ingredient = {
  name: string,
  quantity: number,
  form: FoodForm,
  unit: Unit,
};

// Note: omitting quantity & unit will query for any amount of ingredient
type SearchedIngredient = (Omit<Ingredient, "form"> | Omit<Ingredient, "form", "quantity", "unit">) & {
  id: string
};

type IngredientOption = {
  id: string,
  name: string
}

// TODO: add form support (make form an enum, not string)
type FoodForm = string;

//////////////////////////
// Firestore Data Types //
//////////////////////////

type FirestoreRecipe = {
  forms: string[],
  id: string,
  ingredients: string[],
  instructions: string[],
  quantities: number[],
  searchIngredients: string[],
  title: string,
  units: string[],
  url: string,
  img: string
};