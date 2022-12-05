import React from 'react';

export const WeatherCard = ({weather}) => {

    return (
        <div className={"mt-16 bg-white bg-opacity-10 pb-16 pt-4"}>
            <div className={"text-center"}>
                <h2 className="text-2xl">{weather.city.name}, {weather.city.country}</h2>
            </div>
            <div className={"grid grid-cols-2 gap-4 justify-items-center pt-8 "}>
                <div className={"shadow bg-white bg-opacity-10 h-16 w-32"}>
                 <p className="text-xl">Temperature: <br></br> {Math.round(weather.list[0].main.temp - 273.15)}°C</p>
                </div>
                <div className={"shadow bg-white bg-opacity-10 h-16 w-32"}>
                 <p className="text-xl">Feels like: <br></br>  {Math.round(weather.list[0].main.feels_like - 273.15)}°C</p>
                </div>
                <div className={"shadow bg-white bg-opacity-10 h-16 w-32"}>
                    <p className="text-xl">Pressure: <br></br>{weather.list[0].main.pressure}Pa</p>
                </div>
                <div className={"shadow bg-white bg-opacity-10 h-16 w-32"}>
                    <p className="text-xl">Wind speed:<br></br> {weather.list[0].wind.speed}m/s</p>
                </div>
                <div className={"shadow bg-white bg-opacity-10 h-16 w-32"}>
                    <p className="text-xl">Humidity: <br></br>{weather.list[0].main.humidity}%</p>
                </div>
                <div className={"shadow bg-white bg-opacity-10 h-16 w-32"}>
                    <p className="text-xl">Clouds: <br></br>{weather.list[0].clouds.all}%</p>
                </div>
                <div className={"shadow bg-white bg-opacity-10 h-16 w-32"}>
                    <p className="text-xl">Sunrise: <br></br>{new Date(weather.city.sunrise * 1000).toLocaleTimeString()}</p>
                </div>
                <div className={"shadow bg-white bg-opacity-10 h-16 w-32"}>
                    <p className="text-xl">Sunset: <br></br>{new Date(weather.city.sunset * 1000).toLocaleTimeString()}</p>
                </div>
            </div>
        </div>
    )
}