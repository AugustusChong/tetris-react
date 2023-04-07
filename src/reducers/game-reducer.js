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

const gameReducer = (state = {}, action) => {
  switch (action.type) {
    case MOVE_RIGHT:
      return state;
    case MOVE_LEFT:
      return state;
    case ROTATE:
      return state;
    case MOVE_DOWN:
      return state;
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
