import React from "react";
import RecipeCard from "./RecipeCard";
import "../stylesheets/RecipeGrid.scss";

type RecipeGridProps = {
  recipes: Recipe[]
};

const RecipeGrid: React.FC<RecipeGridProps> = ({ recipes }) => (
  <div className={"recipe-grid"}>
    {recipes.map((recipe) => <RecipeCard id={recipe.key} {...recipe} />)}
  </div>
);

export default RecipeGrid;