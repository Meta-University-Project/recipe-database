import React from "react";
import { regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBar from "./SearchBar";
import logo from "../images/logo-placeholder.png";
import "../stylesheets/Navbar.scss";

type NavbarProps = {

};

const Navbar: React.FC<NavbarProps> = () => (
  <nav>
    <img src={logo} className={"logo"} alt={"logo"} />
    <SearchBar />
    <button className={"profile-icon"}>
      <FontAwesomeIcon icon={regular("circle-user")} fontSize={65} />
    </button>
  </nav>
);

export default Navbar;