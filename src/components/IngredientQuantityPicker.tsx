import React from "react";
import "../stylesheets/IngredientQuantityPicker.scss";

type IngredientQuantityPickerProps = {
  ingredientDetails: IngredientOption,
  offset: number,
  hidden: boolean,
  onBlurInput: React.FocusEventHandler
}

const IngredientQuantityPicker = React.forwardRef<HTMLTableElement, IngredientQuantityPickerProps>(({ ingredientDetails, offset, hidden, onBlurInput }, ref) => (
  <table
    className={`ingredient-quantity-picker ${hidden ? "hidden" : ""}`}
    ref={ref}
    onClick={(e) => e.stopPropagation()}
    style={{ left: offset }}
  >
    <tbody>
    <tr>
      <td>
        <span className={"top-arrow"}/>
        <label>Quantity:</label>
      </td>
      <td>
        <input placeholder={"\u221e"} type={"number"} className={"quantity-input"} onBlur={onBlurInput} />
      </td>
    </tr>
    <tr>
      <td>
        <label>Unit:</label>
      </td>
      <td>
        <select className={"input unit-select"} onBlur={onBlurInput}>
          {ingredientDetails.units.map((unit) => <option key={unit} value={unit}>{unit}</option>)}
        </select>
      </td>
    </tr>
    </tbody>
  </table>
));

export default IngredientQuantityPicker;