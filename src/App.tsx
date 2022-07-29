import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import RecipeGrid from "./components/RecipeGrid";
import RecipeDetails from "./components/RecipeDetails";
import Recipes from "./constants/recipes";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./constants/firebase";
import "./stylesheets/App.scss";

const App = () => {
  const [searchValue, setSearchValue] = React.useState("");
  const [queriedIngredients, setQueriedIngredients] = React.useState<SearchedIngredient[]>([]);
  const [ingredientOptions, setIngredientOptions] = React.useState<IngredientOption[]>([]);

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

  const getIngredientOptions = async () => {
    const options: IngredientOption[] = [];
    const querySnapshot = await getDocs(collection(db, "ingredients"));
    querySnapshot.forEach((doc) => {
      ingredientOptions.push({ id: doc.id, name: doc.data().name });
    });
    console.log(options);
    setIngredientOptions(options);
  };

  React.useEffect(() => {
    const options: IngredientOption[] = [];
    getDocs(collection(db, "ingredients")).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        options.push({ id: doc.id, name: doc.data().name });
      });
      setIngredientOptions(options);
    });
  }, []);

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
          <Route path={":recipeId"} element={<RecipeDetails recipes={Recipes} ingredientOptions={ingredientOptions} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
