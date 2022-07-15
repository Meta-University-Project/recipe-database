type Recipe = {
  img: string,
  title: string,
  key: string,
  description: string,
  ingredients: Ingredient[],
  instructions: string[]
};

type Ingredient = {
  name: string,
  quantity: number,
  unit: Unit
};

// TODO: add unit support (make unit an enum, not string)
type Unit = string;