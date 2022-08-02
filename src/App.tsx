import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import RecipeGrid from "./components/RecipeGrid";
import RecipeDetails from "./components/RecipeDetails";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./constants/firebase";
import { getIngredientDetails } from "./constants/utils";
import axios, {AxiosResponse} from "axios";
import "./stylesheets/App.scss";

const SEARCH_ENDPOINT = "https://us-central1-recipe--finder.cloudfunctions.net/searchRecipes";

type SearchResponse = {
  page: {
    current: number,
    total_pages: number,
    total_results: number,
    size: number
  },
  results: SearchedRecipe[]
};

const App = () => {
  const [searchValue, setSearchValue] = React.useState("");
  const [queriedIngredients, setQueriedIngredients] = React.useState<SearchedIngredient[]>([]);
  const [ingredientOptions, setIngredientOptions] = React.useState<IngredientOption[]>([]);
  const [nextPage, setNextPage] = React.useState<number | null>(1); // null -> no valid next page
  const [recipeMatches, setRecipeMatches] = React.useState<SearchedRecipe[]>([]);

  // fetch all ingredients from Firebase
  React.useEffect(() => {
    const options: IngredientOption[] = [];
    getDocs(collection(db, "ingredients")).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        options.push({ id: doc.id, name: doc.data().name });
      });
      setIngredientOptions(options);
    });
  }, []);

  React.useEffect(() => {
    axios.post(SEARCH_ENDPOINT, {
      text: "",
      ingredients: queriedIngredients.map(({ id }) => getIngredientDetails(id, ingredientOptions)?.name)
        .filter((ingredient) => !!ingredient)
    }).then(({ data }: AxiosResponse<SearchResponse>) => {
      setRecipeMatches(data.results);
      setNextPage(data.page.current === data.page.total_pages ? null : data.page.current + 1);
    });
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
