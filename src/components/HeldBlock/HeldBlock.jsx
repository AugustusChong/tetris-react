import React from "react";
import { useSelector } from "react-redux";
import { shapes } from "../../utils";
import GridSquare from "../GridSquare/GridSquare";

export default function HeldBlock() {
  const { heldShape } = useSelector((state) => state);
  const tetromino = shapes[heldShape][0];

  const grid = tetromino.map((rowArray, row) => {
    return rowArray.map((square, col) => {
      return (
        <GridSquare key={`${row}${col}`} color={square === 0 ? 0 : heldShape} />
      );
    });
  });

  return (
    <div className="block-container held-container">
      <h3 className="block-header">Hold</h3>
      <div className="held-block">{grid}</div>
    </div>
  );
}
