import React, { useState } from "react";
import { toast } from "react-toastify";
import api from "../../../api/index";

interface IAuthor {
  firstName: string;
  lastName: string;
}

const FormAddAuthor = () => {
  const [newAuthor, setNewAuthor] = useState<IAuthor>({
    firstName: "",
    lastName: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await api.post("api/v1/authors", newAuthor);
      console.log(data);
      setNewAuthor({
        firstName: "",
        lastName: "",
      })
      toast.success("Author added succesfully");
    } catch(error) {
      console.log(error);
      toast.error("Failed!")
    }
  }
    

  return (
    <div className="w-full bg-green-300 py-20">
      <div className="container mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col justify-center items-center">
            <input
              type="text"
              className="bg-gray-200 text-black text-lg my-4 px-6 py-4 rounded-md outline-none w-1/2"
              placeholder={"First Name"}
              value={newAuthor.firstName}
              onChange={(e) =>
                setNewAuthor({ ...newAuthor, firstName: e.target.value })
              }
            />
            <input
              type="text"
              className="bg-gray-200 text-black text-lg my-4 px-6 py-4 rounded-md outline-none w-1/2"
              placeholder={"Last Name"}
              value={newAuthor.lastName}
              onChange={(e) =>
                setNewAuthor({
                  ...newAuthor,
                  lastName: e.target.value,
                })
              }
            />

            <button
              type="submit"
              className="bg-green-600 px-2 py-3 text-white rounded-md"
            >
              Add new author
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormAddAuthor;
