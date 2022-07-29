import React from "react";
import { MassUnit, VolumeUnit, LengthUnit } from "../constants/units";
import convert from "convert-units";
import "../stylesheets/IngredientQuantityPicker.scss";

type IngredientQuantityPickerProps = {
  ingredient: SearchedIngredient,
  ingredientDetails: IngredientOption,
  offset: number,
  hidden: boolean,
  onBlurInput: React.FocusEventHandler,
  onChange: (newValue: SearchedIngredient) => void
}

const IngredientQuantityPicker = React.forwardRef<HTMLTableElement, IngredientQuantityPickerProps>(({ ingredient, ingredientDetails, offset, hidden, onBlurInput, onChange }, ref) => {
  const [unit, setLocalUnit] = React.useState(MassUnit.mg);

  const inputValue = !ingredient.quantity ? "" : ingredient.quantity.toString();

  const setQuantity: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const numValue = parseFloat(e.target.value);
    if (numValue === 0) {
      onChange({ quantity: undefined, unit: undefined });
    } else if (!ingredient.unit) {
      onChange({ quantity: numValue, unit });
    } else {
      onChange({ quantity: numValue });
    }
  };

  const setUnit: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    onChange({ unit: e.target.value });
  };

  React.useEffect(() => {
    if (ingredient.unit) {
      setLocalUnit(ingredient.unit);
    }
  }, [ingredient.unit]);

  return (
    <table
      className={`ingredient-quantity-picker ${hidden ? "hidden" : ""}`}
      ref={ref}
      onClick={(e) => e.stopPropagation()}
      style={{left: offset}}
    >
      <tbody>
      <tr>
        <td>
          <span className={"top-arrow"}/>
          <label>Quantity:</label>
        </td>
        <td>
          <input
            placeholder={"\u221e"}
            type={"number"}
            className={"quantity-input"}
            onBlur={onBlurInput}
            onChange={setQuantity}
            value={inputValue}
          />
        </td>
      </tr>
      <tr>
        <td>
          <label>Unit:</label>
        </td>
        <td>
          <select value={unit} onChange={setUnit} className={"input unit-select"} onBlur={onBlurInput}>
            <option disabled>weight</option>
            {Object.values(MassUnit).map((unit) => (
              <option key={unit} value={unit}>&ensp;{convert().describe(unit).plural.toLowerCase()}</option>
            ))}
            <option disabled>volume</option>
            {Object.values(VolumeUnit).map((unit) => (
              <option key={unit} value={unit}>&ensp;{convert().describe(unit).plural.toLowerCase()}</option>
            ))}
            <option disabled>length</option>
            {Object.values(LengthUnit).map((unit) => (
              <option key={unit} value={unit}>&ensp;{convert().describe(unit).plural.toLowerCase()}</option>
            ))}
            {/*{ingredientDetails.units.map((unit) => <option key={unit} value={unit}>{unit}</option>)}*/}
          </select>
        </td>
      </tr>
      </tbody>
    </table>
  );
});

export default IngredientQuantityPicker;