import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import bookService from "./bookService";

export const getBookInfoById = createAsyncThunk(
  "book/id",
  async (id: string, thunkAPI) => {
    try {
      return await bookService.getBookInfoById(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

interface IBook {
  title: string;
  publishedYear: number;
  genres: string[];
  pages: number;
  rating: number;
  quantity: number;
  image: string;
  author: string[];
  userBorrowBook: string[];
}

interface IState {
  books: [IBook] | null;
  book: IBook | null;
}

const initialState: IState = {
  books: null,
  book: null,
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBookInfoById.fulfilled, (state, action) => {
      state.book = action.payload;
    });
  },
});

export default bookSlice.reducer;
