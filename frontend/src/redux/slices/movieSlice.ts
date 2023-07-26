import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit';

interface MovieInfo {
  id?: number;
  _id: number;
  title: string;
  desc: string;
  duration: number;
  genre: string;
  language: string;
  releaseDate: string; // Change to string or number (timestamp) depending on your needs
  poster: string;
}

interface MovieState {
  movies: MovieInfo[];
  records: any[]; // Update 'any' to the appropriate type for records
}

const initialState: MovieState = {
  movies: [],
  records: [],
};

export const movieSlice = createSlice({
  name: 'movieSlice',
  initialState,
  reducers: {
    fetchAllMovies: (state: MovieState, action: PayloadAction<MovieInfo[]>) => {
      state.movies = action.payload;
    },
    setRecords: (state: MovieState, action: PayloadAction<any>) => {
      state.records = action.payload;
    },
  },
});

export const { fetchAllMovies, setRecords } = movieSlice.actions;

// Export the reducer without specifying 'any'
const movieReducer: Reducer<MovieState> = movieSlice.reducer;
export default movieReducer;
