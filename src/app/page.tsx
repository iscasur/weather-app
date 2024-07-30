'use client';

import {Container, ForecastWeatherDetail, Navbar, WeatherDetails, WeatherIcon} from "@/components";
import {useQuery} from "react-query";
import axios from "axios";
import {WeatherData} from "@/lib/definitions";
import {format, fromUnixTime, parseISO, setDefaultOptions} from "date-fns";
import { es } from 'date-fns/locale'
import {convertKelvinToCelsius} from "@/utils/convertKelvinToCelsius";
import {getDayOrNightIcon} from "@/utils/getDayOrNightIcon";
import {metersToKilometeres} from "@/utils/metersToKilometeres";
import {convertWindSpeed} from "@/utils/convertWindSpeed";
import {useAtom} from "jotai/index";
import {latLongAtom, loadingCityAtom} from "@/app/atom";
import {useEffect} from "react";

setDefaultOptions({locale: es})

export default function Home() {
    const [place, setPlace] = useAtom(latLongAtom)
    const [loadingCity, setLoadingCity] = useAtom(loadingCityAtom)

    const {isLoading, error, data, refetch} = useQuery<WeatherData>('repoData', async () => {
            const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${place.lat}&lon=${place.long}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=40`)
            return data
        }
    )

    useEffect(() => {
        refetch();
    }, [place, refetch])

    const firstData = data?.list[0]

    const uniqueDates = [
        ...new Set(
            data?.list.map((entry) => new Date(entry.dt * 1000).toISOString().split("T")[0]),
        )
    ]

    const firstDataForEachDate = uniqueDates.map((date) => {
        return data?.list.find((entry) => {
            const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0]
            const entryTime = new Date(entry.dt * 1000).getHours()

            return entryDate === date && entryTime >= 6;
        })
    })

    if (isLoading) return (
        <div className={"flex items-center justify-center min-h-screen"}>
            <p className={"animate-bounce"}>Loading...</p>
        </div>
    )

    return (
        <div className={"flex flex-col gap-4 bg-gray-100 min-h-screen"}>
            <Navbar location={data?.city.name}/>

            <main className={"px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4"}>
                {/*Today data*/}

                {loadingCity ? <WeatherSkeleton /> : (

                <>
                    <section className={"space-y-4"}>
                        <div className={"space-y-2"}>
                            <h2 className={"flex gap-1 text-2xl items-end"}>
                                <span className={"capitalize"}>{format(parseISO(firstData?.dt_txt ?? ""), "EEEE")}</span>
                                <span
                                    className={"text-lg"}>({format(parseISO(firstData?.dt_txt ?? ""), "dd/MM/yyyy")})</span>
                            </h2>
                            <Container className={"gap-10 px-6 items-center"}>
                                {/* temperature */}
                                <div className={"flex flex-col px-4 items-center"}>
                                    <span className={"text-5xl"}>
                                        {convertKelvinToCelsius(firstData?.main.temp ?? 0)}º
                                    </span>
                                    <p className={"text-xs space-x-1 whitespace-nowrap"}>
                                        <span>Sensación térmica</span>
                                        <span>{convertKelvinToCelsius(firstData?.main.feels_like ?? 0)}º</span>
                                    </p>
                                    <p className={"text-xs space-x-2"}>
                                        <span>{convertKelvinToCelsius(firstData?.main.temp_min ?? 0)}º↓ </span>
                                        <span>{convertKelvinToCelsius(firstData?.main.temp_max ?? 0)}º↑ </span>
                                    </p>
                                </div>

                                {/* time and weather icon */}
                                <div className={"flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3"}>
                                    {data?.list.slice(0, 5).map((day, index) => (
                                        <div key={index}
                                             className={"flex flex-col justify-between gap-2 items-center text-xs font-semibold"}>
                                            <p className={"whitespace-nowrap"}>{format(parseISO(day.dt_txt), "h:mm a")}</p>
                                            <WeatherIcon iconname={getDayOrNightIcon(day.weather[0].icon, day.dt_txt ?? "" )} />
                                            <p>{convertKelvinToCelsius(day.main.temp ?? 0)}º</p>
                                        </div>
                                    ))}
                                </div>
                            </Container>
                        </div>

                        <div className={"flex gap-4"}>
                            <Container className={"!w-fit justify-center flex-col px-4 items-center"}>
                                <p className={"capitalize text-center"}>{firstData?.weather[0].description}</p>
                                <WeatherIcon iconname={getDayOrNightIcon(firstData?.weather[0].icon ?? "", firstData?.dt_txt ?? "")} />
                            </Container>
                            <Container className={"bg-yellow-300/80 px-6 gap-4 justify-between overflow-x-auto"}>
                                <WeatherDetails
                                    visibility={metersToKilometeres(firstData?.visibility ?? 1000)}
                                    humidity={`${firstData?.main.humidity ?? 0}%`}
                                    windSpeed={convertWindSpeed(firstData?.wind.speed ?? 0)}
                                    airPressure={`${firstData?.main.pressure ?? 0} hPa`}
                                    sunrise={format(fromUnixTime(data?.city.sunrise ?? 0), "h:mm")}
                                    sunset={format(fromUnixTime(data?.city.sunset ?? 0), "h:mm")}
                                />
                            </Container>
                        </div>
                    </section>

                    {/*5 days forecast data*/}
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
                                sunrise={format(fromUnixTime(data?.city.sunrise ?? 0), "h:mm")}
                                sunset={format(fromUnixTime(data?.city.sunset ?? 0), "h:mm")}
                                visibility={metersToKilometeres(date?.visibility ?? 0)}
                                windSpeed={convertWindSpeed(date?.wind.speed ?? 0)}
                            />
                        ))}
                    </section>
                </>
                )}

            </main>
        </div>
    );
}

const WeatherSkeleton = () => {
    return (
        <section className="space-y-8 ">
            {/* Today's data skeleton */}
            <div className="space-y-2 animate-pulse">
                {/* Date skeleton */}
                <div className="flex gap-1 text-2xl items-end ">
                    <div className="h-6 w-24 bg-gray-300 rounded"></div>
                    <div className="h-6 w-24 bg-gray-300 rounded"></div>
                </div>

                {/* Time wise temperature skeleton */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((index) => (
                        <div key={index} className="flex flex-col items-center space-y-2">
                            <div className="h-6 w-16 bg-gray-300 rounded"></div>
                            <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
                            <div className="h-6 w-16 bg-gray-300 rounded"></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 5 days forecast skeleton */}
            <div className="flex flex-col gap-4 animate-pulse">
                <p className="text-2xl h-8 w-36 bg-gray-300 rounded"></p>

                {[1, 2, 3, 4, 5, 6, 7].map((index) => (
                    <div key={index} className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
                        <div className="h-8 w-28 bg-gray-300 rounded"></div>
                        <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
                        <div className="h-8 w-28 bg-gray-300 rounded"></div>
                        <div className="h-8 w-28 bg-gray-300 rounded"></div>
                    </div>
                ))}
            </div>
        </section>
    )
}