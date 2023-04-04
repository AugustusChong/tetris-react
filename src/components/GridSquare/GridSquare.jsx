import React from "react";
import "../../styles/grid.css";

export default function GridSquare(props) {
  const classes = `grid-square color-${props.color}`;

  return <div className={classes} />;
}
