import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "./Card";
import "../stylesheets/RecipeDetails.scss";
import { getRecipe } from "../constants/api";
import { pluralUnit, singleUnit } from "../constants/units";
import Fraction from "fraction.js";
import NutritionalTable from "./NutritionalTable";

type RecipeDetailsProps = {};

const RecipeDetails: React.FC<RecipeDetailsProps> = () => {
  const navigate = useNavigate();
  const { recipeId } = useParams();
  const [recipe, setRecipe] = React.useState<Recipe | null>(null);

  React.useEffect(() => {
    if (!recipeId) {
      navigate("/");
      return;
    }
    getRecipe(recipeId).then(setRecipe)
      .catch(() => setRecipe(null));
  }, [recipeId, navigate]);

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
          <NutritionalTable nutr_values_per100g={recipe.nutr_values_per100g} />
        </div>
        <div className={"column"}>
          <img src={recipe.img} alt={recipe.title} />
        </div>
      </header>
      <div className={"recipe-contents"}>
        <Card header={"Ingredients"} className={"ingredients"} headerColor={"purple"}>
          <ul>
            {recipe.ingredients.map(({ name, quantity, unit, form }, index) => (
              <li key={index}>
                {(new Fraction(quantity)).toFraction(true)}&nbsp;
                {quantity > 1 ? pluralUnit(unit) : singleUnit(unit)}&nbsp;
                {name}{form.length > 0 ? ", " + form : ""}
              </li>
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