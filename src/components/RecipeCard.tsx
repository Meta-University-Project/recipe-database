import React from "react";
import { Link } from "react-router-dom";
import "../stylesheets/RecipeCard.scss";

type RecipeCardProps = SearchedRecipe;

const RecipeCard: React.FC<RecipeCardProps> = ({ img, title, id, match }) => (
  <Link to={`/recipes/${id}`} className={"recipe-card-link-wrapper"}>
    <div className={"recipe-card"}>
      <img src={img} alt={title} />
      <h2>{title}</h2>
      <p>Match: {match * 100}%</p>
    </div>
  </Link>
);

export default RecipeCard;