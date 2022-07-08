import React from "react";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getHeight } from "../constants/utils";
import "../stylesheets/SearchBar.scss";

type SearchBarProps = {

}

const SearchBar: React.FC<SearchBarProps> = () => {
  const [containerHeight, setContainerHeight] = React.useState(0);
  const [iconHeight, setIconHeight] = React.useState(0);

  const containerRef = React.useRef<HTMLFormElement>(null);
  const iconRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!containerRef.current || !iconRef.current)
      return;
    setContainerHeight(getHeight(containerRef));
    setIconHeight(getHeight(iconRef));
  }, [containerRef, iconRef]);

  return (
    <form className={"search-bar"} ref={containerRef}>
      <div className={"search-icon"} ref={iconRef} style={{ top: (containerHeight - iconHeight) / 2 }}>
        <FontAwesomeIcon icon={solid("magnifying-glass")} fontSize={25} />
      </div>
      <input placeholder={"find recipes"}/>
    </form>
  )
};

export default SearchBar;