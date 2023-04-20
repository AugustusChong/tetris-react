import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { shapes } from "../../utils";
import { moveDown } from "../../features/game/gameSlice";
import GridSquare from "../GridSquare/GridSquare";
// import { moveDown } from "../../actions";

export default function GridBoard(props) {
  const requestRef = useRef();
  const lastUpdateTimeRef = useRef(0);
  const progressTimeRef = useRef(0);
  const dispatch = useDispatch();

  const { grid, shape, rotation, x, y, isRunning, speed, gameOver } =
    useSelector((state) => state.game);

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

      const k = row * grid[0].length + col;

      return <GridSquare key={k} color={color} />;
    });
  });

  const update = (time) => {
    requestRef.current = requestAnimationFrame(update);
    if (!isRunning || gameOver) {
      return;
    }
    if (!lastUpdateTimeRef.current) {
      lastUpdateTimeRef.current = time;
    }
    const deltaTime = time - lastUpdateTimeRef.current;
    progressTimeRef.current += deltaTime;
    if (progressTimeRef.current > speed) {
      dispatch(moveDown(1));
      progressTimeRef.current = 0;
    }
    lastUpdateTimeRef.current = time;
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(requestRef.current);
  }, [isRunning]);

  return <div className="grid-board">{gridSquares}</div>;
}
