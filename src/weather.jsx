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

import { ImSpinner8 } from "react-icons/im";

// 017da455c9f0fe6e776dd56c42733b57

const APIkey = '017da455c9f0fe6e776dd56c42733b57';
axios.defaults.headers.common["Authorization"] = `Bearer ${APIkey}`;


const Weather = () => {

  const [data,setData] = useState(null);
  const [location,setLocation] = useState('Namakkal')

  useEffect(()=>{
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIkey}`;
    axios.get(url).then((res) => {
      setData(res.data);
    });
  },[location]);
console.log(data);

  return (
  <div className=" font-bold w-1 h-10 ">
  weather
  </div>
  )
};

export default Weather;
