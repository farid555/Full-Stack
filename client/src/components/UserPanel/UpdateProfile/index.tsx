import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../api";
import { useAppSelector } from "../../../hooks/useRedux";
import bcrypt from "bcryptjs";

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
  status: string;
  borrowBook:
    | {
        bookId: string;
        getBorrow: Date;
        returnBook: Date;
      }[];
}

const UpdateProfile = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [newUser, setNewUser] = useState<Partial<IUser>>({});
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [disable, setDisable] = useState(false);

  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      const getUserInfo = async () => {
        setLoading(true);
        const res: AxiosResponse<IUser> = await api.get(
          `api/v1/users/${user._id}`
        );
        const data: IUser = res.data;
        setNewUser(data);
        setLoading(false);
      };
      getUserInfo();
    }
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name in newUser) {
      setNewUser({ ...newUser, [e.target.name]: e.target.value });
    }
  };

  const handleFileInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;

    const base64: string = await getBase64(e.target.files[0]);
    setNewUser({ ...newUser, image: base64 });
  };

  const getBase64 = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      let baseUrl: string | ArrayBuffer | null = "";
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        baseUrl = reader.result;
        resolve(String(baseUrl));
      };
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisable(true);
    if (oldPassword === "" && newPassword === "" && confirmPassword === "") {
      const res = await api.put(`api/v1/users/${user?._id}`, newUser);
      if (res.statusText === "OK") {
        toast.success("User updated!");
        navigate("/user_info");
      }
    } else {
      if (!(await bcrypt.compare(oldPassword, String(newUser.password)))) {
        toast.error("Old password is not correct");
        return;
      }
      if (newPassword !== confirmPassword) {
        setMessage("password does not match");
        return;
      }

      setNewUser({ ...newUser, password: newPassword });

      const res = await api.put(`api/v1/users/${user?._id}`, newUser);
      if (res.statusText === "OK") {
        toast.success("User updated!");
        navigate("/user_info");
      }
    }
  };

  return (
    <div className="mt-48 mb-32 min-h-screen">
      {!loading && (
        <div className="relative z-50 bg-white p-20 rounded-md">
          <div className="bg-gray-800 absolute left-1/2 transform -translate-x-1/2 -translate-y-32 rounded-full p-1">
            <img src={newUser?.image} className="h-32 w-32 rounded-full" />
          </div>
          <form className="p-12 md:p-24" onSubmit={handleSubmit}>
            <div className="flex space-x-4 mb-8">
              <input
                name="firstName"
                className="w-1/2 px-2 py-2 bg-gray-200 focus:outline-none text-lg"
                type="text"
                placeholder="First name"
                onChange={handleInput}
                value={newUser?.firstName || ""}
                required
              />
              <input
                name="lastName"
                className="w-1/2 px-2 py-2 bg-gray-200 focus:outline-none text-lg"
                type="text"
                placeholder="Last name"
                onChange={handleInput}
                value={newUser?.lastName || ""}
                required
              />
            </div>
            <div className="flex space-x-4 mb-8">
              <input
                name="email"
                className="w-1/2 px-2 py-2 bg-gray-200 focus:outline-none text-lg"
                type="email"
                placeholder="Email"
                onChange={handleInput}
                value={newUser?.email || ""}
                required
              />
              <input
                name="phone"
                className="w-1/2 px-2 py-2 bg-gray-200 focus:outline-none text-lg"
                type="text"
                placeholder="Phone"
                onChange={handleInput}
                value={newUser?.phone || ""}
              />
            </div>
            <div className="flex space-x-4 mb-8">
              <input
                className="w-1/2 px-2 py-2 bg-gray-200 focus:outline-none text-lg"
                type="file"
                placeholder="image"
                onChange={handleFileInputChange}
              />
              <input
                className="w-1/2 px-2 py-2 bg-gray-200 focus:outline-none text-lg"
                type="password"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div className="flex space-x-4 mb-8">
              <input
                className="w-1/2 px-2 py-2 bg-gray-200 focus:outline-none text-lg"
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <div className="w-1/2">
                <input
                  className="w-full px-2 py-2 bg-gray-200 focus:outline-none text-lg"
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setMessage("");
                  }}
                />
                {message && <p className="text-sm text-red-600">{message}</p>}
              </div>
            </div>
            <button
              disabled={disable}
              className="cursor-pointer bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-2 md:p-4 text-white uppercase w-full disabled:opacity-75 disabled:cursor-wait"
            >
              Update
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateProfile;
