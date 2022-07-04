import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import api from "../../api";
import { useAppSelector } from "../../hooks/useRedux";
import { toast } from "react-toastify";

interface IId {
  bookId: string | undefined;
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

interface IState {
  user: IUser | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}
interface IUser {
  _id: string;
  email: string;
  token: string;
}

const BookDetailsCard = ({ bookId }: IId) => {
  const [book, setBook] = useState<IBook>();
  const [authors, setAuthors] = useState<IAuthor[]>([]);
  const [userInfo, setUserInfo] = useState<IUserModel>();

  const { user }: IState = useAppSelector((state) => state.auth);

  useEffect(() => {
    const getBookInfo = async () => {
      try {
        const res: AxiosResponse<IBook> = await api.get(
          `api/v1/books/${bookId}`
        );
        const data: IBook = res.data;
        setBook(data);
        getAuthorName(data.author);
      } catch (err) {
        console.log(err);
      }
    };
    getBookInfo();
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
    try {
      const res: AxiosResponse<IUserModel> = await api.get(
        `api/v1/users/${user?._id}`
      );
      const data: IUserModel = await res.data;
      await setUserInfo(data);
      await updateUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateUser = async (data: IUserModel) => {
    const issueDate = new Date();
    const returnDate = new Date();
    returnDate.setDate(returnDate.getDate() + 15);
    const getBorrow = issueDate.toISOString().split("T")[0];
    const returnBook = returnDate.toISOString().split("T")[0];
    const newUser = {
      ...data,
      borrowBook: data?.borrowBook.concat([
        {
          bookId,
          getBorrow,
          returnBook,
        },
      ]),
    };
    const res2: AxiosResponse<IUserModel> = await api.put(
      `api/v1/users/${user?._id}`,
      newUser
    );
    console.log(res2.data);
    toast.success("Book borrowed successfully");
  };
  //console.log(userInfo);

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
              className="px-6 py-3 bg-cyan-400 rounded text-white"
              onClick={handleBorrow}
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
