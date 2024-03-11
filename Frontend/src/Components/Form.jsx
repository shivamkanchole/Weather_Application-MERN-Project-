import React, { useState } from "react";
import axios from "axios";
import { Input } from "./Input.jsx";

function Form({ setfatcheddata }) {
  const [errormsg, seterrormsg] = useState("");
  const [flag, setflag] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const firstcity = e.target.elements.Firstcity.value;
    const secondcity = e.target.elements.Secondcity.value;
    const thirdcity = e.target.elements.Thirdcity.value;
    const fourthcity = e.target.elements.Fourthcity.value;

    if (
      [firstcity, secondcity, thirdcity, fourthcity].some(
        (city) => city?.trim() === ""
      )
    ) {
      seterrormsg("*City Name Is A Required Field");
    } else setflag(!flag);

    axios
      .post("http://localhost:3000/users/weather", {
        firstcity,
        secondcity,
        thirdcity,
        fourthcity,
      })
      .then((res) => setfatcheddata(res.data.data))
      .catch((error) => console.log(error));
  };

  return (
    <form
      action="POST"
      onSubmit={handleSubmit}
      className="flex flex-col mt-6 justify-center items-center md:flex md:flex-col md:gap-10"
    >
      <div
        className={`${
          errormsg.length === 0 ? "hidden" : "block"
        } text-red-500 mt-4`}
      >
        {errormsg}
      </div>

      <div className="flex flex-col gap-4  items-center md:flex md:flex-row md:gap-x-4">
        <Input name={"Firstcity"} id={"Firstcity"} placeholder={"First"} />
        <Input name={"Secondcity"} id={"Secondcity"} placeholder={"Second"} />
      </div>

      <div className="flex flex-col gap-4 items-center mt-4  md:flex md:flex-row md:gap-x-4">
        <Input name={"Thirdcity"} id={"Thirdcity"} placeholder={"Third"} />
        <Input name={"Fourthcity"} id={"Fourthcity"} placeholder={"Fourth"} />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-96 flex justify-center mt-4 py-2 px-4 rounded md:w-full "
      >
        {flag ? `Fetching Data...` : "Submit"}
      </button>
    </form>
  );
}

export { Form };
