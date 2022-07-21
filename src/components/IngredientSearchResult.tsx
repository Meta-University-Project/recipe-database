import React from "react";
import "../stylesheets/IngredientSearchResult.scss";

type IngredientSearchResultProps = {
  id: string,
  name: string,
  searchValue: string,
  onClick: () => void,
  focused: boolean,
  focusResult: () => void
};

const IngredientSearchResult: React.FC<IngredientSearchResultProps> = ({ searchValue, onClick, id, name, focused, focusResult }) => {
  const queryIndex = name.toLowerCase().indexOf(searchValue.toLowerCase());

  // Technically unreachable, but check that substring exists within name
  if (queryIndex === -1)
    return null;

  const preQuery = name.substring(0, queryIndex);
  const query = name.substring(queryIndex, queryIndex + searchValue.length);
  const postQuery = name.substring(queryIndex + searchValue.length);

  return (
    <button
      type={"button"}
      className={`ingredient-search-result ${focused ? "focused" : ""}`}
      onClick={onClick}
      onMouseEnter={focusResult}
    >
      {preQuery}
      <span className={"query"}>{query}</span>
      {postQuery}
    </button>
  );
};

export default IngredientSearchResult;