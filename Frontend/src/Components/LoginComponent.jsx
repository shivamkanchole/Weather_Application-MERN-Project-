import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux'
import { login } from "../Store/authslice.js";
const LoginComponent = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch()
  let navigate = useNavigate();
  const [msg, setmsg] = useState(false);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(`http://localhost:3000/users/login`, {
        email: formData.email,
        password: formData.password,
      })
      .then((res) => (navigate("/weather"), dispatch(login(res.data.data))))
      .catch((error) => setmsg("Invalid Cradantials"));
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {msg && (
        <div className="text-white bg-red-500 p-2 rounded-md mb-4">{msg}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-gray-600"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export { LoginComponent };
