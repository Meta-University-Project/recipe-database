import React from "react";
import RecipeCard from "./RecipeCard";
import loading from "../images/loading.svg";
import "../stylesheets/RecipeGrid.scss";

type RecipeGridProps = {
  recipes: SearchedRecipe[],
  isLoading: boolean,
  loadMoreResults: () => Promise<void>,
  hasNextPage: boolean
};

const RecipeGrid: React.FC<RecipeGridProps> = ({ recipes, isLoading, loadMoreResults, hasNextPage }) => {
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);

  const loadMoreWithState = () => {
    setIsLoadingMore(true);
    loadMoreResults().then(() => setIsLoadingMore(false));
  }

  if (isLoading) {
    return (
      <div className={"loading-wrapper"}>
        <img src={loading} alt={"Loading..."} className={"loading"} />
      </div>
    );
  } else if (recipes.length === 0) {
    return (
      <div className={"recipe-grid-wrapper"}>
        <p className={"empty"}>There are no recipes to display. Try a different search query.</p>
      </div>
    )
  }
  return (
    <div className={"recipe-grid-wrapper"}>
      <div className={"recipe-grid"}>
        {recipes.map((recipe) => <RecipeCard key={recipe.id} {...recipe} />)}
      </div>
      {hasNextPage && (
        <button
          className={`load-more-button ${isLoadingMore ? "is-loading" : ""}`}
          onClick={isLoadingMore ? () => {} : loadMoreWithState}
        >
          {isLoadingMore
            ? <img src={loading} alt={"Loading..."} className={"loading"} />
            : "Load more recipes"
          }
        </button>
      )}
    </div>
  );
};

export default RecipeGrid;