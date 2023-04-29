import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { run, restart } from "../../features/game/gameSlice";
import "../../styles/game.css";

export default function ScoreBoard() {
  const dispatch = useDispatch();
  const { score, isRunning, gameOver, rowsCompleted, level } = useSelector(
    (state) => state
  );

  return (
    <React.Fragment>
      <div className="score-board">
        <div>Score:{score}</div>
        <div>Level:{level}</div>
        <div>Lines:{rowsCompleted}</div>
      </div>
      <div className="score-board-buttons">
        <button
          className="score-board-button"
          onClick={(e) => {
            if (gameOver) {
              return;
            }
            if (isRunning) {
              dispatch(run(false));
            } else {
              dispatch(run(true));
            }
          }}
        >
          {isRunning ? (
            <FontAwesomeIcon icon={faPause} size="lg" />
          ) : (
            <FontAwesomeIcon icon={faPlay} size="lg" />
          )}
        </button>
        <button
          className="score-board-button"
          onClick={(e) => {
            dispatch(restart());
          }}
        >
          <FontAwesomeIcon icon={faPowerOff} size="lg" />
        </button>
      </div>
    </React.Fragment>
  );
}
