import React from "react";
import { getIngredientDetails } from "../constants/utils";
import "../stylesheets/SelectedIngredient.scss";

type SelectedIngredientProps = {
  ingredient: Ingredient,
  ingredientOptions: IngredientOption[]
};

const SelectedIngredient: React.FC<SelectedIngredientProps> = ({ ingredient, ingredientOptions }) => {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const ingredientDetails = getIngredientDetails(ingredient.id, ingredientOptions);

  return ingredientDetails ? (
    <button ref={buttonRef} className={"selected-ingredient"} type={"button"}>
      {ingredientDetails.name} ({ingredient.quantity} {ingredient.unit})
    </button>
  ) : null;
};

export default SelectedIngredient;