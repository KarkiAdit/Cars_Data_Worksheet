const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

let carsMockData = [
  {
    id: 1,
    brand: "Hyundai",
    name: "Ioniq",
    releaseYear: "2017",
    color: "blue",
  },
  {
    id: 2,
    brand: "Toyota",
    name: "Prius",
    releaseYear: "2007",
    color: "blue",
  },
  {
    id: 3,
    brand: "Chevrolet",
    name: "Aveo",
    releaseYear: "2007",
    color: "white",
  },
  {
    id: 4,
    brand: "BMW",
    name: "M5",
    releaseYear: "2017",
    color: "White",
  },
  {
    id: 5,
    brand: "Tesla",
    name: "S",
    releaseYear: "2019",
    color: "Black",
  },
];

app.get("/cars", (req, res) => {
  if (carsMockData) {
    res.status(200).json({
      status: 200,
      data: carsMockData,
    });
  } else {
    res.status(400).json({
      status: 400,
      message: "Mock database is currently empty",
    });
  }
});

app.post("/cars", (req, res) => {
  const matchingCars = carsMockData.filter((car) => car.id === req.body.id);
  if (matchingCars.length) {
    res.status(500).json({
      status: 500,
      message: "Car already exists",
    });
  } else {
    newCarData = req.body;
    carsMockData.push(newCarData);
    res.status(200).json({
      status: 200,
      data: carsMockData,
    });
  }
});

app.put("/cars", (req, res) => {
  const matchingCar = carsMockData.filter((car) => car.id === req.body.id);
  if (matchingCar) {
    carsMockData = carsMockData.map((currentCarData) => {
      if (currentCarData.id === req.body.id) {
        return req.body;
      } else {
        return currentCarData;
      }
    });
    res.status(200).json({
      status: 200,
      data: carsMockData,
    });
  } else {
    res.status(500).json({
      status: 500,
      message: "No car with given id exists",
    });
  }
});

app.delete("/cars", (req, res) => {
  const carIdToDelete = req.body.id;
  newCarsData = carsMockData.filter((carData) => carData.id !== carIdToDelete);
  if (carsMockData.length === newCarsData.length) {
    res
      .status(500)
      .json({ status: 500, message: "No car with given id exists" });
  } else {
    carsMockData = newCarsData;
    res.status(200).json({
      status: 200,
      message: "Item successfully deleted",
      data: carsMockData,
    });
  }
});

app.listen(8081, function () {
  console.log("Server is listening at http://127.0.0.1:8081");
});
