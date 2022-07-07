import React, { useEffect, useState } from "react";
import NavMenus from "./NavMenus";
import SearchBar from "./SearchBar";
import ProfileIcon from "./ProfileIcon";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import api from "../../api";
import { AxiosResponse } from "axios";
import { logout } from "../../redux/features/auth/authSlice";
import NavCart from "./NavCart";

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
  const [showMenu, setShowMenu] = useState(false);
  const { user }: IState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      const getUserPhoto = async () => {
        const res: AxiosResponse<IUserData> = await api.get(
          `api/v1/users/${user?._id}`
        );
        const data: IUserData = res.data;
        setUserImage(data.image);
      };
      getUserPhoto();
    }
  }, [user]);

  console.log(showMenu);

  return (
    <nav className="z-50 bg-black w-full fixed top-0 left-0 flex justify-between items-center flex-row py-5 px-10">
      <div className="w-2/12">
        <Link to="/">
          <h1 className="text-white text-xl font-bold">BookStore</h1>
        </Link>
      </div>
      <div className="w-10/12 flex justify-end items-center space-x-6">
        <NavMenus />
        <SearchBar />
        <NavCart />
        {user && user?.role === "admin" && (
          <Link to="/admin">
            <button className="bg-white rounded-md mx-4 text-black px-4 py-2">
              Dashboard
            </button>
          </Link>
        )}

        <div className="mx-4">
          {user ? (
            <div className="relative">
              <img
                src={userImage}
                alt="user"
                className="h-10 w-10 rounded-full"
                onClick={() => setShowMenu((prev) => !prev)}
              />
              {showMenu && (
                <div className="absolute -bottom-20 right-2 w-48 bg-white">
                  <div className="cursor-pointer px-4 py-2 hover:bg-gray-200">
                    <Link to="/update_profile">Update Profile</Link>
                  </div>
                  <div
                    className="cursor-pointer px-4 py-2 hover:bg-gray-200"
                    onClick={() => dispatch(logout())}
                  >
                    Log out
                  </div>
                </div>
              )}
            </div>
          ) : (
            <ProfileIcon />
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
