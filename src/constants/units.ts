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

export enum LengthUnit {
  mm = "mm",
  cm = "cm",
  m = "m",
  inch = "in",
  ft = "ft"
}

type Unit = MassUnit | VolumeUnit | LengthUnit;

export default Unit;