import React, {useRef, useState} from "react";
import {WeatherCard} from "./WeatherCard";
import searchIcon from "../assets/search.svg";

import {MapContainer, Marker, Popup, TileLayer, useMapEvent, useMapEvents} from "react-leaflet";
import L from "leaflet";
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import "leaflet/dist/leaflet.css";
import {Spinner} from "./Spinner";


export const WeatherMain = () => {
    const url = "https://api.openweathermap.org/data/2.5/forecast?id=524901&appid="
    const apiKey = "367828f54a088a80976ee941d7be6384";
    const mapRef = useRef();

    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState("Prague");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getWeather = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const response = await fetch(`${url}${apiKey}&q=${city}`);
        const data = await response.json();
        if (!response.ok) {
            setError(data.message);
            setIsLoading(false);
        } else {
            setWeather(data);
            setError(null);
            flyTo(data.city.coord)
            setIsLoading(false);
        }
    }

    function GetWeatherMap() {
        const map = useMapEvents({
            click: async (e) => {
                //change weather
                setIsLoading(true);
                const response = await fetch(`${url}${apiKey}&lat=${e.latlng.lat}&lon=${e.latlng.lng}`);
                const data = await response.json();
                if (!response.ok) {
                    setError(data.message);
                    setIsLoading(false);
                }
                else {
                    setWeather(data);
                    setCity(data.city.name);
                    setError(null);
                    flyTo(data.city.coord)
                    setIsLoading(false);

                }

            }
        })
        return null;
    }

    const flyTo = (coords) => {
        mapRef.current.flyTo(coords, 13);
    }

    return (
        <div className={"md:flex overflow-y-scroll"}>
            <div className="bg-gradient-to-b from-indigo-800 via-indigo-500 to-violet-400 md:w-1/3 text-white text-center p-8">
                    <form onSubmit={getWeather} className={"flex justify-center items-center space-x-4"}>
                        <img src={searchIcon} alt="search icon" className="w-8 h-8 mx-auto"/>
                        <input
                            type="text"
                            placeholder="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className={"text-black h-8 rounded-md outline-none"}
                        />
                        <button type="submit" className={"block uppercase mx-auto shadow bg-white bg-opacity-10 hover:bg-opacity-30 focus:shadow-outline focus:outline-none text-white text- py-3 px-8 rounded"}>Search</button>
                    </form>
                {error && <p>{error}</p>}
                {isLoading ? <Spinner /> : weather && <WeatherCard weather={weather}/>}
                <div className={""}>
                    <p>Created by <a className={"underline"} href="https://github.com/MarcelHor">Marcel Horváth</a></p>
                </div>
            </div>

            <div className={"h-screen w-full"}>
                <MapContainer
                    center={[49.832118, 15.332090]}
                    zoom={8}
                    scrollWheelZoom={true}
                    className={"h-screen w-full z-0"}
                    ref={mapRef}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {weather && <Marker position={[weather.city.coord.lat, weather.city.coord.lon]}>
                        <Popup>
                            {weather.city.name}
                        </Popup>
                    </Marker>}
                    }
                    <GetWeatherMap />
                </MapContainer>

            </div>
            <button onClick={() => window.scrollTo(0, 0)} className={"lg:hidden fixed bottom-4 right-4 bg-white rounded-full p-3 z-10"}> <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />  </svg></button>
        </div>
    )
}

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
})