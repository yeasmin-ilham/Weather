
import { useQuery } from "@tanstack/react-query";
import { fetchCurrentWeather, fetchForecast, fetchGeo } from "../api/weatherFetch";



export function useCurrentWeather(){
    return useQuery({
        queryKey:["weather", 1],
        queryFn:() => fetchCurrentWeather(23.8103 ,90.4125),
        retry:1
    })
}

export function useForecast(){
    return useQuery({
        queryKey:["forecast", 2],
        queryFn:() => fetchForecast(23.8103 ,90.4125),
        retry:1
    })
}
export function useGeo(){
    return useQuery({
        queryKey:["geo", 3],
        queryFn:() => fetchGeo(23.8103 ,90.4125, 3),
        retry:1
    })
}



