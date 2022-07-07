import api from "../../../api";

const getBookInfoById = async (bookId: string) => {
  const res = await api.get(`api/v1/books/${bookId}`);
  return res.data;
};

const bookService = {
  getBookInfoById,
};

export default bookService;
