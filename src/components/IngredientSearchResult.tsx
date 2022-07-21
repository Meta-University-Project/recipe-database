import React from "react";
import "../stylesheets/IngredientSearchResult.scss";

type IngredientSearchResultProps = IngredientOption;

const IngredientSearchResult: React.FC<IngredientSearchResultProps> = ({ id, name, forms, units }) => (
  <button type={"button"} className={"ingredient-search-result"}>
    {name}
  </button>
);

export default IngredientSearchResult;