import React from "react";
import { Link } from "react-router-dom";
import "../stylesheets/RecipeCard.scss";

type RecipeCardProps = {
  img: string,
  title: string,
  id: string
}

const RecipeCard: React.FC<RecipeCardProps> = ({ img, title, id }) => (
  <Link to={`/recipes/${id}`} className={"recipe-card-link-wrapper"}>
    <div className={"recipe-card"}>
      <img src={img} alt={title} />
      <h2>{title}</h2>
      <p>Match: 99%</p>
    </div>
  </Link>
);

export default RecipeCard;