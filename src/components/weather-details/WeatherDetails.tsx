import React, {ReactNode} from 'react';
import {LuWind, LuEye, LuDroplet, LuSunrise, LuSunset} from "react-icons/lu";
import {ImMeter} from "react-icons/im";

export interface WeatherDetailsProps {
    visibility: string;
    humidity: string;
    windSpeed: string;
    airPressure: string;
    sunrise: string;
    sunset: string;
}

const WeatherDetails = ({visibility, humidity, windSpeed, airPressure, sunrise, sunset}: WeatherDetailsProps) => {
    return (
        <>
            <SingleWeatherDetail information={"Visibilidad"} icon={<LuEye/>} value={visibility}/>
            <SingleWeatherDetail information={"Humedad"} icon={<LuDroplet/>} value={humidity}/>
            <SingleWeatherDetail information={"Vel. viento"} icon={<LuWind/>} value={windSpeed}/>
            <SingleWeatherDetail information={"Presión del aire"} icon={<ImMeter/>} value={airPressure}/>
            <SingleWeatherDetail information={"Amanece"} icon={<LuSunrise/>} value={sunrise}/>
            <SingleWeatherDetail information={"Atardece"} icon={<LuSunset/>} value={sunset}/>
        </>
    );
};

interface WeatherDetailProps {
    information: string;
    icon: ReactNode;
    value: string;
}

const SingleWeatherDetail = ({information, icon, value}: WeatherDetailProps) => {
    return (
        <div className={"flex flex-col justify-center gap-2 items-center text-xs font-semibold text-black/80"}>
            <p className={"whitespace-nowrap"}>{information}</p>
            <div className={"text-3xl"}>{icon}</div>
            <p>{value}</p>
        </div>
    )
}

export default WeatherDetails;