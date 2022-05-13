import React from "react";

interface Iinfo {
  Book: {
    title: string;
    image: string;
  };
}

const BookCard = ({ title, image }: Iinfo["Book"]) => {
  return (
    <div className="bg-gray-300 px-10 py-6 min-w-max w-1/5 items-center justify-center rounded-lg hover:scale-105 transform transition-transform duration-300 ease-in-out shadow">
      <div className="flex min-w-full flex-col items-center justify-center">
        <div>
          <img className="h-32 w-32 mb-2" src={image} alt="book" />
        </div>
        <div>
          <p className="text-black text-lg mt-2 text-center">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
