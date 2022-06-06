import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import api from "../api";
import AdminHero from "../components/AdminPanel/Hero/AdminHero";
import Usercards from "../components/AdminPanel/UserCards/Usercards";
import Footer from "../components/Footer/index";
import Navbar from "../components/Navbar";

interface UserInfo {
  image: string;
  firstName: string;
  lastName: string;
  email: string;
  _id: string;
  role: string;
  status: string;
}

const UserInfo = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<UserInfo[]>([]);

  useEffect(() => {
    setLoading(true);
    const getUsersInfo = async () => {
      const res: AxiosResponse<UserInfo[]> = await api.get("api/v1/users");
      const data: UserInfo[] = res.data;
      // console.log(data);
      setUsers(data.filter((user) => user.role !== "admin"));

      setLoading(false);
    };
    getUsersInfo();
  }, []);

  return (
    <div className="relative">
      <header>
        <Navbar />
      </header>
      <section>
        <AdminHero />
      </section>
      <section>
        <Usercards users={users} loading={loading} />
      </section>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default UserInfo;
