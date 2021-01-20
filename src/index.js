const express = require("express");
const path = require("path");
const hbs = require("hbs");
const weatherStack = require("./utils/weatherStack");
const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
//Setup handlebars engine and views locations
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    forecast: "Temperature is 24°C",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Fernando Lomelí",
  });
});

app.get("/help/", (req, res) => {
  res.render("help", {
    title: "Help",
    messageTitle: "Do you need some help?",
    messageBody: "Check our social networks",
  });
});

app.get("/weather", async (req, res) => {
  const { address = "guadalajara" } = req.query;
  if (!address) {
    return res.send({ errorMessage: "You must provide an address" });
  }
  const dataForecast = await weatherStack.getForecast(address);
  if (dataForecast.error) {
    return res.send({
      error: dataForecast.error,
    });
  }
  const { temperature, location } = dataForecast;
  res.send({
    temperature,
    location,
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      messageError: "You must provide a search query",
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*/", (req, res) => {
  res.render("404page", {
    message: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404page", {
    message: "Page not found!",
  });
});

app.listen(port, () => {
  console.log("Server initialized on port ", port);
});
