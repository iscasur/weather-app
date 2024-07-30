import React from 'react';
import {format, fromUnixTime, parseISO} from "date-fns";
import {Container, WeatherDetails, WeatherIcon} from "@/components";
import {convertKelvinToCelsius} from "@/utils/convertKelvinToCelsius";
import {getDayOrNightIcon} from "@/utils/getDayOrNightIcon";
import {metersToKilometeres} from "@/utils/metersToKilometeres";
import {convertWindSpeed} from "@/utils/convertWindSpeed";
import {WeatherData} from "@/lib/definitions";

interface ForecastWeatherTodayProps {
    data: WeatherData;
}

const ForecastWeatherToday = ({data}: ForecastWeatherTodayProps) => {
    const firstData = data.list[0]

    return (
        <section className={"space-y-4"}>
            <div className={"space-y-2"}>
                <h2 className={"flex gap-1 text-2xl items-end"}>
                                    <span
                                        className={"capitalize"}>{format(parseISO(firstData.dt_txt ?? ""), "EEEE")}</span>
                    <span
                        className={"text-lg"}>({format(parseISO(firstData.dt_txt ?? ""), "dd/MM/yyyy")})</span>
                </h2>
                <Container className={"gap-10 px-6 items-center"}>

                    {/* temperature */}
                    <div className={"flex flex-col px-4 items-center"}>
                                    <span className={"text-5xl"}>
                                        {convertKelvinToCelsius(firstData.main.temp ?? 0)}º
                                    </span>
                        <p className={"text-xs space-x-1 whitespace-nowrap"}>
                            <span>Sensación térmica</span>
                            <span>{convertKelvinToCelsius(firstData.main.feels_like ?? 0)}º</span>
                        </p>
                        <p className={"text-xs space-x-2"}>
                            <span>{convertKelvinToCelsius(firstData.main.temp_min ?? 0)}º↓ </span>
                            <span>{convertKelvinToCelsius(firstData.main.temp_max ?? 0)}º↑ </span>
                        </p>
                    </div>

                    {/* time and weather icon */}
                    <div
                        className={"flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3"}>
                        {data.list.slice(0, 5).map((day, index) => (
                            <div key={index}
                                 className={"flex flex-col justify-between gap-2 items-center text-xs font-semibold"}>
                                <p className={"whitespace-nowrap"}>{format(parseISO(day.dt_txt), "h:mm a")}</p>
                                <WeatherIcon
                                    iconname={getDayOrNightIcon(day.weather[0].icon, day.dt_txt ?? "")}/>
                                <p>{convertKelvinToCelsius(day.main.temp ?? 0)}º</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </div>

            <div className={"flex gap-4"}>
                <Container className={"!w-fit justify-center flex-col px-4 items-center"}>
                    <p className={"capitalize text-center"}>{firstData.weather[0].description}</p>
                    <WeatherIcon
                        iconname={getDayOrNightIcon(firstData.weather[0].icon ?? "", firstData.dt_txt ?? "")}/>
                </Container>
                <Container className={"bg-yellow-300/80 px-6 gap-4 justify-between overflow-x-auto"}>
                    <WeatherDetails
                        visibility={metersToKilometeres(firstData.visibility ?? 1000)}
                        humidity={`${firstData.main.humidity ?? 0}%`}
                        windSpeed={convertWindSpeed(firstData.wind.speed ?? 0)}
                        airPressure={`${firstData.main.pressure ?? 0} hPa`}
                        sunrise={format(fromUnixTime(data.city.sunrise ?? 0), "h:mm")}
                        sunset={format(fromUnixTime(data.city.sunset ?? 0), "h:mm")}
                    />
                </Container>
            </div>
        </section>
    );
};

export default ForecastWeatherToday;