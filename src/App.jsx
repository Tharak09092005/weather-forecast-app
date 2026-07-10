import { useState } from "react";
import WeatherBackground from "./WeatherBackground";

function App() {
  const [history, setHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError("");

      const apiKey = import.meta.env.VITE_API_KEY;

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      const data = await response.json();

      if (data.cod !== 200) {
        setError("City not found!");
        setWeather(null);
        return;
      }

      setWeather(data);
      setHistory((prev) => [city, ...prev]);

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      );

      const forecastData = await forecastResponse.json();

      setForecast(forecastData.list.slice(0, 5));
    } catch (err) {
      setError("Something went wrong!");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };
const getLocationWeather = async () => {
  try {
    setLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        const apiKey = import.meta.env.VITE_API_KEY;

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
        );

        const data = await response.json();

        setWeather(data);
        setLoading(false);
      },
      () => {
        setError("Location access denied!");
        setLoading(false);
      }
    );
  } catch (err) {
    setError("Something went wrong!");
    setLoading(false);
  }
};
const getWeatherType = () => {
  if (!weather) return "Clear";

  const temp = weather.main.temp;
  const condition = weather.weather[0].main;


  if (temp <= 0) return "Snow";
  if (temp >= 45) return "Clear";


  if (condition === "Thunderstorm") return "Thunderstorm";
  if (condition === "Rain" || condition === "Drizzle") return "Rain";
  if (condition === "Clouds") return "Clouds";
  if (
    condition === "Mist" ||
    condition === "Fog" ||
    condition === "Haze"
  ) {
    return "Mist";
  }

  return "Clear";
};


  return (
   <div className={darkMode ? "container dark" : "container"}>
      <h1>🌤 Weather Forecast App</h1>

      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={handleSearch}>Search</button>
      <button onClick={getLocationWeather}>
  📍 Use My Location
</button>
<button onClick={() => setDarkMode(!darkMode)}>
  {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
</button>
{weather && (
 
 <WeatherBackground weatherType={getWeatherType()}/>

)}
{history.length > 0 && (
  <div>
    <h3>Recent Searches</h3>

    {history.map((item, index) => (
      <p key={index}>{item}</p>
    ))}
  </div>
)}

      {loading && <p>Loading...</p>}

      {error && <p className="error">{error}</p>}

      {weather && weather.main && (
        <div className="card">
          <h2>{weather.name}</h2>
          <h3>{weather.main.temp}°C</h3>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
          <p>{weather.weather[0].description}</p>
          <p>Feels Like: {weather.main.feels_like}°C</p>
        </div>
      )}

      {forecast.length > 0 && (
        <div>
          <h2>Forecast</h2>

          {forecast.map((item, index) => (
            <div key={index} className="card">
              <p>{item.dt_txt}</p>
              <p>🌡 {item.main.temp}°C</p>
              <p>{item.weather[0].description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;