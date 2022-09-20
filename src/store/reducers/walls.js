import {walls} from '../../constants/images';
import {SET_WALLS, TOGGLE_FAV} from '../actions/walls';

const initialState = {
  walls: [],
  favWalls: [],
};

const wallsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAV:
      const wallIndex = state.favWalls.findIndex(
        wall => wall.id === action.wallId,
      );
      if (wallIndex >= 0) {
        const updatedFavWalls = [...state.favWalls];
        updatedFavWalls.splice(wallIndex, 1);
        return {...state, favWalls: updatedFavWalls};
      } else {
        const newFavWall = state.walls.find(wall => wall.id === action.wallId);
        return {...state, favWalls: state.favWalls.concat(newFavWall)};
      }

    case SET_WALLS:
      return {...state, walls: action.fetchedWalls};

    default:
      return state;
  }
};

export default wallsReducer;
