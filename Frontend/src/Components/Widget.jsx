import React from "react";

function Widget({ data, index }) {
  return (
    <div
      key={index}
      className="flex border-2 border-black rounded-2xl p-4 gap-6"
    >
      <div>
        <img
          src={`http:${data.current.condition.icon}`}
          alt="Weather Icon"
          className="mt-2"
        />
      </div>
      <div>
        <h2 className="text-xl font-bold">
          {data.location.name}, {data.location.country}
        </h2>
        <p>{data.current.condition.text}</p>
        <div className="flex gap-6">
          <p>Temp: {data.current.temp_c}°C</p>
          <p>Humidity:{data.current.humidity}%</p>
        </div>
      </div>
    </div>
  );
}

export { Widget };
