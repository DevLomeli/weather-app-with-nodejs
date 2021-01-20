const weatherAPI = require("../apis/weatherAPI");
const geocode = require("./geocode");

const getForecast = async (location) => {
  if (!location) {
    throw new Error("!Ups! Enter a location please...");
  } else {
    try {
      const { lat, long } = await geocode.getCoordenates(location);
      const res = await fetchDataFromAPI(lat, long);
      if (res.data.current) {
        const { temperature } = res.data.current;
        return { temperature, location };
      } else {
        return { error: "Invalid location" };
      }
    } catch (error) {
      console.log(error);
    }
  }
};

const fetchDataFromAPI = async (lat, long) => {
  return await weatherAPI.get("", {
    params: {
      query: `${lat},${long}`,
    },
  });
};

module.exports = {
  getForecast,
};
