import { useEffect, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { toast } from "react-toastify";
import api from "../../../api";
import { AxiosResponse } from "axios";

interface UserInfo {
  image: string;
  firstName: string;
  lastName: string;
  email: string;
  id: string;
}

interface IUser {
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  phone: string;
  address: string;
  gender: string;
  image: string;
  password: string;
  borrowBook: {
    bookId: string;
    getBorrow: Date;
    returnBook: Date;
  }[];
}

const CardUser = ({ firstName, lastName, email, image, id }: UserInfo) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | undefined>();

  useEffect(() => {
    const getUserInfo = async () => {
      setLoading(true);
      const res: AxiosResponse<IUser> = await api.get(`api/v1/users/${id}`);
      const data: IUser = res.data;
      setUser(data);
      setLoading(false);
    };
    getUserInfo();
  }, []);

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleDelete = async () => {
    const res = await api.delete(`/api/v1/users/${id}`);
    console.log(res.status);
    if (res.status === 204) {
      window.location.reload();
    }
  };

  return (
    <>
      {isUpdateFormOpen && (
        <div className="fixed inset-0 z-30 flex items-center justify-center">
          <div
            className="fixed inset-0 z-40"
            style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
            onClick={() => setIsUpdateFormOpen(false)}
          ></div>
          <div className="relative z-50 bg-white p-20 rounded-md">
            <button
              className="absolute top-2 right-3 cursor-pointer"
              onClick={() => setIsUpdateFormOpen(false)}
            >
              X
            </button>
            {loading ? (
              <p>...</p>
            ) : (
              <>
                <div className="bg-gray-800 absolute left-1/2 transform -translate-x-1/2 -translate-y-32 rounded-full p-1">
                  <img src={user?.image} className="h-32 w-32 rounded-full" />
                </div>
                <form className="p-12 md:p-24">
                  <div className="flex items-center text-lg mb-6 md:mb-8">
                    <svg
                      className="absolute ml-3"
                      width="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z" />
                    </svg>
                    <input
                      type="text"
                      id="username"
                      className="bg-gray-200 pl-12 py-2 md:py-4 focus:outline-none w-full"
                      placeholder="Username"
                    />
                  </div>
                  <div className="flex items-center text-lg mb-6 md:mb-8">
                    <svg
                      className="absolute ml-3"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z" />
                    </svg>
                    <input
                      type="password"
                      id="password"
                      className="bg-gray-200 pl-12 py-2 md:py-4 focus:outline-none w-full"
                      placeholder="Password"
                    />
                  </div>
                  <button className="bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-2 md:p-4 text-white uppercase w-full">
                    Login
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
      <div
        className="relative bg-gray-400 cursor-pointer flex flex-col items-center justify-center rounded-lg pt-8 pb-4 "
        onClick={() => setIsUpdateFormOpen(true)}
      >
        {isOpen && (
          <div className="fixed inset-0 z-30 flex items-center justify-center">
            <div
              className="fixed inset-0 z-40"
              style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
              onClick={handleOpen}
            ></div>
            <div className="relative z-50 bg-white p-20 rounded-md">
              <div
                className="absolute top-2 right-3 cursor-pointer"
                onClick={handleOpen}
              >
                X
              </div>
              <h1 className="text-2xl font-semibold">
                Are you sure, you want to delete?
              </h1>
              <div className="mt-4 flex justify-center items-center space-x-10">
                <button
                  onClick={handleDelete}
                  className="px-6 py-2 bg-red-600 text-white rounded"
                >
                  Yes
                </button>
                <button
                  onClick={handleOpen}
                  className="px-6 py-2 bg-green-600 text-white rounded"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={handleOpen}
          className="absolute top-1 right-2 text-black hover:text-red-600 cursor-pointer"
        >
          X
        </button>
        <div>
          <img src={image} className="h-20 w-20 rounded-full" />
        </div>
        <div className="mt-2">
          <p className="text-center text-sm text-white">{`${firstName} ${lastName}`}</p>
          <p className="text-center text-sm text-white">{email}</p>
        </div>
      </div>
    </>
  );
};

export default CardUser;
