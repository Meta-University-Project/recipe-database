type Recipe = {
  img: string,
  title: string,
  key: string,
  description: string,
  ingredients: Ingredient[],
  instructions: string[]
};

type Ingredient = {
  id: string,
  // "infinite" used only in searches, "to taste" excludes ingredient from search but will appear in recipe
  quantity: number | "infinite" | "to taste",
  // "any" form used in searches
  form: FoodForm | "any",
  // "any" unit used when quantity === "infinite"
  unit: Unit | "any",
};

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