import React from "react";
import BookCard from "../BookCard/BookCard";

const BorrowedBook = () => {
  return (
    <div className="bg-green-300 rounded-md shadow px-6 py-4 w-full flex my-4">
      <div className="w-1/4">
        <BookCard title={"Book Name"} image={"img/book.png"} />
      </div>
      <div className="w-2/4 flex flex-col justify-end">
        <p>Title:</p>
        <p>Author:</p>
        <p>Rating: </p>
        <p>Return date:</p>
      </div>
      <div className="w-1/4 flex flex-col justify-end items-center">
        <button className="w-1/2 bg-orange-400 px-4 py-3 text-white rounded">
          Return book
        </button>
      </div>
    </div>
  );
};

export default BorrowedBook;
