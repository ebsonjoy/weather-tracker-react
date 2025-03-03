import { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar.jsx";
import MainWeather from "./components/Mainweather.jsx";
import TodayHighlights from "./components/TodayHighlights.jsx";
import FiveDayForecast from "./components/FiveDayForecast.jsx";
import axios from "axios";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("London");
  const [airQualityData, setAirQualityData] = useState(null);
  const [fiveDayForecast, setFiveDayForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    fetchWeatherData({ city });
  }, [city]);

  const fetchWeatherData = ({ city, latitude, longitude }) => {
    setLoading(true);
    const API_KEY = import.meta.env.VITE_API_KEY;
    let url;

    if (latitude && longitude) {
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;
    } else if (city) {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
        fetchAirQualityData(data.coord.lat, data.coord.lon);
        fetchFiveDayForecast({ latitude: data.coord.lat, longitude: data.coord.lon });
      })
      .catch((err) => {
        console.error("Error fetching the weather data:", err);
        setLoading(false);
      });
  };

  const fetchAirQualityData = (lat, lon) => {
    const API_KEY = import.meta.env.VITE_API_KEY;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      )
      .then((response) => {
        setAirQualityData(response.data.list[0]);
      })
      .catch((err) => console.error("Error fetching the air quality data:", err));
  };

  const fetchFiveDayForecast = ({ city, latitude, longitude }) => {
    const API_KEY = import.meta.env.VITE_API_KEY;
    let url;

    if (latitude && longitude) {
      url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;
    } else if (city) {
      url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;
    }

    axios
      .get(url)
      .then((response) => {
        setFiveDayForecast(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching the 5-day forecast data:", err);
        setLoading(false);
      });
  };

  const handleSearch = (searchedCity) => {
    setCity(searchedCity);
    fetchWeatherData({ city: searchedCity });
  };

  const handleCurrentLocation = (latitude, longitude) => {
    fetchWeatherData({ latitude, longitude });
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        margin: 0,
        padding: 0,
        background: isDarkMode
          ? "linear-gradient(180deg, #1a237e 0%, #283593 50%, #303f9f 100%)"
          : "linear-gradient(180deg, #bbdefb 0%, #e3f2fd 50%, #ffffff 100%)",
        color: isDarkMode ? "#ffffff" : "#333333",
        transition: "all 0.3s ease",
      }}
    >
      <NavBar
        onSearch={handleSearch}
        onCurrentLocation={handleCurrentLocation}
        currentCity={weatherData?.name}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />
      
      {loading && !weatherData ? (
        <div 
          style={{ 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            height: "80vh",
            flexDirection: "column",
            gap: "20px"
          }}
        >
          <div 
            style={{ 
              width: "60px", 
              height: "60px", 
              border: "5px solid rgba(255,255,255,0.1)", 
              borderTopColor: "#2196f3",
              borderRadius: "50%",
              animation: "spin 1s linear infinite"
            }} 
          />
          <p style={{ fontSize: "18px", fontWeight: "500" }}>Loading weather data...</p>
          <style>
            {`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}
          </style>
        </div>
      ) : weatherData && airQualityData ? (
        <div 
          style={{ 
            display: "flex", 
            padding: "30px", 
            gap: "30px",
            flexDirection: window.innerWidth < 1000 ? "column" : "row",
            maxWidth: "1600px",
            margin: "0 auto"
          }}
        >
          <div 
            style={{ 
              flex: "1", 
              display: "flex", 
              flexDirection: "column", 
              gap: "30px" 
            }}
          >
            <MainWeather 
              weatherData={weatherData} 
              isDarkMode={isDarkMode} 
            />
            <div>
              <p 
                style={{ 
                  fontWeight: "700", 
                  fontSize: "22px", 
                  marginBottom: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}
              >
                <span 
                  style={{ 
                    width: "25px", 
                    height: "4px", 
                    backgroundColor: "#2196f3",
                    display: "inline-block",
                    borderRadius: "2px"
                  }}
                />
                5 Days Forecast
              </p>
              {fiveDayForecast && (
                <FiveDayForecast 
                  forecastData={fiveDayForecast} 
                  isDarkMode={isDarkMode} 
                />
              )}
            </div>
          </div>
          <div
            style={{ 
              display: "flex", 
              flexDirection: "column", 
              flex: "0.5", 
              gap: "20px",
              minWidth: window.innerWidth < 1000 ? "100%" : "350px"
            }}
          >
            <p 
              style={{ 
                fontWeight: "700", 
                fontSize: "22px", 
                marginBottom: "16px",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              <span 
                style={{ 
                  width: "25px", 
                  height: "4px", 
                  backgroundColor: "#2196f3",
                  display: "inline-block",
                  borderRadius: "2px"
                }}
              />
              Today's Highlights
            </p>
            <TodayHighlights 
              weatherData={weatherData} 
              airQualityData={airQualityData} 
              isDarkMode={isDarkMode}
            />
          </div>
        </div>
      ) : (
        <div 
          style={{ 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            height: "80vh",
            flexDirection: "column" 
          }}
        >
          <p style={{ fontSize: "18px", fontWeight: "500" }}>No weather data available. Try searching for a city.</p>
        </div>
      )}
      
      <footer 
        style={{
          textAlign: "center",
          padding: "20px",
          marginTop: "40px",
          color: isDarkMode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)",
          backgroundColor: isDarkMode ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.2)",
          backdropFilter: "blur(10px)",
          borderTop: isDarkMode ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)"
        }}
      >
        <p>© 2025 WeatherPulse | Real-time weather forecasts</p>
      </footer>
      
      {/* Add this to App.js for global styles */}
      <style>
        {`
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          
          body {
            margin: 0;
            padding: 0;
            font-family: 'Roboto', sans-serif;
            overflow-x: hidden;
          }
          
          /* This fixes the navbar gap at the top */
          #root {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            margin: 0;
            padding: 0;
          }
        `}
      </style>
    </div>
  );
}

export default App;