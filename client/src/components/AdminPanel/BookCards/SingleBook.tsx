import React, { useEffect, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AxiosResponse } from "axios";
import api from "../../../api";

interface BookInfo {
  Book: {
    title: string;
    author: string[];
    image: string;
  };
}

interface IAuthor {
  _id: string;
  firstName: string;
  lastName: string;
}

const SingleBook = ({ title, author, image }: BookInfo["Book"]) => {
  const [authors, setAuthors] = useState<IAuthor[]>([]);

  useEffect(() => {
    let didCancel = false;
    const getAuthorName = async () => {
      if (!didCancel) {
        try {
          author.forEach(async (obj) => {
            const res: AxiosResponse<IAuthor> = await api.get(
              `api/v1/authors/${obj}`,
            );
            const data: IAuthor = res.data;
            setAuthors((prev) => [...prev, data]);
          });
        } catch (err) {
          console.log(err);
        }
      }
    };
    getAuthorName();
    return () => {
      didCancel = true;
    };
  }, [author]);

  console.log(authors);
  return (
    <>
      {authors.length > 0 && (
        <div className="z-0 relative bg-gray-400 flex flex-col items-center justify-center rounded-lg pt-8 pb-4">
          <div className="absolute top-2 right-2">
            <RiDeleteBin5Line className="h-8 w-8 text-red-300" />
          </div>
          <div>
            <img className="h-48 w-48 mb-2" src={image} alt="book" />
          </div>
          <div>
            <p className="text-black text-xl mt-2 text-center">{title}</p>
          </div>
          <div>
            <p>
              {authors && `${authors[0].firstName} ${authors[0].lastName}`}
              {authors.length > 1 ? "..." : ""}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleBook;
