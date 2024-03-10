import React, { useState } from "react";
import { createBrowserHistory } from "history";
import axios from "axios";
import { Widget } from "./Widget.jsx";
import { useSelector } from "react-redux";
import {NavLink} from 'react-router-dom'

const CityComponent = () => {
  const [formData, setFormData] = useState({
    id: "",
    city: "",
  });
  const Isuserloggedin = useSelector((state) => state.auth.status);
  let history = createBrowserHistory();
  const [CityDetails, setCityDetails] = useState([]);
  const [display, setdisplay] = useState("hidden");
  const [flag, setflag] = useState(true);
  const [clikedonupdate, setclikedonupdate] = useState(false);
  const [ErrorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const Toggleevent = () => {
    if (display === "hidden") setdisplay("block");
    else setdisplay("hidden");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id === "" || formData.city === "") {
      setErrorMsg("*All Fields Are Required");
    } else {
      setflag(!flag);
      let data = new FormData(e.target);
      let url = new URLSearchParams(data).toString();
      history.push("/?" + url);

      axios
        .get(`http://localhost:3000/users/${formData.city}/${formData.id}`)
        .then((res) => setCityDetails(res.data.data))
        .catch((error) => console.log(error));
    }
  };

  const Updatesearch = () => {
    setclikedonupdate(!clikedonupdate);
    setdisplay("hidden");
    setflag(!flag);

    if (formData.city !== "") {
      axios
        .put(`http://localhost:3000/users/${formData.city}/${formData.id}`)
        .then((res) => setCityDetails(res.data.data))
        .catch((error) => console.log(error.message));
    } else {
      console.log("Enter city and id");
    }
  };

  return flag ? (
    Isuserloggedin ? (
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
        <div
          className={`${
            ErrorMsg.length > 0 ? "block" : "hidden"
          } text-red-600 bg-red-100 border border-red-300 p-3 rounded-md`}
        >
          {ErrorMsg}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="id"
              className="block text-sm font-medium text-gray-600"
            >
              ID:
            </label>
            <input
              type="text"
              id="id"
              name="id"
              value={formData.id}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-600"
            >
              City:
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
          >
            Fatch Data
          </button>
        </form>
      </div>
    ) : (
      <div className=" bg-white rounded-md shadow-md p-8 text-center mt-20">
        <h2 className="text-2xl font-semibold mb-4">Please Login</h2>
        <p className="text-gray-600 mb-4">
          To access the features, please log in to your account.
        </p>

        <NavLink
          to="/login"
          className="bg-blue-500 text-white px-4 py-2 rounded-full"
        >
          Login
        </NavLink>

        <p className="mt-4 text-sm text-gray-500">
          Don't have an account?{"  "}
          <NavLink to="/registration" className="text-blue-500">
            Sign up
          </NavLink>
        </p>
      </div>
    )
  ) : (
    <div className=" flex justify-center mt-10">
      {CityDetails.map((field, index) => (
        <div
          key={index}
          className="bg-white shadow p-4 rounded mb-4 flex flex-col"
        >
          <p className="text-lg font-bold">Id: {formData.id}</p>
          <p className="text-xl">Name: {field.location.name}</p>
          <p className="text-gray-600">Country: {field.location.country}</p>

          <div className="flex gap-2 mt-2">
            <button
              onClick={Toggleevent}
              className=" w-36 mt-2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-700 transition duration-300 ease-in-out"
            >
              {display === "hidden" ? "More Details" : "Less Details"}
            </button>

            <button
              onClick={Updatesearch}
              className=" w-36 mt-2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-700 transition duration-300 ease-in-out"
            >
              Update
            </button>
          </div>
          <div className={`${display} mt-4`}>
            <Widget data={field} index={index} />
          </div>
        </div>
      ))}
    </div>
  );
};

export { CityComponent };
