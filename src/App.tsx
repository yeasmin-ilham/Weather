import { useState } from "react";
import { Search, Droplets, Wind, Gauge, Loader2, CloudOff } from "lucide-react";
import { useCurrentWeather, useForecast, useGeo } from "./hooks/useWeatherData";

export default function Home() {
  const [city, setCity] = useState("Tokyo");
  const [inputValue, setInputValue] = useState("Tokyo");

  const {
    data: currentWeather,
    isLoading: isLoadingCurrent,
    isError: isCurrentError,
    error: currentError,
  } = useCurrentWeather();

  const { data: forecast, isLoading: isLoadingForecast } = useForecast();

  const {data:geoData} = useGeo()

  function handleSearch(event: React.FormEvent) {
    event.preventDefault();
    if (inputValue.trim()) {
      setCity(inputValue.trim());
    }
  }

  // Group forecast into one entry per day (API returns 3-hour intervals)
  const dailyForecast = forecast?.list.filter((entry) =>
    entry.dt_txt?.includes("12:00:00")
  ) ?? forecast?.list.filter((_, index) => index % 8 === 0);

  return (

    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-center text-3xl font-bold text-slate-900">
          Weather Dashboard
        </h1>


        <form onSubmit={handleSearch} className="mb-8 flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder="Search city..."
            className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
          <button
            type="submit"
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white transition-colors hover:bg-blue-700"
          >
            <Search className="h-4 w-4" />
            Search
          </button>
        </form>

        {isLoadingCurrent && (
          <div className="flex items-center justify-center gap-2 py-16 text-slate-500">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading weather...
          </div>
        )}

        {isCurrentError && (
          <div className="flex flex-col items-center gap-2 rounded-lg bg-red-50 py-10 text-red-600">
            <CloudOff className="h-8 w-8" />
            <p>{currentError instanceof Error ? currentError.message : "City not found"}</p>
          </div>
        )}

        {currentWeather && !isLoadingCurrent && (
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  {currentWeather.name}, {currentWeather.sys.country}
                </h2>
                <p className="capitalize text-slate-500">
                  {currentWeather.weather[0].description}
                </p>
              </div>
              <img
                src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
                alt={currentWeather.weather[0].description}
                className="h-16 w-16"
              />
            </div>

            <div className="mb-6 text-5xl font-bold text-slate-900">
              {Math.round(currentWeather.main.temp)}°C
              <span className="ml-3 text-lg font-normal text-slate-400">
                Feels like {Math.round(currentWeather.main.feels_like)}°C
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 border-t border-slate-100 pt-4">
              <div className="flex flex-col items-center gap-1 text-slate-600">
                <Droplets className="h-5 w-5 text-blue-500" />
                <span className="text-sm">{currentWeather.main.humidity}%</span>
                <span className="text-xs text-slate-400">Humidity</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-slate-600">
                <Wind className="h-5 w-5 text-blue-500" />
                <span className="text-sm">{currentWeather.wind.speed} m/s</span>
                <span className="text-xs text-slate-400">Wind</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-slate-600">
                <Gauge className="h-5 w-5 text-blue-500" />
                <span className="text-sm">{currentWeather.main.pressure} hPa</span>
                <span className="text-xs text-slate-400">Pressure</span>
              </div>
            </div>
          </div>
        )}



        {dailyForecast && !isLoadingForecast && (
          <div className="mt-6 grid grid-cols-5 gap-2">
            {dailyForecast.slice(0, 5).map((forecastDay) => (
              <div
                key={forecastDay.dt}
                className="flex flex-col items-center rounded-lg bg-white p-3 shadow-sm"
              >
                <span className="text-xs text-slate-500">
                  {new Date(forecastDay.dt * 1000).toLocaleDateString("en-US", {
                    weekday: "short",
                  })}
                </span>
                <img
                  src={`https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}.png`}
                  alt={forecastDay.weather[0].description}
                  className="h-10 w-10"
                />
                <span className="text-sm font-medium text-slate-900">
                  {Math.round(forecastDay.main.temp)}°
                </span>
                <span className=" text-sm text-slate-500">{forecastDay.weather[0].description}</span>
                <p className="text-sm text-purple-500">{forecast.city.name}</p>
              </div>
            ))}
          </div>
        )}

          <div className="rounded-2xl bg-white p-6 shadow-sm mt-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl  font-semibold text-green-500">
    City Name: {geoData?.[0]?.name}, 
    Country Name: {geoData?.[0]?.country}
                </h2>
                <p className="capitalize text-slate-500">
                  {geoData?.[0].state}
                </p>
              </div>
              </div>
              </div>
        
      </div>
    </div>
  );
}



