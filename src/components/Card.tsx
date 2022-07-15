import React from "react";
import "../stylesheets/Card.scss";

type CardProps = React.HTMLProps<HTMLDivElement> & {
  header: string,
  bottomHeader?: boolean,
  headerColor: "purple" | "green"
};

const Card: React.FC<CardProps> = ({ header, bottomHeader = false, headerColor, className, children, ...props }) => (
  <div className={`card ${headerColor} ${className || ""}`} {...props}>
    <div className={"card-header"}>
      <h3>{header}</h3>
    </div>
    <div className={"card-content"}>
      {children}
    </div>
  </div>
);

export default Card;