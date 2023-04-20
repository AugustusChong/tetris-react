import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { moveLeft, moveRight, rotate, moveDown } from "../../actions";
import {
  moveLeft,
  moveRight,
  rotate,
  moveDown,
} from "../../features/game/gameSlice";
import "../../styles/game.css";

export default function Controls(props) {
  const dispatch = useDispatch();
  const isRunning = useSelector((state) => state.isRunning);
  const gameOver = useSelector((state) => state.gameOver);

  const handleKeyPress = (e) => {
    switch (e.keyCode) {
      case 37:
        e.preventDefault();
        document.getElementById("leftButton").click();
        break;
      case 38:
        e.preventDefault();
        document.getElementById("rotateButton").click();
        break;
      case 39:
        e.preventDefault();
        document.getElementById("rightButton").click();
        break;
      case 40:
        e.preventDefault();
        document.getElementById("downButton").click();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className="controls">
      <button
        id="leftButton"
        disabled={!isRunning || gameOver}
        className="control-button"
        onClick={(e) => {
          if (!isRunning || gameOver) {
            return;
          }
          dispatch(moveLeft(1));
        }}
      >
        Left
      </button>

      <button
        id="rightButton"
        disabled={!isRunning || gameOver}
        className="control-button"
        onClick={(e) => {
          if (!isRunning || gameOver) {
            return;
          }
          dispatch(moveRight(1));
        }}
      >
        Right
      </button>

      <button
        id="rotateButton"
        disabled={!isRunning || gameOver}
        className="control-button"
        onClick={(e) => {
          if (!isRunning || gameOver) {
            return;
          }
          dispatch(rotate());
        }}
      >
        Rotate
      </button>

      <button
        id="downButton"
        disabled={!isRunning || gameOver}
        className="control-button"
        onClick={(e) => {
          if (!isRunning || gameOver) {
            return;
          }
          dispatch(moveDown(1));
        }}
      >
        Down
      </button>
    </div>
  );
}
