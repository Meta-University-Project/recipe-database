import React from "react";
import { getBounds } from "../constants/utils";
import TextInputWithIngredients from "./TextInputWithIngredients";
import SearchHelper from "./SearchHelper";
import "../stylesheets/SearchBar.scss";

type SearchBarProps = {
  searchValue: string,
  setSearchValue: React.Dispatch<React.SetStateAction<string>>,
  queriedIngredients: SearchedIngredient[],
  setQueriedIngredients: React.Dispatch<React.SetStateAction<SearchedIngredient[]>>,
  ingredientOptions: IngredientOption[]
};

const SearchBar: React.FC<SearchBarProps> = ({ searchValue, setSearchValue, queriedIngredients, setQueriedIngredients, ingredientOptions }) => {
  const [helperTransform, setHelperTransform] = React.useState(0);
  const [filteredIngredientOptions, setFilteredIngredientOptions] = React.useState<IngredientOption[]>([]);
  const [focusedResult, setFocusedResult] = React.useState(0);
  const [searchFocused, setSearchFocused] = React.useState(false);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const textDivRef = React.useRef<HTMLDivElement>(null);

  const addIngredient = (id: string) => {
    setQueriedIngredients((ingredients) => ([
      ...ingredients,
      { id }
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
    if (searchValue.length === 0) {
      setFilteredIngredientOptions([]);
    } else {
      const newFilteredOptions = [];
      let i = 0;
      // only show top 10 matching ingredients
      while (i < ingredientOptions.length && newFilteredOptions.length < 10) {
        const option = ingredientOptions[i];
        if (
          option.name.toLowerCase().includes(searchValue.toLowerCase().trim())
          && !queriedIngredients.find((queriedIngredient) => queriedIngredient.id === option.id)
        ) {
            newFilteredOptions.push(option);
        }
        i++;
      }
      setFilteredIngredientOptions(newFilteredOptions);
    }
  }, [queriedIngredients, ingredientOptions, searchValue]);

  return (
    <div className={`search ${searchFocused ? "focused" : ""}`}>
      <div className={"search-bar"} ref={containerRef}>
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
      </div>
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