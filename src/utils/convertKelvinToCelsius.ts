export function convertKelvinToCelsius(tempInKelvin: number): number {
    const tempInCelsius: number = tempInKelvin - 273.15;
    return Math.floor(tempInCelsius)
}