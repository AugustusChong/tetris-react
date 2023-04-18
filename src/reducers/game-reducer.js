import {
  defaultState,
  nextRotation,
  canMoveTo,
  addBlockToGrid,
  checkRows,
} from "../utils";

import {
  MOVE_RIGHT,
  MOVE_LEFT,
  ROTATE,
  MOVE_DOWN,
  PAUSE,
  RESUME,
  GAME_OVER,
  RESTART,
} from "../actions";

const gameReducer = (state = defaultState(), action) => {
  const { shape, grid, x, y, rotation, nextShape, score, isRunning } = state;

  switch (action.type) {
    case MOVE_RIGHT:
      if (canMoveTo(shape, grid, x + 1, y, rotation)) {
        return {
          ...state,
          x: x + 1,
        };
      }
      return state;
    case MOVE_LEFT:
      if (canMoveTo(shape, grid, x - 1, y, rotation)) {
        return {
          ...state,
          x: x - 1,
        };
      }
      return state;
    case ROTATE:
      const newRotation = nextRotation(shape, rotation);
      if (canMoveTo(shape, grid, x, y, newRotation)) {
        return {
          ...state,
          rotation: newRotation,
        };
      }
      return state;
    case MOVE_DOWN:
      const potentialY = y + 1;
      if (canMoveTo(shape, grid, x, potentialY, rotation)) {
        return {
          ...state,
          y: potentialY,
        };
      }
      const obj = addBlockToGrid(shape, grid, x, y, rotation);
      const newGrid = obj.grid;
      const gameOver = obj.gameOver;

      if (gameOver) {
        return {
          ...state,
          shape: 0,
          gameOver: true,
          grid: newGrid,
        };
      } else {
        let newState = defaultState();
        newState.grid = newGrid;
        newState.shape = nextShape;
        newState.isRunning = isRunning;
        newState.score = score + checkRows(newGrid);
        return newState;
      }
    case PAUSE:
      return { ...state, isRunning: false };
    case RESUME:
      return { ...state, isRunning: true };
    case GAME_OVER:
      return { ...state, gameOver: true };
    case RESTART:
      return defaultState();
    default:
      return state;
  }
};

export default gameReducer;
