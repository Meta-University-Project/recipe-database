import React from "react";
import IngredientSearchResult from "./IngredientSearchResult";
import "../stylesheets/SearchHelper.scss";

type SearchHelperProps = {
  searchFocused: boolean,
  searchValue: string,
  addIngredient: (id: string) => void,
  ingredientOptions: IngredientOption[],
  transform: number,
  focusedResult: number,
  setFocusedResult: React.Dispatch<React.SetStateAction<number>>
}

const SearchHelper: React.FC<SearchHelperProps> = ({ searchFocused, searchValue, addIngredient, ingredientOptions,
                                                     transform, focusedResult, setFocusedResult }) => {
  React.useEffect(() => {
    setFocusedResult(0);
  }, [setFocusedResult, ingredientOptions.length]);

  return (
    <div
      className={`search-helper ${!searchFocused || ingredientOptions.length === 0 ? "empty" : ""}`}
      style={{ left: transform }}
    >
      {ingredientOptions.map(({ id, name }, index) => (
        <IngredientSearchResult
          key={id}
          searchValue={searchValue}
          name={name}
          onClick={() => addIngredient(id)}
          focused={focusedResult === index}
          focusResult={() => setFocusedResult(index)}
        />
      ))}
    </div>
  );
};

export default SearchHelper;