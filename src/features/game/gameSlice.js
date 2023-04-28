import { createSlice } from "@reduxjs/toolkit";
import {
  defaultState,
  canMoveTo,
  nextRotation,
  addBlockToGrid,
  checkRows,
  randomShape,
} from "../../utils";

export const gameSlice = createSlice({
  name: "game",
  initialState: defaultState(),
  reducers: {
    run: (state, action) => {
      state.isRunning = action.payload;
      return state;
    },
    restart: (state, action) => defaultState(),
    moveRight: (state, action) => {
      const { shape, grid, x, y, rotation } = state;
      if (canMoveTo(shape, grid, x + action.payload, y, rotation)) {
        state.x = x + action.payload;
      }
      return state;
    },
    moveLeft: (state, action) => {
      const { shape, grid, x, y, rotation } = state;
      if (canMoveTo(shape, grid, x - action.payload, y, rotation)) {
        state.x = x - action.payload;
      }
      return state;
    },
    moveDown: (state, action) => {
      const { shape, grid, x, y, rotation, nextShape, rowsCompleted, speed } =
        state;
      const potentialY = y + action.payload;
      if (canMoveTo(shape, grid, x, potentialY, rotation)) {
        state.y = potentialY;
        state.canSwap = true;
        return state;
      }
      const { newGrid, gameOver } = addBlockToGrid(shape, grid, x, y, rotation);
      if (gameOver) {
        state.gameOver = true;
        state.isRunning = false;
        return state;
      }
      state.x = 3;
      state.y = -4;
      state.rotation = 0;
      state.grid = newGrid;
      state.shape = nextShape;
      state.nextShape = randomShape();
      // if (!canMoveTo(nextShape, newGrid, 0, 4, 0)) {
      //   state.shape = 0;
      //   state.gameOver = true;
      //   state.isRunning = false;
      //   return state;
      // }
      const { score, completedRows } = checkRows(newGrid);
      const newRowsCompleted = rowsCompleted + completedRows;
      state.score += score;
      state.rowsCompleted = newRowsCompleted;
      state.level = Math.floor(newRowsCompleted / 10) + 1;
      state.speed = Math.max(speed - completedRows * 10, 50);
      return state;
    },
    rotate: (state, action) => {
      const { shape, grid, x, y, rotation } = state;
      const newRotation = nextRotation(shape, rotation);
      if (canMoveTo(shape, grid, x, y, newRotation)) {
        state.rotation = newRotation;
      }
      return state;
    },
    holdBlock: (state, action) => {
      const { shape, heldShape, canSwap, isRunning, grid, x, y } = state;
      if (!isRunning) {
        return state;
      } else {
        if (!canSwap) {
          return state;
        }
        if (heldShape === 0) {
          state.heldShape = shape;
          state.shape = state.nextShape;
          state.nextShape = randomShape();
          state.canSwap = false;
          state.rotation = 0;
          return state;
        } else {
          if (canMoveTo(heldShape, grid, x, y, 0)) {
            state.heldShape = shape;
            state.shape = heldShape;
            state.canSwap = false;
            state.rotation = 0;
            return state;
          }
        }
      }
    },
  },
});

export const {
  run,
  restart,
  moveRight,
  moveLeft,
  moveDown,
  rotate,
  holdBlock,
} = gameSlice.actions;

export default gameSlice.reducer;
