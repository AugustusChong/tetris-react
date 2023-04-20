import { createSlice } from "@reduxjs/toolkit";
import { produce } from "immer";
import {
  gridDefault,
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
    },
    restart: (state, action) => {
      return defaultState();
    },
    moveRight: (state, action) => {
      const { shape, grid, x, y, rotation } = state;
      if (canMoveTo(shape, grid, x + 1, y, rotation)) {
        return {
          ...state,
          x: x + action.payload,
        };
      }
    },
    moveLeft: (state, action) => {
      const { shape, grid, x, y, rotation } = state;
      if (canMoveTo(shape, grid, x - 1, y, rotation)) {
        return {
          ...state,
          x: x - action.payload,
        };
      }
    },
    moveDown: (state, action) => {
      console.log(state);
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
      const potentialY = y + action.payload;

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
        console.log(draftState);
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
    rotate: (state, action) => {
      const { shape, grid, x, y, rotation } = state;
      const newRotation = nextRotation(shape, rotation);
      if (canMoveTo(shape, grid, x, y, newRotation)) {
        return {
          ...state,
          rotation: newRotation,
        };
      }
    },
  },
});

export const { moveRight, moveLeft, rotate, moveDown, run, restart } =
  gameSlice.actions;

export default gameSlice.reducer;
