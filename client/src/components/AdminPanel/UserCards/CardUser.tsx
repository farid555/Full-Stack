import { useEffect, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { toast } from "react-toastify";
import api from "../../../api";
import { useNavigate } from "react-router-dom";

interface UserInfo {
  image: string;
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  status: string;
}

const CardUser = ({
  firstName,
  lastName,
  email,
  image,
  id,
  status,
}: UserInfo) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const navigate = useNavigate();

  const handleDelete = async () => {
    const res = await api.delete(`/api/v1/users/${id}`);
    console.log(res.status);
    if (res.status === 204) {
      toast.success("User deleted successfully!");
      navigate("/admin");
    }
  };

  return (
    <>
      <div className="relative">
        <button
          onClick={handleOpen}
          className="absolute top-1 right-2 text-black z-50 hover:text-red-600 cursor-pointer"
        >
          X
        </button>
        <div
          className={
            status === "active"
              ? "bg-gray-400 relative flex flex-col items-center justify-center rounded-lg pt-8 pb-4"
              : "bg-red-300 relative flex flex-col items-center justify-center rounded-lg pt-8 pb-4"
          }
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
                  className="absolute z-50 top-2 right-3 cursor-pointer"
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

          <div>
            <img
              src={image}
              className="h-20 w-20 rounded-full cursor-pointer hover:border-2 hover:border-white"
              alt="profile pic"
              onClick={() => navigate(`/edit/user/${id}`)}
            />
          </div>
          <div className="mt-2">
            <p
              onClick={() => navigate(`/edit/user/${id}`)}
              className=" cursor-pointer text-center text-sm text-white hover:text-blue-600"
            >{`${firstName} ${lastName}`}</p>
            <p
              onClick={() => navigate(`/edit/user/${id}`)}
              className=" cursor-pointer text-center text-sm text-white hover:text-blue-600"
            >
              {email}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardUser;
