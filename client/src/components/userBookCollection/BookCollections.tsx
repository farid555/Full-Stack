import { AxiosResponse } from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import BookCard from "../BookCard/BookCard";

interface IBook {
  _id: string;
  title: string;
  image: string;
}

function BookCollections() {
  const [books, setBooks] = useState<IBook[]>([]);

  useEffect(() => {
    const getBooks = async () => {
      const res: AxiosResponse<IBook[]> = await api.get("api/v1/books");
      const data: IBook[] = res.data;
      setBooks(data);
    };
    getBooks();
  }, []);

  return (
    <div className="mt-32 min-h-screen mb-10 container mx-auto flex space-x-4">
      {books &&
        books.map((book) => (
          <Link to={`/books/${book._id}`}>
            <BookCard key={book._id} title={book.title} image={book.image} />
          </Link>
        ))}
    </div>
  );
}

export default BookCollections;
