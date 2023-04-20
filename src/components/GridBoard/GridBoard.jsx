import React from "react";
import { useSelector } from "react-redux";
import { shapes } from "../../utils";
import GridSquare from "../GridSquare/GridSquare";

export default function GridBoard() {
  const { grid, shape, rotation, x, y } = useSelector((state) => state);
  const block = shapes[shape][rotation];
  const blockColor = shape;

  const gridSquares = grid.map((rowArray, row) => {
    return rowArray.map((square, col) => {
      const blockX = col - x;
      const blockY = row - y;
      let color = square;

      if (
        blockX >= 0 &&
        blockX < block.length &&
        blockY >= 0 &&
        blockY < block.length
      ) {
        color = block[blockY][blockX] === 0 ? color : blockColor;
      }

      const key = row * grid[0].length + col;

      return <GridSquare key={key} color={color} />;
    });
  });

  return <div className="grid-board">{gridSquares}</div>;
}
