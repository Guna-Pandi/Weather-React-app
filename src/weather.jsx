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
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;
    axios.get(url).then((res) => {
      setData(res.data);
    });
  }, [location]);

  if (!data) {
    return (
      <div>
        <div className="flex items-center justify-center bg-center
     flex-col w-full h-screen">
          <BounceLoader className=" text-5xl " />
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
  // date object
  const date = new Date();

  return (
    <div
      className=" w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center
     flex-col flex items-center justify-center px-4 lg:px-0">

      <form action="">form</form>

      {/* card */}
      <div
        className=" w-full max-w-[450px] bg-black/20 min-h-[584px]
       text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6">
        <div>
          {/* card top */}
          <div className="flex items-center gap-x-5 rounded-xl">
            {/* icon display */}
            <div className="text-[87px]">{icon}</div>
            {/* country name */}
            <div className=" text-2xl font-semibold ">
              {data.name},{data.sys.country}
            </div>
            {/* date */}
            <div>
              {date.getUTCDate()}/{date.getUTCMonth()}/{date.getUTCFullYear()}
            </div>
          </div>
          {/* card body */}
          <div className=" my-16 ">
            <div className=" flex justify-center items-center">
              {/* temp */}
              <div className=" text-9xl leading-none font-light">
                {parseInt(data.main.temp)}
              </div>
              {/* clecious icon */}
              <div className=" text-4xl">
                <TbTemperatureCelsius />
              </div>
            </div>
            {/* weather description */}
            <div className=" capitalize text-center mt-3">
              {data.weather[0].description}
            </div>
          </div>
          {/* card bottom */}
          <div className="max-w-[378px] mx-auto flex flex-col gap-y-6">
            {/* row 1 */}
            <div className="flex justify-between">
              <div className=" flex items-center gap-x-2 ">
                {/* icon */}
                <div className=" text-lg">
                  <BsEye />
                </div>
                <div>
                  Visibility{" "}
                  <span className=" ml-2">{data.visibility / 1000} km</span>
                </div>
              </div>

              <div className=" flex items-center gap-x-2 ">
                {/* icon */}
                <div className=" text-lg">
                  <BsThermometer />
                </div>
                <div className=" flex">
                  Feels Like{" "}
                  <div className=" ml-2 flex">
                    {parseInt(data.main.feels_like)}
                    <TbTemperatureCelsius />
                  </div>
                </div>
              </div>
            </div>
            {/* row 2 */}
            <div className="flex justify-between">
              <div className=" flex items-center gap-x-2 ">
                {/* icon */}
                <div className=" text-lg">
                  <BsWater />
                </div>
                <div>
                  Humidity <span className=" ml-2">{data.main.humidity} %</span>
                </div>
              </div>

              <div className=" flex items-center gap-x-2 ">
                {/* icon */}
                <div className=" text-lg">
                  <BsWind />
                </div>
                <div className=" flex">
                  Wind <span className=" ml-2 ">{data.wind.speed} m/s</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
