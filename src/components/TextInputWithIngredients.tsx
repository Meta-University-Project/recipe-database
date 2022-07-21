import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { getBounds } from "../constants/utils";
import SelectedIngredient from "./SelectedIngredient";
import "../stylesheets/TextInputWithIngredients.scss";

type TextInputProps = React.HTMLAttributes<HTMLDivElement> & {
  onTextChange: (value: string) => void,
  onIngredientsChange: (value: Ingredient[]) => void,
  placeholder: string,
  value: string,
  ingredients: Ingredient[],
  ingredientOptions: IngredientOption[],
  innerRef: React.RefObject<HTMLDivElement>,
  incrementFocusedResult: () => void,
  decrementFocusedResult: () => void,
  onSubmit: () => void
};

const TextInputWithIngredients: React.FC<TextInputProps> = ({ value, ingredients, placeholder,
                                                              onTextChange, onIngredientsChange, ingredientOptions,
                                                              innerRef, className, incrementFocusedResult,
                                                              decrementFocusedResult, onSubmit, ...props }) => {
  const [placeholderOffset, setPlaceholderOffset] = React.useState(0);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const caretPos = React.useRef(0);

  const showPlaceholder = value.length === 0 && ingredients.length === 0;

  const onInputChange: React.FormEventHandler<HTMLDivElement> = (e) => {
    caretPos.current = getCaret(innerRef.current);
    const nodes = e.currentTarget.childNodes;
    const text = nodes[nodes.length - 1].textContent || "";
    onTextChange(text);
  };

  const onKeyPress: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    caretPos.current = getCaret(innerRef.current);
    if (e.code === "Backspace" && caretPos.current === 0 && ingredients.length > 0) {
      onIngredientsChange(ingredients.slice(0, ingredients.length - 1));
    } else if (e.code === "Enter") {
      e.preventDefault();
      onSubmit();
    } else if (e.code === "ArrowDown") {
      incrementFocusedResult();
    } else if (e.code === "ArrowUp") {
      e.preventDefault();
      decrementFocusedResult();
    }
  }

  // modified from: https://codepen.io/feketegy/pen/RwGBgyq
  const getCaret = (node: HTMLDivElement | null) => {
    let caretAt = 0;
    const selection = window.getSelection();
    if (!node || !selection || selection.rangeCount === 0)
      return caretAt;

    const range = selection.getRangeAt(0);
    const preRange = range.cloneRange();
    preRange.selectNodeContents(node);
    preRange.setEnd(range.endContainer, range.endOffset);
    caretAt = preRange.toString().length;
    return caretAt;
  };

  const setCaret = (node: HTMLDivElement | null, offset: number) => {
    let selection = window.getSelection();
    let range = document.createRange();
    if (!selection || !node || node.childNodes.length === 0) return;

    range.setStart(node.childNodes[0], offset);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  React.useEffect(() => {
    setCaret(innerRef.current, caretPos.current);
    innerRef.current?.focus();
  }, [innerRef, caretPos, value]);

  React.useEffect(() => {
    setPlaceholderOffset(getBounds(innerRef).x - getBounds(containerRef).x - 2)
  }, [innerRef, containerRef]);

  return (
    <div
      ref={containerRef}
      className={`text-input-with-ingredients ${className || ""}`}
      placeholder={placeholder}
      onInput={onInputChange}
      onClick={() => innerRef.current?.focus()}
      {...props}
    >
      <div className={"search-icon"}>
        <FontAwesomeIcon icon={solid("magnifying-glass")} fontSize={25} />
      </div>
      <p className={`placeholder ${!showPlaceholder ? "hidden" : ""}`} style={{ left: placeholderOffset }}>
        {placeholder}
      </p>
      {ingredients.map((ingredient) => (
        <SelectedIngredient key={ingredient.id} ingredient={ingredient} ingredientOptions={ingredientOptions} />
      ))}
      <div
        contentEditable
        suppressContentEditableWarning
        className={"text-div"}
        ref={innerRef}
        onKeyDown={onKeyPress}
      >
        {value}
      </div>
    </div>
  );
};

export default TextInputWithIngredients;