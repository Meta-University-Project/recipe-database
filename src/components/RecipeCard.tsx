import React from "react";
import { Link } from "react-router-dom";
import "../stylesheets/RecipeCard.scss";

type RecipeCardProps = SearchedRecipe;

const RecipeCard: React.FC<RecipeCardProps> = ({ img, title, id }) => (
  <Link to={`/recipes/${id}`} className={"recipe-card-link-wrapper"}>
    <div className={"recipe-card"}>
      <div className={"image-wrapper"}>
        <img src={img} alt={title} />
      </div>
      <h2>{title}</h2>
    </div>
  </Link>
);

export default RecipeCard;