import { RefObject } from "react";

export const getHeight = (ref: RefObject<any>) => (
  ref.current
    ? ref.current.getBoundingClientRect().height
    : 0
);