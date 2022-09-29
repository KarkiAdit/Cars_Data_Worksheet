import React, { useState } from "react";
import "./App.css";

function Cars() {
  const carFormInitialData = {
    id: 0,
    brand: "",
    name: "",
    releaseYear: "",
    color: "",
  };
  const [carFormData, setCarFormData] = useState(carFormInitialData);

  useState(() => {
    const fetchApi = async () => {
      const response = await fetch("http://127.0.0.1:8081/cars-data");
      const data = await response.json();
    };

    fetchApi();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarFormData({
      ...carFormData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    /**
     * Gather all the form data to state variable carFormData
     * When the form is submitted POST the data to Backend using fetch post
     * https://googlechrome.github.io/samples/fetch-api/fetch-post.html
     */
    event.preventDefault();
    fetch("http://127.0.0.1:8081/add-car", {
      method: "POST",
      body: JSON.stringify(carFormData),
    });
  };

  const handleDelete = () => {
    /**
     * When clicked on a delete button, get the id of the car's delete button clicked
     * Then use javascript fetch to send DELETE request to NodeJS
     * https://openjavascript.info/2022/01/03/using-fetch-to-make-get-post-put-and-delete-requests/
     */
  };

  /** 🥳🥳🥳🥳🥳🥳 DOUBLE BONUS POINTS 🥳🥳🥳🥳🥳🥳 */
  const handleEdit = () => {
    /**
     * When clicked on a edit button figure out a way to edit the car data.
     * Once edited send the updated data to NodeJS.
     * Then use javascript fetch to send DELETE request to NodeJS
     * https://openjavascript.info/2022/01/03/using-fetch-to-make-get-post-put-and-delete-requests/
     */
  };

  return (
    <div className="cars-from-wrapper">
      <form id="cars-form" onSubmit={handleSubmit} autoComplete="off">
        {/* FORM INPUT DATAS */}
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
      {/**
       * TODO: Update the code below to see any new proprties added to carFormData
       * */}
      <p>
        ID:{carFormData.id}, name:{carFormData.name}
      </p>

      <h2>Cars Data</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Car Make</th>
            <th>Car Model</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/**
           * TODO: Replace this code with Data from Node JS GET api data
           * React documentation: https://reactjs.org/docs/lists-and-keys.html
           * How to get data from API: https://www.w3schools.com/jsref/api_fetch.asp
           * */}
          <tr>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td>Germany</td>
            <td>✎</td>
            <td>🗑</td>
          </tr>
          <tr>
            <td>Centro comercial Moctezuma</td>
            <td>Francisco Chang</td>
            <td>Mexico</td>
            <td>✎</td>
            <td>🗑</td>
          </tr>
          <tr>
            <td>Ernst Handel</td>
            <td>Roland Mendel</td>
            <td>Austria</td>
            <td>✎</td>
            <td>🗑</td>
          </tr>
          <tr>
            <td>Island Trading</td>
            <td>Helen Bennett</td>
            <td>UK</td>
            <td>✎</td>
            <td>🗑</td>
          </tr>
          <tr>
            <td>Laughing Bacchus Winecellars</td>
            <td>Yoshi Tannamuri</td>
            <td>Canada</td>
            <td>✎</td>
            <td>🗑</td>
          </tr>
          <tr>
            <td>Magazzini Alimentari Riuniti</td>
            <td>Giovanni Rovelli</td>
            <td>Italy</td>
            <td>✎</td>
            <td>🗑</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Cars;
