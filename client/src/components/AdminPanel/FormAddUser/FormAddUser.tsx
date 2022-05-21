import React, { useState } from "react";
import api from "../../../api";
import AddedUser from "../AddedUser/AddedUser";
import bcrypt from "bcryptjs";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const FormAddUser = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [userAdded, setUserAdded] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newUser = {
        firstName,
        lastName,
        gender,
        email,
        phone,
        address,
        password: await bcrypt.hash(password, 10),
        image,
        role: "user",
      };
      const res = await api.post("api/v1/users", newUser);
      console.log(res);
      toast.success("User Added!");
      navigate("/admin");

      // setUserAdded(true);
    } catch (err: any) {
      console.error(err);
      toast.error(err);
    }
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

  const handleFileInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;

    const base64: string = await getBase64(e.target.files[0]);
    setImage(base64);
  };

  const handleClear = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setFirstName("");
    setLastName("");
    setAddress("");
    setEmail("");
    setGender("");
    setPhone("");
    setImage("");
  };

  return (
    <div className="w-full bg-green-300 py-20">
      <div className="container mx-auto">
        {userAdded ? (
          <AddedUser
            firstName={firstName}
            lastName={lastName}
            address={address}
            email={email}
            gender={gender}
            phone={phone}
            image={image}
          />
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col justify-center items-center">
              <input
                type="text"
                className="bg-gray-200 text-black text-lg my-4 px-6 py-4 rounded-md outline-none w-1/2"
                placeholder={"First Name"}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                className="bg-gray-200 text-black text-lg my-4 px-6 py-4 rounded-md outline-none w-1/2"
                placeholder={"Last Name"}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <input
                type="text"
                className="bg-gray-200 text-black text-lg my-4 px-6 py-4 rounded-md outline-none w-1/2"
                placeholder={"Gender"}
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />

              <input
                type="text"
                className="bg-gray-200 text-black text-lg my-4 px-6 py-4 rounded-md outline-none w-1/2"
                placeholder={"Email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="text"
                className="bg-gray-200 text-black text-lg my-4 px-6 py-4 rounded-md outline-none w-1/2"
                placeholder={"Password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <input
                type="text"
                className="bg-gray-200 text-black text-lg my-4 px-6 py-4 rounded-md outline-none w-1/2"
                placeholder={"Phone"}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <input
                type="text"
                className="bg-gray-200 text-black text-lg my-4 px-6 py-4 rounded-md outline-none w-1/2"
                placeholder={"Address"}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              <input
                type="file"
                name="file"
                className="w-1/2 my-10"
                onChange={handleFileInputChange}
              />

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-green-600 px-2 py-3 w-32 text-white rounded-md mx-5"
                >
                  Add new user
                </button>
                <button
                  type="reset"
                  className="bg-red-600 px-2 py-3 w-32  text-white rounded-md"
                  onClick={handleClear}
                >
                  Clear
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default FormAddUser;
