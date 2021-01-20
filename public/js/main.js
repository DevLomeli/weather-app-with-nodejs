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
  const weatherImg = document.querySelector(".weatherImg");
  if (!search.value) {
    return (
      (city.innerHTML = ""),
      (forecast.innerHTML = ""),
      (weatherImg.style.backgroundImage = "none"),
      (weatherImg.style.display = "none"),
      (errorMessage.innerHTML = "Submit a place"),
      (errorMessage.style.color = "red")
    );
  }
  getWeather(search.value)
    .then(({ temperature, location, weatherIcon, error }) => {
      if (!temperature) {
        return (
          (city.innerHTML = ""),
          (forecast.innerHTML = ""),
          (weatherImg.style.backgroundImage = "none"),
          (weatherImg.style.display = "none"),
          (errorMessage.innerHTML = error),
          (errorMessage.style.color = "red")
        );
      }
      errorMessage.innerHTML = "";
      city.innerHTML = `Location: ${location}`;
      forecast.innerHTML = `Temperature: ${temperature}°C`;
      weatherImg.style.backgroundImage = `url(${weatherIcon})`;
      weatherImg.style.display = "block";
      search.value = "";
    })
    .catch((e) => console.log(e));
});
