import { API_CONFIG } from "./config";

async function apiFetch<T>(url: string): Promise<T> {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error( `Request failed with status ${res.status}`);
  }

  return res.json();
}

export function fetchCurrentWeather(city: string): Promise:<> ) {
  const url =`${API_CONFIG.BASE_URL}?lat={lat}&lon={lon}&appid=${API_CONFIG.WEATHER_API_KEY}`;
  return apiFetch(url);
}

export function fetchForecast(city: string): Promise:<> ) {
  const url = `${API_CONFIG.BASE_URL}?lat={lat}&lon={lon}&limit={limit}&appid=${API_CONFIG.WEATHER_API_KEY}`;
  return apiFetch(url);
}







