import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import RecipeGrid from "./components/RecipeGrid";
import RecipeDetails from "./components/RecipeDetails";
import { getIngredients, search } from "./constants/api";
import "./stylesheets/App.scss";

const App = () => {
  const [searchValue, setSearchValue] = React.useState("");
  const [queriedIngredients, setQueriedIngredients] = React.useState<SearchedIngredient[]>([]);
  const [ingredientOptions, setIngredientOptions] = React.useState<IngredientOption[]>([]);
  const [nextPage, setNextPage] = React.useState<number | null>(1); // null -> no valid next page
  const [recipeMatches, setRecipeMatches] = React.useState<SearchedRecipe[]>([]);

  // fetch all ingredients from Firebase
  React.useEffect(() => {
    getIngredients().then(setIngredientOptions);
  }, []);

  // execute a search query
  React.useEffect(() => {
    search(queriedIngredients, ingredientOptions, setNextPage)
      .then((results) => setRecipeMatches(results));
  }, [ingredientOptions, queriedIngredients])

  return (
    <div className={"App"}>
      <Navbar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        queriedIngredients={queriedIngredients}
        setQueriedIngredients={setQueriedIngredients}
        ingredientOptions={ingredientOptions}
      />
      <Routes>
        <Route path={"/"} element={<RecipeGrid recipes={recipeMatches} />} />
        <Route path={"recipes"}>
          <Route path={":recipeId"} element={<RecipeDetails />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
