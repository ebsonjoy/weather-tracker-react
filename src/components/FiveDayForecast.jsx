import React from "react";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import CloudIcon from "@mui/icons-material/Cloud";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import WaterDropIcon from "@mui/icons-material/WaterDrop";

const FiveDayForecast = ({ forecastData, isDarkMode = true }) => {
  const dailyForecast = forecastData.list.reduce((acc, forecast) => {
    const forecastDate = new Date(forecast.dt * 1000);
    const dateStr = forecastDate.toISOString().split('T')[0];
  
    if (!acc[dateStr] || Math.abs(forecastDate.getHours() - 12) < Math.abs(new Date(acc[dateStr].dt * 1000).getHours() - 12)) {
      acc[dateStr] = forecast;
    }
    
    return acc;
  }, {});
  
  const forecasts = Object.values(dailyForecast).slice(0, 5);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
    }).format(date);
  };

  const getWeatherIcon = (weatherId) => {
    if (weatherId >= 200 && weatherId < 300) {
      return <ThunderstormIcon style={{color:'#ffeb3b'}} />;
    } else if (weatherId >= 300 && weatherId < 600) {
      return <WaterDropIcon style={{color:'#64b5f6'}} />;
    } else if (weatherId >= 600 && weatherId < 700) {
      return <AcUnitIcon style={{color:'#90caf9'}} />;
    } else if (weatherId >= 700 && weatherId < 800) {
      return <CloudIcon style={{color:'#b0bec5'}} />;
    } else if (weatherId === 800) {
      return <WbSunnyIcon style={{color:'#ffa726'}} />;
    } else {
      return <CloudIcon style={{color:'#b0bec5'}} />;
    }
  };
  
  return (
    <div
      style={{
        backgroundColor: isDarkMode ? "#37474f" : "#eceff1",
        color: isDarkMode ? "white" : "#37474f",
        borderRadius: "1rem",
        padding: "20px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        maxWidth: "800px"
      }}
    >
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        gap: "15px",
      }}>
        {forecasts.map((item, index) => (
          <div
            key={index}
            style={{
              padding: "15px",
              borderRadius: "12px",
              backgroundColor: isDarkMode ? "#263238" : "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
              transition: "transform 0.2s",
              cursor: "pointer"
            }}
          >
            <div style={{ 
              fontWeight: "bold", 
              fontSize: "16px",
              color: isDarkMode ? "#90caf9" : "#1976d2"
            }}>
              {formatDate(item.dt)}
            </div>
            
            <div style={{ fontSize: "28px", fontWeight: "bold" }}>
              {Math.round(item.main.temp)}°C
            </div>
            
            <div style={{ fontSize: "36px" }}>
              {getWeatherIcon(item.weather[0].id)}
            </div>
            
            <div style={{ 
              fontSize: "14px", 
              textTransform: "capitalize",
              textAlign: "center",
              backgroundColor: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
              padding: "4px 8px",
              borderRadius: "12px",
              width: "100%"
            }}>
              {item.weather[0].description}
            </div>
            
            <div style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              fontSize: "14px",
              marginTop: "5px"
            }}>
              <div>H: {Math.round(item.main.temp_max)}°</div>
              <div>L: {Math.round(item.main.temp_min)}°</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FiveDayForecast;