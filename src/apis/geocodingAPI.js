const axios = require("axios");

const baseURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/";

const instance = axios.default.create({
  baseURL,
  params: {
    access_token:
      "pk.eyJ1IjoiZGV2bG9tZWxpIiwiYSI6ImNranhhdzdpbDAybHkzM3BhbnpzeXBvbnAifQ.mfIDRLQnZtZUMfnqcnciTg",
    limit: 1,
  },
});

module.exports = instance;
