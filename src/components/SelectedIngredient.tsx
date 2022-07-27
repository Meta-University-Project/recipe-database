import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import IngredientQuantityPicker from "./IngredientQuantityPicker";
import { getBounds, getIngredientDetails } from "../constants/utils";
import "../stylesheets/SelectedIngredient.scss";

type SelectedIngredientProps = {
  ingredient: Ingredient,
  ingredientOptions: IngredientOption[],
  onDelete: () => void
};

const SelectedIngredient: React.FC<SelectedIngredientProps> = ({ ingredient, ingredientOptions, onDelete }) => {
  const [quantityPickerOffset, setQuantityPickerOffset] = React.useState(0);
  const [isFocused, setIsFocused] = React.useState(false);

  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const quantityPickerRef = React.useRef<HTMLTableElement>(null);
  const ingredientDetails = getIngredientDetails(ingredient.id, ingredientOptions);

  const onKeyPress: React.KeyboardEventHandler = (e) => {
    if (e.code === "Backspace") {
      onDelete();
    }
  };

  const onButtonBlur: React.FocusEventHandler = (e) => {
    if (!e.relatedTarget || (
      !e.relatedTarget.classList.contains("unit-select") &&
      !e.relatedTarget.classList.contains("quantity-input")
    )) {
      setIsFocused(false);
    }
  }

  React.useEffect(() => {
    setQuantityPickerOffset((getBounds(buttonRef).width - getBounds(quantityPickerRef).width) / 2);
  }, [buttonRef, quantityPickerRef]);

  return ingredientDetails ? (
    <div className={"selected-ingredient-container"}>
      <button
        ref={buttonRef}
        className={"selected-ingredient"}
        type={"button"}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onKeyPress}
        onFocus={() => setIsFocused(true)}
        onBlur={onButtonBlur}
      >
        {ingredientDetails.name} (
        {ingredient.quantity === "infinite"
          ? <FontAwesomeIcon icon={solid("infinity")} />
          : `${ingredient.quantity} ${ingredient.unit}`}
        )
      </button>
      <IngredientQuantityPicker
        ingredientDetails={ingredientDetails}
        ref={quantityPickerRef}
        offset={quantityPickerOffset}
        hidden={!isFocused}
        onBlurInput={onButtonBlur}
      />
    </div>
  ) : null;
};

export default SelectedIngredient;