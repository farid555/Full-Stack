import React, { useEffect, useState } from "react";
import NavMenus from "./NavMenus";
import SearchBar from "./SearchBar";
import ProfileIcon from "./ProfileIcon";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import api from "../../api";
import { AxiosResponse } from "axios";

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
  role: string;
}

interface IUserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  gender: string;
  image: string;
}

function Navbar() {
  const [userImage, setUserImage] = useState("");
  const { user }: IState = useAppSelector((state) => state.auth);

  useEffect(() => {
    const getUserPhoto = async () => {
      const res: AxiosResponse<IUserData> = await api.get(
        `api/v1/users/${user?._id}`
      );
      const data: IUserData = res.data;
      setUserImage(data.image);
    };
    getUserPhoto();
  }, [user]);

  return (
    <nav className="z-50 bg-black w-full fixed top-0 left-0 flex justify-between items-center flex-row py-5 px-10">
      <div className="w-2/12">
        <Link to="/">
          <h1 className="text-white text-xl font-bold">BookStore</h1>
        </Link>
      </div>
      <div className="w-10/12 flex justify-end items-center">
        <NavMenus />
        <SearchBar />
        {user && user?.role === "admin" && (
          <Link to="/admin">
            <button className="bg-white rounded-md mx-4 text-black px-4 py-2">
              Dashboard
            </button>
          </Link>
        )}
        <div className="mx-4">
          {user ? (
            <img
              src={userImage}
              alt="user"
              className="h-10 w-10 rounded-full"
            />
          ) : (
            <ProfileIcon />
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
