'use client';

import {ForecastWeatherContent, Navbar} from "@/components";
import {useQuery} from "react-query";
import axios from "axios";
import {WeatherData} from "@/lib/definitions";
import {setDefaultOptions} from "date-fns";
import {es} from 'date-fns/locale'
import {useAtom} from "jotai/index";
import {latLongAtom, loadingCityAtom} from "@/app/atom";
import {useEffect} from "react";

setDefaultOptions({locale: es})

export default function Home() {
    const [place] = useAtom(latLongAtom)
    const [loadingCity] = useAtom(loadingCityAtom)

    const {isLoading, error, data, refetch} = useQuery<WeatherData>('repoData', async () => {
            const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${place.lat}&lon=${place.long}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=40`)
            return data
        }
    )

    const weatherData = data as WeatherData

    useEffect(() => {
        refetch();
    }, [place, refetch])


    if (isLoading) return (
        <div className={"flex items-center justify-center min-h-screen"}>
            <p className={"animate-bounce"}>Loading...</p>
        </div>
    )

    return (
        <div className={"flex flex-col gap-4 bg-gray-100 min-h-screen"}>
            <Navbar location={data?.city.name}/>
            <ForecastWeatherContent loadingCity={loadingCity} data={weatherData} />
        </div>
    );
}