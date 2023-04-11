import React from "react";
import { useSelector } from "react-redux";
import "../../styles/message.css";

export default function MessagePopup(props) {
  const { isRunning, gameOver } = useSelector((state) => state.game);
  let message = "";
  let messageClass = "message-popup";

  if (isRunning || (!isRunning && !gameOver)) {
    messageClass += " hidden";
  } else if (!isRunning) {
    message = "Paused";
  } else if (gameOver) {
    message = "Game Over";
  }

  return (
    <div className={messageClass}>
      <h1>{message}</h1>
    </div>
  );
}
