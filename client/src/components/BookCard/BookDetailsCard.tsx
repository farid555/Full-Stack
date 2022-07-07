import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import api from "../../api";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { toast } from "react-toastify";
import { getBookInfoById } from "../../redux/features/book/bookSlice";
import { addBook } from "../../redux/features/cart/cartSlice";

interface IId {
  bookId: string | undefined;
}

interface IUserModel {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  gender: string;
  image: string;
  borrowBook: {
    bookId: string | undefined;
    getBorrow: string;
    returnBook: string;
  }[];
}

interface IAuthor {
  _id: string;
  firstName: string;
  lastName: string;
}

interface IStateUser {
  user: IUser | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

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

interface IStateBook {
  books: [IBook] | null;
  book: IBook | null;
}

interface IUser {
  _id: string;
  email: string;
  token: string;
}

const BookDetailsCard = ({ bookId }: IId) => {
  const [authors, setAuthors] = useState<IAuthor[]>([]);
  const [userInfo, setUserInfo] = useState<IUserModel>();
  const [borrowed, setBorrowed] = useState<boolean>(false);

  const { user }: IStateUser = useAppSelector((state) => state.auth);
  const { book }: IStateBook = useAppSelector((state) => state.book);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (bookId) {
      dispatch(getBookInfoById(bookId));
    }
  }, [bookId]);

  const getAuthorName = async (author: string[]) => {
    try {
      author.forEach(async (obj: string) => {
        const res: AxiosResponse<IAuthor> = await api.get(
          `api/v1/authors/${obj}`
        );
        //console.log("res:", res);

        const data: IAuthor = res.data;
        //console.log("data", data);

        setAuthors((prev) => [...prev, data]);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleBorrow = async () => {
    dispatch(addBook(book));
    setBorrowed(true);
  };

  return (
    <div className="container mx-auto flex justify-center items-center h-screen">
      <div className="border rounded shadow-md px-14 py-12 flex flex-col space-y-10 items-center w-1/2">
        {book && (
          <>
            <div className="w-1/4">
              <img src={book.image} className="h-32 w-32" alt="book logo" />
            </div>
            <div className="px-10 py-4 border w-3/4 leading-loose">
              <p>
                <span className="font-semibold">Title:</span> {book.title}
              </p>
              <p>
                <span className="font-semibold">Author</span>:&nbsp;
                {authors.map(
                  (author) => `${author.firstName} ${author.lastName}, `
                )}
              </p>
              <p>
                <span className="font-semibold">Genres</span>:&nbsp;
                {book.genres.map((genre) => `${genre}, `)}
              </p>
              <p>
                <span className="font-semibold">Published year:</span>&nbsp;
                {book.publishedYear}
              </p>
              <p>
                <span className="font-semibold">Rating:</span>&nbsp;
                {book.rating}
              </p>
              <p>
                <span className="font-semibold">Pages:</span>&nbsp;{book.pages}
              </p>
              <p>
                <span className="font-semibold">In stock:</span>&nbsp;
                {book.quantity}
              </p>
            </div>

            <button
              className="disabled:opacity-50 px-6 py-3 bg-cyan-400 rounded text-white"
              onClick={handleBorrow}
              disabled={book.quantity < 1 || borrowed ? true : false}
            >
              Borrow Book
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default BookDetailsCard;
