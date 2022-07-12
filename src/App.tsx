import React from "react";
import Navbar from "./components/Navbar";
import RecipeCard from "./components/RecipeCard";
import './stylesheets/App.scss';
import RecipeGrid from "./components/RecipeGrid";

const RECIPES: Recipe[] = [
  { key: "1", title: "Some Recipe", img: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=768,574" },
  { key: "2", title: "Some Recipe", img: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=768,574" },
  { key: "3", title: "Some Recipe", img: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=768,574" },
  { key: "4", title: "Some Recipe", img: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=768,574" },
  { key: "5", title: "Some Recipe", img: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=768,574" },
  { key: "6", title: "Some Recipe", img: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=768,574" },
  { key: "7", title: "Some Recipe", img: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=768,574" },
  { key: "8", title: "Some Recipe", img: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=768,574" }
]

function App() {
  return (
    <div className="App">
      <Navbar />
      <RecipeGrid recipes={RECIPES} />
    </div>
  );
}

export default App;
