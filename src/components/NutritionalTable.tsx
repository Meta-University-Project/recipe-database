import React from "react";
import Card from "./Card";
import "../stylesheets/NutritionalTable.scss";

type NutritionalTableProps = {
  nutr_values_per100g: NutritionalValue
};

type NutritionRow = {
  id: "fat" | "saturates" | "protein" | "sugars" | "salt" | "energy",
  title: string,
  unit: string,
  transform: (value: number) => number
};

const NutritionalTableLayout: NutritionRow[] = [
  { id: "fat", title: "Fat", unit: "g", transform: (value: number ) => value },
  { id: "saturates", title: "Saturated Fat", unit: "g", transform: (value: number ) => value },
  { id: "protein", title: "Protein", unit: "g", transform: (value: number ) => value },
  { id: "sugars", title: "Sugars", unit: "g", transform: (value: number ) => value },
  { id: "salt", title: "Salt", unit: "mg", transform: (value: number ) => value * 1000 },
  { id: "energy", title: "Calories", unit: "cal", transform: (value: number ) => value },
]

const NutritionalTable: React.FC<NutritionalTableProps> = ({ nutr_values_per100g }) => (
  <Card header={"Nutrition Information"} headerColor={"blue"} className={"nutritional-table-wrapper"}>
    <table className={"nutritional-table"}>
      <tbody>
        {NutritionalTableLayout.map(({ id, title, unit, transform }) => (
          <tr key={id} className={id}>
            <th>{title}</th>
            <td>{Math.round(transform(nutr_values_per100g[id]))} {unit}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </Card>
)

export default NutritionalTable;