import {atom} from "jotai";
import {LatLong} from "@/lib/definitions";

const latLongs: LatLong = {
    // default: Monterrey
    lat: "25.6866142",
    long: "-100.3161126"
}

export const latLongAtom = atom(latLongs)

export const loadingCityAtom = atom(false)