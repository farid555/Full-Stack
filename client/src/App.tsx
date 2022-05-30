import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import BookInfo from "./pages/BookInfo";
import AddBook from "./pages/AddBook";
import AddAuthor from "./pages/AddAuthor";
import UserProfile from "./pages/UserProfile";
import UserInfo from "./pages/UserInfo";
import AddUser from "./pages/AddUser";
import BookDetails from "./pages/BookDetails";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import BookList from "./pages/BookList";
import "react-toastify/dist/ReactToastify.css";
import PrivateRouteUser from "./components/ProtectedRoute/PrivateRouteUser";
import PrivateRouteAdmin from "./components/ProtectedRoute/PrivateRouteAdmin";
import AddAdmin from "./pages/AddAdmin";
import Install from "./pages/Install";
import Error404 from "./pages/Error404";
import UpdateUser from "./pages/UpdateUser";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/install" element={<Install />} />
          <Route path="/books/:bookId" element={<BookDetails />} />
          <Route path="/book_list" element={<BookList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user_profile" element={<UserProfile />} />
          <Route path="/add_admin" element={<AddAdmin />} />
          <Route element={<PrivateRouteAdmin />}>
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/add_author" element={<AddAuthor />} />
            <Route path="/add_book" element={<AddBook />} />
            <Route path="/admin/add_user" element={<AddUser />} />
            <Route path="/user_info" element={<UserInfo />} />
            <Route path="/book_info" element={<BookInfo />} />
            <Route path="/edit/user/:userId" element={<UpdateUser />} />
          </Route>
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
