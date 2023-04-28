import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  moveLeft,
  moveRight,
  moveDown,
  rotate,
  holdBlock,
} from "../../features/game/gameSlice";
import "../../styles/game.css";

export default function Controls() {
  const dispatch = useDispatch();
  const { isRunning, gameOver, speed } = useSelector((state) => state);
  const requestRef = useRef();
  const lastUpdateTimeRef = useRef(0);
  const progressTimeRef = useRef(0);

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
      case 67:
        dispatch(holdBlock());
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
