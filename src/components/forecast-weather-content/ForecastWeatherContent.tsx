import React from 'react';
import {ForecastWeather, ForecastWeatherToday, WeatherSkeleton} from "@/components";
import {WeatherData} from "@/lib/definitions";

interface ForecastWeatherContentProps {
    loadingCity: boolean;
    data: WeatherData;
}

const ForecastWeatherContent = ({loadingCity, data}: ForecastWeatherContentProps) => {
    return (
        <main className={"px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4"}>
            {loadingCity ? <WeatherSkeleton/> : (
                <>
                    <ForecastWeatherToday data={data}/>
                    <ForecastWeather data={data}/>
                </>
            )}
        </main>
    );
};

export default ForecastWeatherContent;