import React from "react";
import "../../styles/score-board.css";

export default function ScoreBoard(props) {
  return (
    <React.Fragment>
      <div className="score-board">
        <div>Score:{props.score}</div>
        <div>Level: 1</div>
      </div>
      <div className="score-board-buttons">
        <button className="score-board-button" onClick={(e) => {}}>
          Play
        </button>
        <button className="score-board-button" onClick={(e) => {}}>
          Restart
        </button>
      </div>
    </React.Fragment>
  );
}
