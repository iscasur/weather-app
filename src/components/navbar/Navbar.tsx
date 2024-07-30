import React from 'react';
import {MdWbSunny, MdMyLocation, MdOutlineLocationOn} from "react-icons/md";
import { SearchBox } from "@/components";

const Navbar = () => {
    return (
        <nav className={"shadow-sm sticky top-0 left-0 z-50 bg-white"}>
            <div className={"h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto"}>
                <div className={"flex items-center justify-center gap-2"}>
                    <h2 className={"text-gray-500 text-3xl"}>Weather</h2>
                    <MdWbSunny className={"text-3xl mt-1 text-yellow-500"} />
                </div>
                <section className={"flex gap-2 items-center"}>
                    <MdMyLocation className={"text-2xl text-gray-500 hover:opacity-80 cursor-pointer"} />
                    <MdOutlineLocationOn className={"text-3xl"} />
                    <p className={"text-slate-900/90 text-sm"}>Morelia</p>
                    <div>
                        <SearchBox />
                    </div>
                </section>
            </div>
        </nav>
    );
};

export default Navbar;