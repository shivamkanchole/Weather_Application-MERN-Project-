import React, { useState } from "react";
import axios from "axios";

const RegistrationComponent = () => {
  const [formData, setFormData] = useState({
    FullName: "",
    email: "",
    password: "",
  });
  const [data, setdata] = useState();
  const [Msg, setMsg] = useState("");
  const [submit, setsubmit] = useState(false)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setsubmit(!submit)
    console.log("Request Received");
    try {
       axios
        .post(`http://localhost:3000/users/registration`, {
          FullName: formData.FullName,
          email: formData.email,
          password: formData.password,
        })
        .then((res) => {
          setdata(res.data.data), setMsg(res.data.message);
        })
        .catch((error) => console.log(error.message))
    } catch (error) {
      console.log("Error Occured During Registration");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-md shadow-md">
      <div className="flex items-center gap-10 text-center">
        <h2 className="text-2xl font-bold mb-4">Registration Form</h2>
        {Msg!=="" && (
          <div className="text-green-600 bg-green-100 border border-green-300 p-1 rounded-md">
            {Msg}
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="FullName"
            className="block text-sm font-semibold text-gray-600"
          >
            Full Name
          </label>
          <input
            type="text"
            id="FullName"
            name="FullName"
            value={submit ?"":formData.FullName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
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
            value={submit ?"":formData.email}
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
            value={submit ?"":formData.password}
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

export { RegistrationComponent };
