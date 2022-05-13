import React, { useEffect } from "react";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppSelector, useAppDispatch } from "../../hooks/useRedux";
import { login, reset } from "../../redux/features/auth/authSlice";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset);
  }, [isError, isSuccess, user]);

  const handleLogin = async (
    res: GoogleLoginResponse | GoogleLoginResponseOffline,
  ) => {
    let result;
    if ("profileObj" in res) {
      result = res.profileObj;
      dispatch(login(result));
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="border flex flex-col items-center justify-center border-red-600 rounded-md p-20 shadow-lg">
        <h1 className="font-title text-6xl my-6">Please login to access</h1>
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
