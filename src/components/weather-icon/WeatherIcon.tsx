import React, {HTMLAttributes} from 'react';
import Image from "next/image";
import {cn} from "@/utils/cn";

const WeatherIcon = (props: HTMLAttributes<HTMLDivElement> & { iconName: string }) => {
    return (
        <div {...props} className={cn("relative h-20 w-20")}>
            <Image width={100} height={100} className={"absolute h-full w-full"} alt={"weather icon"}
                   src={`https://openweathermap.org/img/wn/${props.iconName}@4x.png`}/>
        </div>
    );
};

export default WeatherIcon;