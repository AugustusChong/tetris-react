import React from "react";
import { useSelector } from "react-redux";
import { shapes } from "../../utils";
import GridSquare from "../GridSquare/GridSquare";

export default function NextBlock() {
  const { nextShape } = useSelector((state) => state);
  const tetromino = shapes[nextShape][0];

  const grid = tetromino.map((rowArray, row) => {
    return rowArray.map((square, col) => {
      return (
        <GridSquare key={`${row}${col}`} color={square === 0 ? 0 : nextShape} />
      );
    });
  });

  return <div className="next-block">{grid}</div>;
}
