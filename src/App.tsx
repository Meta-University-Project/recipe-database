import React from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import RecipeGrid from "./components/RecipeGrid";
import RecipeDetails from "./components/RecipeDetails";
import { getIngredients, search } from "./constants/api";
import "./stylesheets/App.scss";

const App = () => {
  const navigate = useNavigate()
  const location = useLocation();

  const [searchValue, setSearchValue] = React.useState("");
  const [queriedIngredients, setQueriedIngredients] = React.useState<SearchedIngredient[]>([]);
  const [ingredientOptions, setIngredientOptions] = React.useState<IngredientOption[]>([]);
  const [nextPage, setNextPage] = React.useState<number | null>(1); // null -> no valid next page
  const [recipeMatches, setRecipeMatches] = React.useState<SearchedRecipe[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const lastIngredientsLength = React.useRef<number>(0);
  const lastSearchValue = React.useRef<string>("");

  const loadMoreResults = () => {
    return search(queriedIngredients, searchValue, ingredientOptions, setNextPage, nextPage)
      .then((results) => setRecipeMatches([...recipeMatches, ...results]))
  }

  // fetch all ingredients from Firebase
  React.useEffect(() => {
    getIngredients().then(setIngredientOptions);
  }, []);

  // execute a search query, navigate back to homepage if necessary
  React.useEffect(() => {
    const executeSearch = () => {
      setIsLoading(true);
      search(queriedIngredients, searchValue, ingredientOptions, setNextPage, 1)
        .then((results) => setRecipeMatches(results))
        .finally(() => setIsLoading(false));
    }

    if (lastIngredientsLength.current !== queriedIngredients.length) {
      // execute search query immediately if ingredients are changed
      executeSearch();
      if (location.pathname !== "/") {
        navigate("/");
      }
    } else if (lastSearchValue.current !== searchValue) {
      // only search with value if it is the same for 1.5 seconds
      const timer = setTimeout(executeSearch, 1500);
      return () => clearTimeout(timer);
    }
    lastIngredientsLength.current = queriedIngredients.length;
    lastSearchValue.current = searchValue;
  }, [location.pathname, navigate, queriedIngredients, searchValue, ingredientOptions]);

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
        <Route path={"/"} element={
          <RecipeGrid recipes={recipeMatches} isLoading={isLoading} loadMoreResults={loadMoreResults} hasNextPage={!!nextPage} />
        } />
        <Route path={"recipes"}>
          <Route path={":recipeId"} element={<RecipeDetails />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
