export const TOGGLE_FAV = 'TOGGLE_FAV';
export const GET_WALLS = 'GET_WALLS';
export const SET_WALLS = 'SET_WALLS';

export const toggleFav = id => {
  return {type: TOGGLE_FAV, wallId: id};
};

export const setWalls = walls => {
  // return async dispatch => {
  //   const response = await fetch(
  //     'https://wall-app-cd559-default-rtdb.firebaseio.com/wallpapers.json',
  //   );
  //   const resData = await response.json();
  //   console.log('res', resData);
  //   dispatch({type: GET_WALLS, walls: resData});
  // };
  return {type: SET_WALLS, fetchedWalls: walls};
};
