import React, { useEffect, useState } from "react";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { FaLock, FaRegUserCircle } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api";
import { useAppSelector, useAppDispatch } from "../../hooks/useRedux";
import {
  login,
  reset,
  loginWithPassword,
} from "../../redux/features/auth/authSlice";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const { user, isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      if (user?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }

    dispatch(reset);
  }, [isError, isSuccess, user]);

  const handleLogin = async (
    res: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    let result;
    if ("profileObj" in res) {
      result = res.profileObj;
      dispatch(login(result));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === "" || email === "") {
      toast.error("Email or password is empty");
      return;
    }
    try {
      dispatch(loginWithPassword({ email, password }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <div className="bg-blue-200 border flex flex-col items-center justify-center w-1/2 border-blue-600 rounded-md p-20 shadow-lg">
        <h1 className="font-title text-6xl my-6">Login</h1>
        <form
          action=""
          className="mt-2 flex flex-col lg:w-1/2 w-8/12"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-wrap items-stretch w-full mb-4 relative h-15 bg-white items-center rounded mb-6 pr-10">
            <div className="flex -mr-px justify-center w-15 p-4">
              <span className="flex items-center leading-normal bg-white px-3 border-0 rounded rounded-r-none text-2xl text-gray-600">
                <FaRegUserCircle className="h-8 w-8" />
              </span>
            </div>
            <input
              type="text"
              className="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border-0 h-10 border-grey-light rounded rounded-l-none px-3 self-center relative  font-roboto text-xl outline-none"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="flex flex-wrap items-stretch w-full relative h-15 bg-white items-center rounded mb-4">
            <div className="flex -mr-px justify-center w-15 p-4">
              <span className="flex items-center leading-normal bg-white rounded rounded-r-none text-xl px-3 whitespace-no-wrap text-gray-600">
                <FaLock className="h-8 w-8" />
              </span>
            </div>
            <input
              type="password"
              className="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border-0 h-10 px-3 relative self-center font-roboto text-xl outline-none"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <div className="flex -mr-px">
              <span className="flex items-center leading-normal bg-white rounded rounded-l-none border-0 px-3 whitespace-no-wrap text-gray-600">
                <i className="fas fa-eye-slash"></i>
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-400 py-4 text-center px-17 md:px-12 md:py-4 text-white rounded leading-tight text-xl md:text-base font-sans text-base mt-4 mb-20"
          >
            Login
          </button>
        </form>
        <GoogleLogin
          clientId={String(process.env.REACT_APP_GOOGLE_CLIENT_ID)}
          buttonText="Login with Google"
          onSuccess={handleLogin}
          onFailure={(res) => {
            console.log("res", res);
          }}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    </div>
  );
};

export default LoginForm;
