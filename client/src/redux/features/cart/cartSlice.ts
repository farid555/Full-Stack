import { createSlice } from "@reduxjs/toolkit";

interface IBook {
  _id: string;
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
  books: IBook[];
  count: number;
}

const initialState: IState = {
  books: [],
  count: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.books.push(action.payload);
      state.count += 1;
    },
    clear: (state) => {
      state.books = [];
      state.count = 0;
    },
  },
});

export const { addBook, clear } = cartSlice.actions;
export default cartSlice.reducer;
