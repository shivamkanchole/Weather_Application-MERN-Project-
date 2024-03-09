import { useState } from "react";
import { Widget } from "./Widget";
import { Form } from "./Form";
import { useNavigate } from "react-router-dom";

function HomeComponent() {
  const [fetchedDataArray, setfatcheddata] = useState([]);
  const navigate = useNavigate();
  const Goback = () => {
    navigate("/");
  };

  return fetchedDataArray.length <= 0 ? (
    <div className="flex flex-col mt-4 justify-center  md:flex md:flex-col md:mt-10 md:items-center md:gap-10">
      <div className=" flex text-3xl justify-center md:text-4xl">
        Weather App
      </div>
      <Form setfatcheddata={setfatcheddata} />
    </div>
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
