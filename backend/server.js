const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

let carsMockData = [
  {
    id: "1",
    brand: "Hyundai",
    name: "Ioniq",
    releaseYear: 2017,
    color: "blue",
  },
  {
    id: "2",
    brand: "Toyota",
    name: "Prius",
    releaseYear: 2007,
    color: "blue",
  },
  {
    id: "3",
    brand: "Chevrolet",
    name: "Aveo",
    releaseYear: 2007,
    color: "white",
  },
  {
    id: "4",
    brand: "BMW",
    name: "M5",
    releaseYear: 2017,
    color: "White",
  },
  {
    id: "5",
    brand: "Tesla",
    name: "S",
    releaseYear: 2019,
    color: "Black",
  },
];

// TO SUPPORT CORS.
app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

/** Create GET API. API shoudl return  const carsMockData*/
app.get("/", function (request, response) {
  response.send(`<h1 style="text-align:center">Cars Data</h1>`);
});

app.get("/cars-data", function (request, response) {
  response.send(carsMockData);
});

const server = app.listen(8081, function () {
  console.log(`App listening at http://127.0.0.1:8081/`);
});

/** Create POST API. Get the new car data from react.
 *      Check if car with id exists. If Yes return 500. With message 'Car already exists'
 *      If there is no car with the id, add the new car to  carsMockData and return carsMockData as response */

app.post("/add-car", (request, response) => {
  request.on("data", (data) => {
    const carDataToAdd = JSON.parse(data);
    let dataIdFound = false;
    carsMockData.forEach((carData) => {
      if (carData.id === parseInt(carDataToAdd.id)) {
        dataIdFound = true;
      }
    });
    if (!dataIdFound) {
      carsMockData.push(carDataToAdd);
    }
  });
  response.send(carsMockData);
});

/** Create PUT API.
 *  Check if car with id exists. If No return 500 with error 'No car with given id exist'.
 *  If there is car with the requested id, update that car's data in 'carsMockData' and return 'carsMockData' */

/** Create Delete API.
 *  Check if car with id exists. If No return 500. With message 'No car with give id exists'
 *  If there is car with the requested id. Delete that car from 'carsMockData' and return 'carsMockData'
 */
