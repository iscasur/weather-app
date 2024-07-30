'use client'

import React, {FormEvent, useState} from 'react';
import {MdWbSunny, MdMyLocation, MdOutlineLocationOn} from "react-icons/md";
import { SearchBox } from "@/components";
import axios from "axios";
import {Location} from "@/lib/definitions";
import {useAtom} from "jotai";
import {latLongAtom, loadingCityAtom} from "@/app/atom";

interface NavbarProps {
    location?: string;
}

const Navbar = ({location}: NavbarProps) => {
    const [city, setCity] = useState("")
    const [error, setError] = useState("")
    const [suggestions, setSuggestions] = useState<Location[]>([])

    const [place, setPlace] = useAtom(latLongAtom)
    const [loadingCity, setLoadingCity] = useAtom(loadingCityAtom)

    const handleOnChange = async (value: string) => {
        setCity(value)

        if (value.length >= 3) {
            try {
                const response = await axios.get(`https://search.reservamos.mx/api/v2/places?q=${city}`)
                const data = response.data.filter((location: Location) => location.result_type === "city")

                setSuggestions(data)
                setError("")
            } catch (error) {
                setSuggestions([])
            }
        }
    }

    const handleSubmitSearch = (event:  FormEvent<HTMLFormElement>) => {
        setLoadingCity(true)
        event.preventDefault()

        if (suggestions.length === 0) {
            setError("Lo sentimos, no encontramos tu ciudad :-(");
            setLoadingCity(false)
        } else {
            setError("")
            setTimeout(() => {
                setLoadingCity(false)
                setPlace({
                        lat: suggestions[0].lat,
                        long: suggestions[0].long,
                    })
            }, 500)
        }
    }

    return (
        <nav className={"shadow-sm sticky top-0 left-0 z-50 bg-white"}>
            <div className={"h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto"}>
                <div className={"flex items-center justify-center gap-2"}>
                    <h2 className={"text-gray-500 text-3xl"}>Weather</h2>
                    <MdWbSunny className={"text-3xl mt-1 text-yellow-500"} />
                </div>
                <section className={"flex gap-2 items-center"}>
                    <MdOutlineLocationOn className={"text-3xl"} />
                    <p className={"text-slate-900/90 text-sm"}>{location}</p>
                    <div className={"relative"}>
                        <SearchBox
                            value={city}
                            onSubmit={handleSubmitSearch}
                            onChange={e => {
                                handleOnChange(e.target.value)
                            }}
                        />
                    </div>
                </section>
            </div>
        </nav>
    );
};

export default Navbar;