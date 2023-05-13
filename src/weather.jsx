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
import App from "./App";

const APIkey = "06fa6983532b88fed1776013fb6650aa";

const Weather = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("New York");
  const [inputValue, setInputValue] = useState("");

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log(inputValue);
    if(inputValue !== ''){
      setLocation(inputValue);
    }
    e.preventDefault();
  };

  const input = document.querySelector('input');

 

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;
    axios.get(url).then((res) => {
      setData(res.data);
    });
  }, [location]);

  if (!data) {
    return (
      <div>
        <div
          className="flex items-center justify-center bg-center
     flex-col w-full h-screen">
          <BounceLoader color="#36d7b7" className=" text-9xl" />
        </div>
      </div>
    );
  }

  let icon;

  switch (data.weather[0].main) {
    case "Clouds":
      icon = <IoMdCloudy />;
      break;

    case "Haze":
      icon = <BsCloudHaze2Fill />;
      break;

    case "Rain":
      icon = <IoMdRainy className="text-[#31cafb]" />;
      break;

    case "Clear":
      icon = <IoMdSunny className="text-[#ffde33]" />;
      break;

    case "Drizzle":
      icon = <BsCloudDrizzleFill className="text-[#31cafb]" />;
      break;

    case "Snow":
      icon = <IoMdSnow className="text-[#31cafb]" />;
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
      <form
        action=""
        className=" h-14 bg-black/30 w-full max-w-[450px] rounded-full backdrop-blur-[32px] mb-8">
        <div className="h-full relative flex p-2 justify-between items-center">
          <input
            onChange={(e) => handleInput(e)}
            type="text"
            placeholder="Search the city or contry"
            className="flex-1 bg-transparent outline-none placeholder:text-white text-white text-[15px] font-light pl-6 h-full"
          />
          <button
            onClick={(e) => handleSubmit(e)}
            className="bg-[#1ab8ed] w-16 h-10 rounded-full flex justify-center items-center transition hover:bg-[#76d2f0]">
            <IoMdSearch className="text-2xl text-white" />
          </button>
        </div>
      </form>

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
