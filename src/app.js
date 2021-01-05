//template engine is used to render dynamic webages using express, unlike the express.static which renders static ones
//template engine used here is Handlebars
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const request = require("request");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();
const port = process.env.PORT || 4000

// //directory and file path respectively
// console.log(__dirname);
// console.log(__filename);

// //path is a core package that helps navigate ta path
// console.log(path.join(__dirname, "../public"));

//Defining paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setting handlebars engine and view location
//used to set dynamic view engine
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setting up Static directory to serve :- serves the public directory
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  //this will act as the landing and index.hbs will be trigered
  res.render("index", {
    title: "Weather",
    name: "Anusha",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Anusha",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    helptext: "this is some helpfull çtext",
    name: "Anusha",
  });
});

app.get("/weather", (req, res) => {
  const query = req.query;
  if (!query.address) {
    return res.send({
      error: "Address is a mandatory field",
    });
  }
  console.log(query);
  geocode(query.address, (error, data) => {
    if (error) {
      return res.send({
        error: `Following error occured ${error}`,
      });
    }
    forecast(data.latitude, data.longitude, (forecasError, forecastData) => {
      if (error) {
        return res.send({
          error: `Following error occured ${forecasError}`,
        });
      }
      res.send([
        {
          location: forecastData.location,
          forecast: forecastData,
          address: query.address,
        },
      ]);
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errormsg: "Sorry we dont have help article you are looking for",
    name: "Anusha",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errormsg: "Page not found",
    name: "Anusha",
  });
});

app.listen(port, () => {
  console.log(`My Server is up on ${port}`);
});
