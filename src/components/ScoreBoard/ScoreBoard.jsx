import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import { pause, resume, restart } from "../../actions";
import { pause, resume, restart } from "../../reducers/gameSlice";
import "../../styles/game.css";

export default function ScoreBoard(props) {
  const dispatch = useDispatch();
  const { score, isRunning, gameOver } = useSelector((state) => state.game);

  return (
    <React.Fragment>
      <div className="score-board">
        <div>Score:{score}</div>
        <div>Level: 1</div>
      </div>
      <div className="score-board-buttons">
        <button
          className="score-board-button"
          onClick={(e) => {
            if (gameOver) {
              return;
            }
            if (isRunning) {
              dispatch(pause());
            } else {
              dispatch(resume());
            }
          }}
        >
          {isRunning ? "Pause" : "Play"}
        </button>
        <button
          className="score-board-button"
          onClick={(e) => {
            dispatch(restart());
          }}
        >
          Restart
        </button>
      </div>
    </React.Fragment>
  );
}
