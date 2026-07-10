function WeatherBackground({ weatherType }) {
  return (
    <div className={`weather-background ${weatherType}`}>

      {weatherType === "Clear" && (
        <div className="sun"></div>
      )}
      
      {weatherType === "Clouds" && (
        <>
          <div className="cloud cloud1"></div>
          <div className="cloud cloud2"></div>
        </>
      )}

      {weatherType === "Rain" && (
  <div className="rain-container">
    {[...Array(150)].map((_, i) => (
      <div
        key={i}
        className="raindrop"
        style={{
          left: `${Math.random() * 100}%`,
          animationDuration: `${0.5 + Math.random()}s`,
          animationDelay: `${Math.random()}s`,
        }}
      ></div>
    ))}
  </div>
)}

     {weatherType === "Thunderstorm" && (
  <>
    <div className="rain-container">
      {[...Array(150)].map((_, i) => (
        <div
          key={i}
          className="raindrop"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${0.5 + Math.random()}s`,
          }}
        ></div>
      ))}
    </div>
    <div className="lightning"></div>
  </>
)}
      {weatherType === "Mist" && (
        <div className="fog"></div>
      )}
      {weatherType === "Snow" && (
        <div className="snow-container">
          {[...Array(60)].map((_, i) => (
            <div
              key={i}
              className="snowflake"
              style={{
                left: `${Math.random() * 100}%`,
                animationDuration: `${4 + Math.random() * 6}s`,
                animationDelay: `${Math.random() * 5}s`,
                fontSize: `${10 + Math.random() * 25}px`,
              }}
            >
              ❄️
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
export default WeatherBackground;