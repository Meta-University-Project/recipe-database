import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import RecipeGrid from "./components/RecipeGrid";
import RecipeDetails from "./components/RecipeDetails";
import Recipes from "./constants/recipes";
import './stylesheets/App.scss';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path={"/"} element={<RecipeGrid recipes={Recipes} />} />
        <Route path={"recipes"}>
          <Route path={":recipeId"} element={<RecipeDetails recipes={Recipes} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
