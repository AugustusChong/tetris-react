import { createSlice } from "@reduxjs/toolkit";
import { produce } from "immer";
import {
  defaultState,
  canMoveTo,
  nextRotation,
  addBlockToGrid,
  checkRows,
  randomShape,
} from "../utils";

const gameSlice = createSlice({
  name: "game",
  initialState: defaultState(),
  reducers: {
    moveRight: (state) => {
      const { shape, grid, x, y, rotation } = state;
      if (canMoveTo(shape, grid, x + 1, y, rotation)) {
        return {
          ...state,
          x: x + 1,
        };
      }
    },
    moveLeft: (state) => {
      const { shape, grid, x, y, rotation } = state;
      if (canMoveTo(shape, grid, x - 1, y, rotation)) {
        return {
          ...state,
          x: x - 1,
        };
      }
    },
    rotate: (state) => {
      const { shape, grid, x, y, rotation } = state;
      const newRotation = nextRotation(shape, rotation);
      if (canMoveTo(shape, grid, x, y, newRotation)) {
        return {
          ...state,
          rotation: newRotation,
        };
      }
    },
    moveDown: (state) => {
      const {
        shape,
        grid,
        x,
        y,
        rotation,
        nextShape,
        isRunning,
        score,
        speed,
        rowsCompleted,
      } = state;
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
        const newState = { ...state };
        newState.shape = 0;
        newState.grid = newGrid;
        return {
          ...state,
          gameOver: true,
        };
      }

      // const newState = defaultState();
      // newState.grid = newGrid;
      // newState.shape = nextShape;
      // newState.isRunning = isRunning;
      // newState.score = score + checkRows(newGrid);
      // return newState;

      return produce(state, (draftState) => {
        draftState = defaultState();
        draftState.grid = newGrid;
        draftState.shape = nextShape;
        draftState.isRunning = isRunning;
        draftState.score = score + checkRows(newGrid);
      });

      // return {
      //   ...state,
      //   grid: newGrid,
      //   shape: nextShape,
      //   isRunning: isRunning,
      //   score: score + checkRows(newGrid),
      //   rotation: 0,
      //   x: 5,
      //   y: -4,
      //   nextShape: randomShape(),
      //   speed: speed + 50,
      //   gameOver: false,
      //   rowsCompleted: rowsCompleted + 1,
      // };
    },
    pause: (state) => {
      state.isRunning = false;
    },
    resume: (state) => {
      state.isRunning = true;
    },
    gameOver: (state) => {
      state.gameOver = true;
    },
    restart: () => {
      return defaultState();
    },
  },
});

export const {
  moveRight,
  moveLeft,
  rotate,
  moveDown,
  pause,
  resume,
  gameOver,
  restart,
} = gameSlice.actions;

export default gameSlice.reducer;
