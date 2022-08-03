type Recipe = {
  img: string,
  title: string,
  id: string,
  ingredients: Ingredient[],
  instructions: string[]
};

type SearchedRecipe = Omit<Recipe, "ingredients", "instructions">;

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

////////////////////
// API Data Types //
////////////////////

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

type SearchResponse = {
  page: {
    current: number,
    total_pages: number,
    total_results: number,
    size: number
  },
  results: {
    id: string,
    ingredients: string[],
    instructions: string[],
    match: number,
    title: string
  }[]
};