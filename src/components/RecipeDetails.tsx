import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "./Card";
import "../stylesheets/RecipeDetails.scss";

type RecipeDetailsProps = {
  recipes: Recipe[]
};

const RecipeDetails: React.FC<RecipeDetailsProps> = ({ recipes }) => {
  const navigate = useNavigate();
  const { recipeId } = useParams();
  const recipe = recipes.find(({ key }) => recipeId === key);

  if (!recipe) {
    // TODO: Handle invalid/undefined recipe ID (404 page)
    return null;
  }
  return (
    <div className={"recipe-details"}>
      <header>
        <div className={"column recipe-title"}>
          <button className={"back-to-search"} onClick={() => navigate("/")}>
            <FontAwesomeIcon icon={solid("chevron-left")} fontSize={25} />
          </button>
          <h1>{recipe.title}</h1>
          <p className={"recipe-description"}>Nutrition info, cook time, etc here</p>
        </div>
        <div className={"column"}>
          <img src={recipe.img} alt={recipe.title} />
        </div>
      </header>
      <div className={"recipe-contents"}>
        <Card header={"Ingredients"} className={"ingredients"} headerColor={"purple"}>
          <ul>
            {recipe.ingredients.map(({ name, quantity, unit }, index) => (
              <li key={index}>{quantity} {unit} {name}</li>
            ))}
          </ul>
        </Card>
        <Card header={"Preparation"} className={"instructions"} headerColor={"green"}>
          <ol>
            {recipe.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </Card>
      </div>
    </div>
  )
};

export default RecipeDetails;