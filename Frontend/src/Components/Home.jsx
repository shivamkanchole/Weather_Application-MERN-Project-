import { useState } from "react";
import { Widget } from "./Widget";
import { Form } from "./Form";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function HomeComponent() {
  const [fetchedDataArray, setfatcheddata] = useState([]);
  const Isuserloggedin = useSelector((state) => state.auth.status);

  const navigate = useNavigate();
  const Goback = () => {
    navigate("/");
  };

  return fetchedDataArray.length <= 0 ? (
    Isuserloggedin ? (
      <div className="flex flex-col mt-4 justify-center  md:flex md:flex-col md:mt-10 md:items-center md:gap-10">
        <div className=" flex text-3xl justify-center md:text-4xl">
          Weather App
        </div>
        <Form setfatcheddata={setfatcheddata} />
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
    <div className="flex flex-col mt-5 items-center gap-4">
      <div className="flex text-3xl justify-center md:text-4xl">
        Weather App
      </div>

      <div className="flex flex-col gap-4 md:flex md:flex-row md:gap-x-8 md:mt-10">
        {fetchedDataArray.slice(0, 2).map((data, index) => (
          <Widget data={data} index={index} />
        ))}
      </div>

      <div className="flex flex-col gap-4 md:flex md:flex-row md:gap-x-8 md:mt-10">
        {fetchedDataArray.slice(2).map((data, index) => (
          <Widget data={data} index={index} />
        ))}
      </div>

      <button
        onClick={Goback}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none mt-4 "
      >
        Go Back
      </button>
    </div>
  );
}

export { HomeComponent };
