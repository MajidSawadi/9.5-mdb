import * as types from "../constants/movie.constants";

const initialState = {
  movies: [],
  loading: false
};

const movieReducer = (state = initialState, action) => {
   const { type, payload } = action;

  switch (type) {
    case types.FETCH_START:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        movies: payload,
      };
    case types.FETCH_FAILURE:
    default:
      return state;
  }
};

export default movieReducer;
