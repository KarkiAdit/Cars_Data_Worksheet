import React, { useState, useEffect } from "react";
import "./App.css";

function Cars() {
  const carFormInitialData = {
    id: null,
    brand: "",
    name: "",
    releaseYear: "",
    color: "",
  };
  const [carFormData, setCarFormData] = useState(carFormInitialData);
  const [cars, setCars] = useState([]);
  const [isForEdit, setIsForEdit] = useState(false);
  const [resetTable, setResetTable] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarFormData({
      ...carFormData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    if (carFormData.id) {
      const response = {};
      if (isForEdit) {
        const response = await fetch("http://localhost:8081/cars", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(carFormData),
        });
        setIsForEdit(!isForEdit);
      } else {
        const response = await fetch("http://localhost:8081/cars", {
          method: "POST",
          body: JSON.stringify(carFormData),
          headers: { "Content-Type": "application/json" },
        });
      }

      // Update/Add cars in the table based upon the status code
      const responseJson = await response.json();

      if (responseJson.status === 200) {
        setResetTable(!resetTable);
      }
      setCarFormData(carFormInitialData);
    }
  };

  const handleDelete = async (car) => {
    const response = await fetch("http://localhost:8081/cars", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(car),
    });

    // Delete car in the table based upon the status code
    const responseJson = await response.json();
    if (responseJson.status === 200) {
      setResetTable(!resetTable);
    }
  };

  /** 🥳🥳🥳🥳🥳🥳 DOUBLE BONUS POINTS 🥳🥳🥳🥳🥳🥳 */
  const handleEdit = async (updatedCarData) => {
    setCarFormData(updatedCarData);
    setIsForEdit(!isForEdit);
  };

  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch("http://127.0.0.1:8081/cars");
      const allFields = await response.json();
      setCars(allFields.data);
    };
    fetchApi();
  }, [resetTable]);

  return (
    <div className="cars-from-wrapper">
      <form id="cars-form" onSubmit={handleSubmit} autoComplete="off">
        <label>
          ID:
          <input
            name="id"
            type="text"
            value={carFormData.id}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Brand:
          <input
            name="brand"
            type="text"
            value={carFormData.brand}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Name:
          <input
            name="name"
            type="text"
            value={carFormData.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Release Year:
          <input
            name="releaseYear"
            type="text"
            value={carFormData.releaseYear}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Color:
          <input
            name="color"
            type="text"
            value={carFormData.color}
            onChange={handleInputChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <div className="current-car-data">
        <div className="car-properties">ID: {carFormData.id}</div>
        <div className="car-properties">Brand: {carFormData.brand}</div>
        <div className="car-properties">Name: {carFormData.name}</div>
        <div className="car-properties">
          Release Year: {carFormData.releaseYear}
        </div>
        <div className="car-properties">Color: {carFormData.color}</div>
      </div>

      <h2>Cars Data</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Brand</th>
            <th>Name</th>
            <th>Release Year</th>
            <th>Color</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => {
            return (
              <tr>
                <td>{car.id}</td>
                <td>{car.brand}</td>
                <td>{car.name}</td>
                <td>{car.releaseYear}</td>
                <td>{car.color}</td>
                <td>
                  <button onClick={() => handleEdit(car)}>✎</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(car)}>🗑</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Cars;
