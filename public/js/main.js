const city = document.querySelector("#city");
const forecast = document.querySelector("#forecast");
const forecastForm = document.querySelector("#forecastForm");
const errorMessage = document.querySelector("#errorMessage");

const getWeather = (place) => {
  return fetch(`/weather?address=${place}`)
    .then((res) =>
      res.json().then((data) => {
        return data;
      })
    )
    .catch((e) => {
      console.log(e);
    });
};

forecastForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const search = document.querySelector("input[type='text']");
  if (!search.value) {
    return (
      (errorMessage.innerHTML = ""),
      (errorMessage.innerHTML = "Submit a place"),
      (errorMessage.style.color = "red")
    );
  }
  getWeather(search.value)
    .then(({ temperature, location, error }) => {
      if (!temperature) {
        return (
          (city.innerHTML = ""),
          (errorMessage.innerHTML = error),
          (errorMessage.style.color = "red")
        );
      }
      city.innerHTML = `Location: ${location}`;
      forecast.innerHTML = `Temperature: ${temperature}°C`;
      search.value = "";
    })
    .catch((e) => console.log(e));
});
