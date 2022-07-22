import React from "react";
import RecipeCard from "./RecipeCard";
import "../stylesheets/RecipeGrid.scss";

type RecipeGridProps = {
  recipes: SearchedRecipe[]
};

const RecipeGrid: React.FC<RecipeGridProps> = ({ recipes }) => (
  <div className={"recipe-grid"}>
    {recipes.map((recipe) => <RecipeCard key={recipe.id} {...recipe} />)}
  </div>
);

export default RecipeGrid;