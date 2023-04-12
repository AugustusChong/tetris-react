import {
  defaultState,
  nextRotation,
  canMoveTo,
  addBlockToGrid,
  checkRows,
  randomShape,
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
      const newGrid = addBlockToGrid(shape, grid, x, y, rotation);
      const newState = defaultState();
      newState.grid = newGrid;
      newState.shape = nextShape;
      newState.nextShape = randomShape();
      newState.score = score;
      newState.isRunning = isRunning;
      if (!canMoveTo(nextShape, newGrid, 0, 4, 0)) {
        console.log("Game over");
        newState.shape = 0;
        return {
          ...newState,
          gameOver: true,
        };
      }
      newState.score = score + checkRows(newGrid);
      return newState;
    case PAUSE:
      return state;
    case RESUME:
      return state;
    case GAME_OVER:
      return state;
    case RESTART:
      return state;
    default:
      return state;
  }
};

export default gameReducer;
