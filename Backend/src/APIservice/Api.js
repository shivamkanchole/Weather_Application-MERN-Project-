import Axios from "axios";

const WeatherData = (CityName) => {
  const apilink = `https://api.weatherapi.com/v1/current.json?key=${process.env.api_key}&q=${CityName}`;

  const data = Axios.get(apilink)
    .then((res) => res.data)
    .catch((error) => error);
  return data;
};

export { WeatherData };
