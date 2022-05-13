import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import BookCard from "../BookCard/BookCard";

interface IBook {
  _id: string;
  title: string;
  image: string;
}

function BookCollection() {
  const [books, setBooks] = useState<IBook[]>([]);

  useEffect(() => {
    const getBooks = async () => {
      const res: AxiosResponse<IBook[]> = await api.get("api/v1/books");
      const data: IBook[] = res.data;
      setBooks(data);
    };
    getBooks();
  }, []);

  console.log(books);
  return (
    <div className="w-full pb-32 bg-blue-100">
      <div className="text-center py-10">
        <h1
          style={{ fontSize: "6rem" }}
          className="text-black font-bold font-title"
        >
          Book Collections....
        </h1>
      </div>
      <div className="container mx-auto">
        <div className="flex gap-4 overflow-x-scroll w-full">
          {books &&
            books.map((book) => (
              <Link to={`/books/${book._id}`}>
                <BookCard
                  key={book._id}
                  title={book.title}
                  image={book.image}
                />
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

export default BookCollection;
