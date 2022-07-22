import { RefObject } from "react";

export const getBounds = (ref: RefObject<any>): DOMRect => (
  ref.current
    ? ref.current.getBoundingClientRect()
    : new DOMRect(0, 0, 0, 0)
);

export const getIngredientDetails = (ingredientId: string, ingredientOptions: IngredientOption[]) => (
  ingredientOptions.find(({ id }) => ingredientId === id)
);