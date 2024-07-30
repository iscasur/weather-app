import React from 'react';
import {Container, WeatherDetails, WeatherIcon} from "@/components";
import {convertKelvinToCelsius} from "@/utils/convertKelvinToCelsius";
import {WeatherDetailsProps} from "@/components/weather-details";

export interface ForecastWeatherDetailProps extends WeatherDetailsProps {
    weatherIcon: string;
    date: string;
    day: string;
    temp: number;
    feelsLike: number;
    tempMin: number;
    tempMax: number;
    description: string;
}

const ForecastWeatherDetail = (props: ForecastWeatherDetailProps) => {
    return (
        <Container className={"gap-4"}>
            <section className={"flex gap-4 items-center px-4"}>
                <div className={"flex flex-col gap-1 items-center"}>
                    <WeatherIcon iconname={props.weatherIcon} />
                    <p>{props.date}</p>
                    <p className={"capitalize text-sm"}>{props.day}</p>
                </div>

                <div className={"flex flex-col px-4 text-center"}>
                    <span className={"text-5xl"}>{convertKelvinToCelsius(props.temp ?? 0)}º</span>
                    <p className={"text-xs space-x-1 whitespace-nowrap"}>
                        <span>Sensación térmica</span>
                        <span>{convertKelvinToCelsius(props.feelsLike ?? 0)}º</span>
                    </p>
                    <p className={"capitalize"}>{props.description}</p>
                </div>
            </section>

            <section className={"overflow-x-auto flex justify-between gap-4 px-4 w-full pr-10"}>
                <WeatherDetails {...props} />
            </section>
        </Container>
    );
};

export default ForecastWeatherDetail;