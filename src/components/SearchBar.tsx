import React from "react";
import { getBounds } from "../constants/utils";
import TextInputWithIngredients from "./TextInputWithIngredients";
import SearchHelper from "./SearchHelper";
import "../stylesheets/SearchBar.scss";

type SearchBarProps = {
  searchValue: string,
  setSearchValue: React.Dispatch<React.SetStateAction<string>>,
  queriedIngredients: Ingredient[],
  setQueriedIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>,
  ingredientOptions: IngredientOption[]
};

const SearchBar: React.FC<SearchBarProps> = ({ searchValue, setSearchValue, queriedIngredients, setQueriedIngredients, ingredientOptions }) => {
  const [helperTransform, setHelperTransform] = React.useState(0);
  const [filteredIngredientOptions, setFilteredIngredientOptions] = React.useState<IngredientOption[]>([]);
  const [focusedResult, setFocusedResult] = React.useState(0);
  const [searchFocused, setSearchFocused] = React.useState(false);

  const containerRef = React.useRef<HTMLFormElement>(null);
  const textDivRef = React.useRef<HTMLDivElement>(null);

  const addIngredient = (id: string) => {
    setQueriedIngredients((ingredients) => ([
      ...ingredients,
      { id, quantity: "infinite", form: "any", unit: "any" }
    ]));
    setSearchValue("");
  };

  const addFocusedIngredient = () => {
    if (focusedResult >= 0 && focusedResult < filteredIngredientOptions.length) {
      addIngredient(filteredIngredientOptions[focusedResult].id);
    }
  };

  const incrementFocusedIngredient = () => {
    setFocusedResult((focused) => (
      focused < filteredIngredientOptions.length - 1
        ? focused + 1
        : focused
    ));
  }

  const decrementFocusedIngredient = () => {
    setFocusedResult((focused) => (
      focused > 0
        ? focused - 1
        : focused
    ));
  }

  // Transform search helper to be horizontally aligned with typed text
  React.useEffect(() => {
    setHelperTransform(getBounds(textDivRef).x - getBounds(containerRef).x - 10);
  }, [containerRef, textDivRef, queriedIngredients]);

  // Filter available ingredients based on what user is searching
  React.useEffect(() => {
    setFilteredIngredientOptions(
      searchValue.length > 0
        ? ingredientOptions.filter(({ id, name }) => (
          name.toLowerCase().includes(searchValue.toLowerCase())
          && !queriedIngredients.find((queriedIngredient) => queriedIngredient.id === id)
        )) : []
    );
  }, [queriedIngredients, ingredientOptions, searchValue]);

  return (
    <div className={`search ${searchFocused ? "focused" : ""}`}>
      <form className={"search-bar"} ref={containerRef} onSubmit={() => console.log("hi")}>
        <TextInputWithIngredients
          onTextChange={setSearchValue}
          onIngredientsChange={setQueriedIngredients}
          value={searchValue}
          ingredients={queriedIngredients}
          ingredientOptions={ingredientOptions}
          innerRef={textDivRef}
          className={"search-input"}
          placeholder={"find recipes"}
          incrementFocusedResult={incrementFocusedIngredient}
          decrementFocusedResult={decrementFocusedIngredient}
          onSubmit={addFocusedIngredient}
          setSearchFocused={setSearchFocused}
        />
      </form>
      <SearchHelper
        searchFocused={searchFocused}
        focusedResult={focusedResult}
        setFocusedResult={setFocusedResult}
        searchValue={searchValue}
        addIngredient={addIngredient}
        ingredientOptions={filteredIngredientOptions}
        transform={helperTransform}
      />
    </div>
  )
};

export default SearchBar;