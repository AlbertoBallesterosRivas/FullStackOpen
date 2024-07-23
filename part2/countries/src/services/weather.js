import axios from "axios";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?q";
// "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}"

const getWeather = (city, api) => {
  return axios.get(`${baseUrl}=${city}&appid=${api}`);
};

const create = newObject => {
  return axios.post(baseUrl, newObject);
};

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
};

const remove = id => {
  return axios.delete(`${baseUrl}/${id}`);
};

export default {
  getWeather,
  create,
  update,
  remove
};
