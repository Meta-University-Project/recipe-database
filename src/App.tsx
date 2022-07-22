import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import RecipeGrid from "./components/RecipeGrid";
import RecipeDetails from "./components/RecipeDetails";
import IngredientOptions from "./constants/ingredientOptions";
import Recipes from "./constants/recipes";
import "./stylesheets/App.scss";

const App = () => {
  const [searchValue, setSearchValue] = React.useState("");
  const [queriedIngredients, setQueriedIngredients] = React.useState<Ingredient[]>([]);

  const recipeMatches: SearchedRecipe[] = Recipes.map(({ ingredients, ...recipe }) => {
    let totalMatching = 0;
    for (const { id } of ingredients) {
      if (queriedIngredients.find((queriedIngredient) => id === queriedIngredient.id))
        totalMatching++;
    }
    return {
      ...recipe,
      ingredients,
      match: totalMatching / ingredients.length // match percentage
    };
  }).filter(({ match }) => match > 0);

  return (
    <div className={"App"}>
      <Navbar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        queriedIngredients={queriedIngredients}
        setQueriedIngredients={setQueriedIngredients}
        ingredientOptions={IngredientOptions}
      />
      <Routes>
        <Route path={"/"} element={<RecipeGrid recipes={recipeMatches} />} />
        <Route path={"recipes"}>
          <Route path={":recipeId"} element={<RecipeDetails recipes={Recipes} ingredientOptions={IngredientOptions} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
