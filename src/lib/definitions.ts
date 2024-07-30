export interface WeatherData {
    cod: string;
    message: number;
    cnt: number;
    list: Array<{
        dt: number;
        main: {
            temp: number;
            feels_like: number;
            temp_min: number;
            temp_max: number;
            pressure: number;
            sea_level: number;
            grnd_level: number;
            humidity: number;
            temp_kf: number;
        };
        weather: Array<{
            id: number;
            main: string;
            description: string;
            icon: string;
        }>;
        clouds: {
            all: number;
        };
        wind: {
            speed: number;
            deg: number;
            gust: number;
        };
        visibility: number;
        pop: number;
        rain?: {
            "3h": number;
        };
        sys: {
            pod: string;
        };
        dt_txt: string;
    }>;
    city: {
        id: number;
        name: string;
        coord: {
            lat: number;
            lon: number;
        };
        country: string;
        population: number;
        timezone: number;
        sunrise: number;
        sunset: number;
    };
}

export interface Location {
    id: number;
    slug: string;
    city_slug: string;
    display: string;
    ascii_display: string;
    city_name: string;
    city_ascii_name: string;
    state: string;
    country: string;
    lat: string | null;
    long: string | null;
    result_type: string;
    popularity: string;
    sort_criteria: number;
}

export interface LatLong {
    lat: string | null;
    long: string | null;
}