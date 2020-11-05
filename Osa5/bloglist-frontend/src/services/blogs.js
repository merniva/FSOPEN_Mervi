import axios from "axios";
const baseUrl = "/api/blogs";
const userUrl = "/api/users";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const getUserBlogs = async (userId) => {
  const res = await axios.get(`${userUrl}/${userId}`);
  return res.data;
};

const create = async (blogInfo) => {
  const config = {
    headers: { Authorization: token },
  };
  const res = await axios.post(baseUrl, blogInfo, config);
  return res.data;
};

const addLike = async (blogInfo) => {
  const res = await axios.put(`${baseUrl}/${blogInfo.id}`, blogInfo);
  return res.data;
};

const deleteBlog = async (blogInfo) => {
  const res = await axios.delete(`${baseUrl}/${blogInfo.id}`);
  return res.data;
};

export default { getAll, getUserBlogs, setToken, create, addLike, deleteBlog };
