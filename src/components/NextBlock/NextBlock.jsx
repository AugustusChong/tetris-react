import React from "react";
import { useSelector } from "react-redux";
import { shapes } from "../../utils";
import GridSquare from "../GridSquare/GridSquare";

export default function NextBlock() {
  const nextShape = useSelector((state) => state.nextShape);
  const tetrominoe = shapes[nextShape][0];

  const grid = tetrominoe.map((rowArray, row) => {
    return rowArray.map((square, col) => {
      const color = square ? nextShape : 0;
      return <GridSquare key={`${row}${col}`} color={color} />;
    });
  });

  return <div className="next-block">{grid}</div>;
}
