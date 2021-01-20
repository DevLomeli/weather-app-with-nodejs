const axios = require("axios");

const baseURL =
  "http://api.weatherstack.com/current?access_key=e7d734ef7ab578b86710b47adc76c295";

const instance = axios.default.create({
  baseURL,
});

module.exports = instance;
