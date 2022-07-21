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
  quantity: number,
  form: FoodForm,
  unit: Unit
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