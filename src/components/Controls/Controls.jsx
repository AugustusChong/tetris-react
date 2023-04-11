import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { moveLeft, moveRight, rotate, moveDown } from "../../actions";
import "../../styles/controls.css";

export default function Controls(props) {
  const dispatch = useDispatch();
  const isRunning = useSelector((state) => state.isRunning);

  return (
    <div className="controls">
      <button
        className="control-button"
        onClick={(e) => {
          dispatch(moveLeft());
        }}
      >
        Left
      </button>

      <button
        className="control-button"
        onClick={(e) => {
          dispatch(moveRight());
        }}
      >
        Right
      </button>

      <button
        className="control-button"
        onClick={(e) => {
          dispatch(rotate());
        }}
      >
        Rotate
      </button>

      <button
        className="control-button"
        onClick={(e) => {
          dispatch(moveDown());
        }}
      >
        Down
      </button>
    </div>
  );
}
