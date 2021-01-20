const geocodingAPI = require("../apis/geocodingAPI");

const getCoordenates = async (place) => {
  try {
    const res = await geocodingAPI.get(`${place}.json`);
    const long = res.data.features[0].geometry.coordinates[0];
    const lat = res.data.features[0].geometry.coordinates[1];
    return { lat, long };
  } catch (error) {
    return error.message;
  }
};

module.exports = { getCoordenates };
