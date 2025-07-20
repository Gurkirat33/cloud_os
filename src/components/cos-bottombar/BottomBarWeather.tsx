import WeatherWidget from "../cos/WeatherWidget";

export default async function BottomBarWeather({ city }: { city: string }) {
  const response = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${city}&aqi=no`
  );
  const data = await response.json();
  return (
    <>
      <WeatherWidget weatherData={data} />
    </>
  );
}
