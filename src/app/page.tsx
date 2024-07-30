'use client';

import {Container, Navbar, WeatherIcon} from "@/components";
import Image from "next/image";
import {useQuery} from "react-query";
import axios from "axios";
import {WeatherData} from "@/lib/definitions";
import {format, parseISO} from "date-fns";
import {convertKelvinToCelsius} from "@/utils/convertKelvinToCelsius";
import {getDayOrNightIcon} from "@/utils/getDayOrNightIcon";

export default function Home() {
    const {isLoading, error, data} = useQuery<WeatherData>('repoData', async () => {
            const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=25.6866142&lon=-100.3161126&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`)
            return data
        }
    )

    const firstData = data?.list[0]

    if (isLoading) return (
        <div className={"flex items-center justify-center min-h-screen"}>
            <p className={"animate-bounce"}>Loading...</p>
        </div>
    )

    return (
        <div className={"flex flex-col gap-4 bg-gray-100 min-h-screen"}>
            <Navbar/>
            <main className={"px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4"}>
                {/*Today data*/}
                <section>
                    <div>
                        <h2 className={"flex gap-1 text-2xl items-end"}>
                            <span>{format(parseISO(firstData?.dt_txt ?? ""), "EEEE")}</span>
                            <span
                                className={"text-lg"}>({format(parseISO(firstData?.dt_txt ?? ""), "dd.MM.yyyy")})</span>
                        </h2>
                        <Container className={"gap-10 px-6 items-center"}>
                            {/* temperature */}
                            <div className={"flex flex-col px-4"}>
                            <span className={"text-5xl"}>
                                {convertKelvinToCelsius(firstData?.main.temp ?? 0)}º
                            </span>
                                <p className={"text-xs space-x-1 whitespace-nowrap"}>Sensación térmica</p>
                                <p className={"text-xs space-x-2"}>
                                    <span>{convertKelvinToCelsius(firstData?.main.temp_min ?? 0)}º↓ </span>
                                    <span>{convertKelvinToCelsius(firstData?.main.temp_max ?? 0)}º↑ </span>
                                </p>
                            </div>

                            {/* time and weather icon */}
                            <div className={"flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3"}>
                                {data?.list.map((day, item) => (
                                    <div key={item}
                                         className={"flex flex-col justify-between gap-2 items-center text-xs font-semibold"}>
                                        <p className={"whitespace-nowrap"}>{format(parseISO(day.dt_txt), "h:mm a")}</p>
                                        <WeatherIcon iconName={getDayOrNightIcon(day.weather[0].icon)} />
                                        <p>{convertKelvinToCelsius(day.main.temp ?? 0)}º</p>
                                    </div>
                                ))}
                            </div>
                        </Container>
                    </div>
                </section>
                {/*5 days forecast data*/}
                <section className={"flex w-full flex-col gap-4"}>
                    <p className={"text-2xl"}>Próximos 5 días</p>
                </section>
            </main>
        </div>
    );
}
