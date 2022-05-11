import axios from "axios";
const baseURL = "/api/persons";

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then((response) => response.data);
};

const create = (nameObject) => {
  const request = axios.post(baseURL, nameObject);
  return request.then((response) => response.data);
};

const deletePerson = (id) => {
  return axios.delete(`${baseURL}/${id}`);
};

const editPerson = (id, nameObject) => {
  const request = axios.put(`${baseURL}/${id}`, nameObject);
  return request;
};

const personsServices = { getAll, create, deletePerson, editPerson };
export default personsServices;
