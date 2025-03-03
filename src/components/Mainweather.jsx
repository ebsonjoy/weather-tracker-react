import React from 'react';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import CloudIcon from '@mui/icons-material/Cloud';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const MainWeather = ({ weatherData, theme = "dark" }) => {
  const temperatureCelsius = weatherData?.main?.temp || 'N/A';
  const weatherDescription = weatherData?.weather?.[0]?.description || 'N/A';
  const weatherId = weatherData?.weather?.[0]?.id || 800;
  const cityName = weatherData?.name || 'City Not Available';
  const countryName = weatherData?.sys?.country || 'Country Not Available';
  const timestamp = weatherData?.dt || null;
  const humidity = weatherData?.main?.humidity || 'N/A';
  const windSpeed = weatherData?.wind?.speed || 'N/A';

  const currentDate = timestamp
    ? new Date(timestamp * 1000).toLocaleDateString('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    : 'Date Not Available';

  const renderWeatherIcon = () => {
    // Weather condition codes: https://openweathermap.org/weather-conditions
    if (weatherId >= 200 && weatherId < 300) {
      return <ThunderstormIcon style={{fontSize:'4rem', color:'#ffeb3b'}} />;
    } else if (weatherId >= 300 && weatherId < 600) {
      return <WaterDropIcon style={{fontSize:'4rem', color:'#64b5f6'}} />;
    } else if (weatherId >= 600 && weatherId < 700) {
      return <AcUnitIcon style={{fontSize:'4rem', color:'#90caf9'}} />;
    } else if (weatherId >= 700 && weatherId < 800) {
      return <CloudIcon style={{fontSize:'4rem', color:'#b0bec5'}} />;
    } else if (weatherId === 800) {
      return <WbSunnyIcon style={{fontSize:'4rem', color:'#ffa726'}} />;
    } else {
      return <CloudIcon style={{fontSize:'4rem', color:'#b0bec5'}} />;
    }
  };

  const getBgGradient = () => {
    // Different background gradients based on weather conditions
    if (weatherId >= 200 && weatherId < 300) {
      return 'linear-gradient(135deg, #414345 0%, #232526 100%)'; // Thunderstorm
    } else if (weatherId >= 300 && weatherId < 600) {
      return 'linear-gradient(135deg, #3a7bd5 0%, #304352 100%)'; // Rain
    } else if (weatherId >= 600 && weatherId < 700) {
      return 'linear-gradient(135deg, #8e9eab 0%, #eef2f3 100%)'; // Snow
    } else if (weatherId >= 700 && weatherId < 800) {
      return 'linear-gradient(135deg, #5D4157 0%, #A8CABA 100%)'; // Mist/Fog
    } else if (weatherId === 800) {
      return 'linear-gradient(135deg, #2980B9 0%, #6DD5FA 100%)'; // Clear
    } else {
      return 'linear-gradient(135deg, #757F9A 0%, #D7DDE8 100%)'; // Clouds
    }
  };

  return (
    <div
      style={{
        background: getBgGradient(),
        color: "white",
        borderRadius: "1rem",
        width: "auto",
        padding: "30px",
        boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        maxWidth: "700px",
      }}
    >
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "flex-start"
      }}>
        <div>
          <div style={{ fontSize: "24px", fontWeight: "bold" }}>Now</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "48px",
              fontWeight: "bold",
              margin: "10px 0",
            }}
          >
            {typeof temperatureCelsius === 'number' ? `${Math.round(temperatureCelsius)}°C` : temperatureCelsius}
          </div>
          <div style={{
            fontSize:'18px', 
            marginTop:'8px', 
            fontWeight:'500', 
            textTransform: 'capitalize',
            backgroundColor: "rgba(255,255,255,0.2)",
            padding: "5px 12px",
            borderRadius: "20px",
            display: "inline-block"
          }}>
            {weatherDescription}
          </div>
        </div>
        <div>
          {renderWeatherIcon()}
        </div>
      </div>
      
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "10px",
        padding: "15px",
        backgroundColor: "rgba(0,0,0,0.2)",
        borderRadius: "10px"
      }}>
        <div style={{ textAlign: "center" }}>
          <WaterDropIcon style={{ color: "#64b5f6" }} />
          <div>Humidity</div>
          <div style={{ fontWeight: "bold" }}>{humidity}%</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <CloudIcon style={{ color: "#b0bec5" }} />
          <div>Wind</div>
          <div style={{ fontWeight: "bold" }}>{windSpeed} m/s</div>
        </div>
      </div>
      
      <div style={{marginTop:'1rem', backgroundColor: "rgba(255,255,255,0.1)", padding: "15px", borderRadius: "10px"}}>
        <div style={{display:'flex', alignItems:'center', gap: "10px", marginBottom: "8px"}}>
          <CalendarMonthIcon style={{ color: "#ffee58" }}/>
          <span style={{ fontSize: "16px" }}>{currentDate}</span>
        </div>
        <div style={{display:'flex', alignItems:'center', gap: "10px"}}>
          <LocationOnIcon style={{ color: "#ef5350" }}/>
          <span style={{ fontSize: "16px" }}>{cityName}, {countryName}</span>
        </div>
      </div>
    </div>
  );
};

export default MainWeather;