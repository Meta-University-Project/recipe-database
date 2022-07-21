import React from "react";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getHeight } from "../constants/utils";
import IngredientSearchResult from "./IngredientSearchResult";
import TextInputWithIngredients from "./TextInputWithIngredients";
import "../stylesheets/SearchBar.scss";

type SearchBarProps = {
  searchValue: string,
  setSearchValue: (newVal: string) => void,
  queriedIngredients: Ingredient[],
  setQueriedIngredients: (newVal: Ingredient[]) => void,
  ingredientOptions: IngredientOption[]
};

const SearchBar: React.FC<SearchBarProps> = ({ searchValue, setSearchValue, queriedIngredients, setQueriedIngredients, ingredientOptions }) => {
  const [iconTransform, setIconTransform] = React.useState(0);
  const [helperTransform, setHelperTransform] = React.useState(0);

  const containerRef = React.useRef<HTMLFormElement>(null);
  const iconRef = React.useRef<HTMLDivElement>(null);
  const textDivRef = React.useRef<HTMLDivElement>(null);

  // Transform search icon to be vertically positioned in center of div
  React.useEffect(() => {
    if (!containerRef.current || !iconRef.current)
      return;
    setIconTransform((getHeight(containerRef) - getHeight(iconRef)) / 2);
  }, [containerRef, iconRef]);

  // Transform search helper to be horizontally aligned with typed text
  React.useEffect(() => {
    if (!iconRef.current || !textDivRef.current)
      return;
    const iconBounds = iconRef.current.getBoundingClientRect();
    setHelperTransform(textDivRef.current.getBoundingClientRect().x - iconBounds.x - iconBounds.width + 65);
  }, [iconRef, textDivRef, queriedIngredients]);

  return (
    <div className={"search"}>
      <form className={"search-bar"} ref={containerRef}>
        <div className={"search-icon"} ref={iconRef} style={{ top: iconTransform }}>
          <FontAwesomeIcon icon={solid("magnifying-glass")} fontSize={25} />
        </div>
        <TextInputWithIngredients
          onTextChange={setSearchValue}
          onIngredientsChange={setQueriedIngredients}
          value={searchValue}
          ingredients={queriedIngredients}
          ingredientOptions={ingredientOptions}
          innerRef={textDivRef}
          className={"search-input"}
          placeholder={"find recipes"}
        />
      </form>
      <div className={"search-helper"} style={{ left: helperTransform }}>
        {ingredientOptions.map((ingredientOption) => (
          <IngredientSearchResult key={ingredientOption.id} {...ingredientOption} />
        ))}
      </div>
    </div>
  )
};

export default SearchBar;