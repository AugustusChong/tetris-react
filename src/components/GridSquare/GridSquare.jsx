import React from "react";
import "../../styles/game.css";

export default function GridSquare({ color }) {
  const classes = `grid-square color-${color}`;

  return <div className={classes} />;
}
