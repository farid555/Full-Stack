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

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/user_info" element={<UserInfo />} />
          <Route path="/book_info" element={<BookInfo />} />
          <Route path="/add_book" element={<AddBook />} />
          <Route path="/user_profile" element={<UserProfile />} />
          <Route path="/add_author" element={<AddAuthor />} />
          <Route path="/add_user" element={<AddUser />} />
          <Route path="/books/:bookId" element={<BookDetails />} />
          <Route path="/book_list" element={<BookList />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
