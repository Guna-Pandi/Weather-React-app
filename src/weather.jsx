import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdSearch,
} from "react-icons/io";

import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind,
} from "react-icons/bs";

import { TbTemperatureCelsius } from "react-icons/tb";

import { BounceLoader } from "react-spinners";

const APIkey = "06fa6983532b88fed1776013fb6650aa";

const Weather = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("Namakkal");

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIkey}`;
    axios.get(url).then((res) => {
      setData(res.data);
    });
  }, [location]);

  if (!data) {
    return (
      <div>
        <div>
          <BounceLoader className=" text-5xl" />
        </div>
      </div>
    );
  }

  let icon;

  console.log(data.weather[0].main);

  switch (data.weather[0].main) {
    case "Clouds":
      icon = <IoMdCloudy />;
      break;

    case "Haze":
      icon = <BsCloudHaze2Fill />;
      break;

    case "Rain":
      icon = <IoMdRainy />;
      break;

    case "Clear":
      icon = <IoMdSunny />;
      break;

    case "Drizzle":
      icon = <BsCloudDrizzleFill />;
      break;

    case "Snow":
      icon = <IoMdSnow />;
      break;

    case "Thunderstrome":
      icon = <IoMdThunderstorm />;
      break;
  }

  return <div className=" font-bold w-1 h-10  text-6xl">{icon}</div>;
};

export default Weather;
