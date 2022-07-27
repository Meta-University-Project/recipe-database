import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "./Card";
import "../stylesheets/RecipeDetails.scss";
import { getIngredientDetails } from "../constants/utils";

type RecipeDetailsProps = {
  recipes: Recipe[],
  ingredientOptions: IngredientOption[]
};

const RecipeDetails: React.FC<RecipeDetailsProps> = ({ recipes, ingredientOptions }) => {
  const navigate = useNavigate();
  const { recipeId } = useParams();
  const recipe = recipes.find(({ id }) => recipeId === id);

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
            {recipe.ingredients.map(({ id, quantity, unit }, index) => {
              const ingredientDetails = getIngredientDetails(id, ingredientOptions);
              return (
                ingredientDetails && quantity
                  ? <li key={id}>{quantity} {unit} {ingredientDetails.name}</li>
                  : ingredientDetails
                    ? <li key={id}>{ingredientDetails.name}, to taste</li>
                    : null
              );
            })}
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