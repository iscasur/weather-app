import React from 'react';
import {ForecastWeatherDetail} from "@/components";
import {format, fromUnixTime, parseISO} from "date-fns";
import {metersToKilometeres} from "@/utils/metersToKilometeres";
import {convertWindSpeed} from "@/utils/convertWindSpeed";
import {WeatherData} from "@/lib/definitions";

interface ForecastWeatherProps {
    data: WeatherData;
}

const ForecastWeather = ({data}: ForecastWeatherProps) => {
    const uniqueDates = [
        ...new Set(
            data.list.map((entry) => new Date(entry.dt * 1000).toISOString().split("T")[0]),
        )
    ]

    const firstDataForEachDate = uniqueDates.map((date) => {
        return data.list.find((entry) => {
            const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0]
            const entryTime = new Date(entry.dt * 1000).getHours()

            return entryDate === date && entryTime >= 6;
        })
    })

    return (
        <section className={"flex w-full flex-col gap-4"}>
            <p className={"text-2xl"}>Pronóstico (5 días)</p>
            {firstDataForEachDate.slice(1).map((date, index) => (
                <ForecastWeatherDetail
                    key={index}
                    description={date?.weather[0].description ?? ""}
                    weatherIcon={date?.weather[0].icon ?? ""}
                    date={format(parseISO(date?.dt_txt ?? ""), "dd/MM")}
                    day={format(parseISO(date?.dt_txt ?? ""), "EEEE")}
                    feelsLike={date?.main.feels_like ?? 0}
                    temp={date?.main.temp ?? 0}
                    tempMax={date?.main.temp_max ?? 0}
                    tempMin={date?.main.temp_min ?? 0}
                    airPressure={`${date?.main.pressure ?? ""} hPa`}
                    humidity={`${date?.main.humidity ?? 0}%`}
                    sunrise={format(fromUnixTime(data.city.sunrise ?? 0), "h:mm")}
                    sunset={format(fromUnixTime(data.city.sunset ?? 0), "h:mm")}
                    visibility={metersToKilometeres(date?.visibility ?? 0)}
                    windSpeed={convertWindSpeed(date?.wind.speed ?? 0)}
                />
            ))}
        </section>
    );
};

export default ForecastWeather;