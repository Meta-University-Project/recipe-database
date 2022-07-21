import React from "react";
import SelectedIngredient from "./SelectedIngredient";
import "../stylesheets/TextInputWithIngredients.scss";

type TextInputProps = React.HTMLAttributes<HTMLDivElement> & {
  onTextChange: (value: string) => void,
  onIngredientsChange: (value: Ingredient[]) => void,
  placeholder: string,
  value: string,
  ingredients: Ingredient[],
  ingredientOptions: IngredientOption[],
  innerRef: React.RefObject<HTMLDivElement>
};

const TextInputWithIngredients: React.FC<TextInputProps> = ({ value, ingredients, placeholder, onTextChange, onIngredientsChange, ingredientOptions, innerRef, className, ...props }) => {
  const containerRef = React.useRef(null);
  const caretPos = React.useRef(0);

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

  return (
    <div
      ref={containerRef}
      className={`text-input-with-ingredients ${className || ""}`}
      placeholder={placeholder}
      onInput={onInputChange}
      onClick={() => innerRef.current?.focus()}
      {...props}
    >
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