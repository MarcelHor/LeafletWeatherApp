import React from 'react';

export const WeatherCard = ({weather}) => {

    return (
        <div className={"mt-28 text-left"}>
            <img src = {'http://openweathermap.org/img/w/${weather.icon}.png'}/>
            <h2 className="text-2xl">{weather.city.name}, {weather.city.country}</h2>
            <p className="text-xl">Temperature: {Math.round(weather.list[0].main.temp - 273.15)}°C</p>
            <p className="text-xl">Feels like: {Math.round(weather.list[0].main.feels_like - 273.15)}°C</p>
            <p className="text-xl">Pressure: {weather.list[0].main.pressure}Pa</p>
            <p className="text-xl">Wind speed: {weather.list[0].wind.speed}m/s</p>
        </div>
    )
}