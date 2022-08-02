import convert from "convert-units";

export enum MassUnit {
  mg = "mg",
  g = "g",
  kg = "kg",
  oz = "oz",
  lb = "lb"
}

export enum VolumeUnit {
  ml = "ml",
  l = "l",
  tsp = "tsp",
  tbsp = "Tbs",
  flOz = "fl-oz",
  cup = "cup",
  pint = "pnt",
  qt = "qt",
  gal = "gal"
}

enum FirestoreMassUnit {
  g = "g",
  kg = "kg",
  oz = "ounce",
  lb = "pound"
}

enum FirestoreVolumeUnit {
  ml = "ml",
  l = "liter",
  tsp = "teaspoon",
  tbsp = "tablespoon",
  cup = "cup",
  pint = "pint",
  qt = "quart",
  gal = "gallon"
}

export const FirestoreToRegularUnitConversion = {
  g: MassUnit.g,
  kg: MassUnit.kg,
  ounce: MassUnit.oz,
  pound: MassUnit.lb,
  ml: VolumeUnit.ml,
  liter: VolumeUnit.l,
  teaspoon: VolumeUnit.tsp,
  tablespoon: VolumeUnit.tbsp,
  cup: VolumeUnit.cup,
  pint: VolumeUnit.pint,
  quart: VolumeUnit.qt,
  gallon: VolumeUnit.gal
};

export type FirestoreUnit = FirestoreMassUnit | FirestoreVolumeUnit;
type Unit = MassUnit | VolumeUnit | string;

export const pluralUnit = (unit: Unit) => {
  try {
    return convert().describe(unit).plural.toLowerCase();
  } catch (e) {
    return unit;
  }
};

export const singleUnit = (unit: Unit) => {
  try {
    return convert().describe(unit).singular.toLowerCase();
  } catch (e) {
    return unit;
  }
};

export default Unit;