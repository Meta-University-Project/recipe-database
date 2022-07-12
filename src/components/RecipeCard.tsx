import React from "react";
import "../stylesheets/RecipeCard.scss";

type RecipeCardProps = {
  img: string,
  title: string
}

const RecipeCard: React.FC<RecipeCardProps> = ({ img, title }) => (
  <div className={"recipe-card"}>
    <img src={img} alt={title} />
    <h2>{title}</h2>
    <p>Match: 99%</p>
  </div>
);

export default RecipeCard;