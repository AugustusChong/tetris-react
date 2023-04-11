import React from "react";
import { useSelector } from "react-redux";
import "../../styles/message.css";

export default function MessagePopup(props) {
  const game = useSelector((state) => state.game);
  const { isRunning, gameOver } = game;
  let messageClass = "";
  let message = "";

  if (!isRunning && !gameOver) {
    messageClass = "message-popup hidden";
  } else if (!isRunning) {
    messageClass = "message-popup";
    message = "Paused";
  } else if (gameOver) {
    messageClass = "message-popup";
    message = "Game Over";
  }

  return (
    <div className={messageClass}>
      <h1>{message}</h1>
    </div>
  );
}
