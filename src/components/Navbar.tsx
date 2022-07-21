import React from "react";
import { regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBar from "./SearchBar";
import logo from "../images/logo-placeholder.png";
import "../stylesheets/Navbar.scss";

type NavbarProps = {
  searchValue: string,
  setSearchValue: (newVal: string) => void,
  queriedIngredients: Ingredient[],
  setQueriedIngredients: (newVal: Ingredient[]) => void,
  ingredientOptions: IngredientOption[]
};

const Navbar: React.FC<NavbarProps> = (props) => (
  <nav>
    <img src={logo} className={"logo"} alt={"logo"} />
    <SearchBar {...props} />
    <button className={"profile-icon"}>
      <FontAwesomeIcon icon={regular("circle-user")} fontSize={65} />
    </button>
  </nav>
);

export default Navbar;