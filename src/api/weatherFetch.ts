/* eslint-disable @typescript-eslint/no-unused-vars */
import { API_CONFIG } from "./config";
import type { ForecastData, GeoData, WeatherData } from "./types";

async function apiFetch<T>(url: string): Promise<T> {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error( `Request failed with status ${res.status}`);
  }

  return res.json();
}

 export function fetchCurrentWeather(lat:number , lon: number ): Promise<WeatherData>  {
  const url =`${API_CONFIG.BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_CONFIG.WEATHER_API_KEY}`;
  return apiFetch<WeatherData>(url);
}

export function fetchForecast(lat:number, lon: number): Promise<ForecastData>  {
 const url =`${API_CONFIG.BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_CONFIG.WEATHER_API_KEY}`;
  return apiFetch<ForecastData>(url);
}

export function fetchGeo(lat:number, lon:number , limit:number):Promise<GeoData> {
  const url = `${API_CONFIG.GEO}/reverse?lat=${lat}&lon=${lon}&limit=${limit}&appid=${API_CONFIG.WEATHER_API_KEY}`
    return apiFetch<GeoData>(url)

   
}



