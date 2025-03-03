import React from "react";
import AirIcon from "@mui/icons-material/Air";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import InvertColorsIcon from "@mui/icons-material/InvertColors";
import HighlightBox from "./HighlightBox";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CompressIcon from "@mui/icons-material/Compress";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import AirQualityIcon from "@mui/icons-material/AirOutlined";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import { Tooltip } from "@mui/material";

const TodayHighlights = ({ weatherData, airQualityData, isDarkMode = true }) => {
  const { main, wind, visibility, sys } = weatherData;
  const airQualityIndex = airQualityData?.main?.aqi;
  const { co, no, no2, o3, pm2_5, pm10, nh3, so2 } = airQualityData?.components || {};

  const renderAirQualityDescription = (aqi) => {
    switch (aqi) {
      case 1:
        return { text: "Good", color: "#4CAF50", textColor: "#FFFFFF" };
      case 2:
        return { text: "Fair", color: "#8BC34A", textColor: "#000000" };
      case 3:
        return { text: "Moderate", color: "#FFC107", textColor: "#000000" };
      case 4:
        return { text: "Poor", color: "#FF5722", textColor: "#FFFFFF" };
      case 5:
        return { text: "Very Poor", color: "#9C27B0", textColor: "#FFFFFF" };
      default:
        return { text: "Unknown", color: "#9E9E9E", textColor: "#FFFFFF" };
    }
  };

  const airQuality = renderAirQualityDescription(airQualityIndex);

  const getTimeString = (timestamp) => {
    const date = new Date(timestamp * 1000);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${formattedMinutes} ${ampm}`;
  };

  const highlights = [
    { 
      title: "Humidity", 
      value: `${main.humidity}%`, 
      Icon: InvertColorsIcon,
      color: "#3498db",
      tooltip: "Relative humidity in the air"
    },
    {
      title: "Pressure",
      value: `${main.pressure} hPa`,
      Icon: CompressIcon,
      color: "#e74c3c",
      tooltip: "Atmospheric pressure at sea level"
    },
    {
      title: "Visibility",
      value: `${(visibility / 1000).toFixed(1)} km`,
      Icon: VisibilityIcon,
      color: "#f39c12",
      tooltip: "Maximum visibility distance"
    },
    {
      title: "Feels Like",
      value: `${Math.round(main.feels_like)}°C`,
      Icon: ThermostatIcon,
      color: "#9b59b6",
      tooltip: "Human perception of the temperature"
    },
  ];

  const cardBackground = isDarkMode ? 
    "linear-gradient(145deg, #293B5F 0%, #1E2B45 100%)" : 
    "linear-gradient(145deg, #FFFFFF 0%, #F5F9FF 100%)";
  
  const sectionBackground = isDarkMode ? 
    "linear-gradient(145deg, #1E293B 0%, #111827 100%)" : 
    "linear-gradient(145deg, #EEF6FF 0%, #E3EEFF 100%)";
  
  const textColor = isDarkMode ? "#FFFFFF" : "#333333";
  const borderColor = isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";
  const iconColor = isDarkMode ? "#64B5F6" : "#1976D2";

  return (
    <div
      style={{
        backgroundColor: "transparent",
        color: textColor,
        width: "100%",
        borderRadius: "16px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "16px",
          marginBottom: "16px",
        }}
      >
        {/* Air Quality Card */}
        <div
          style={{
            background: cardBackground,
            color: textColor,
            padding: "20px",
            borderRadius: "16px",
            boxShadow: isDarkMode 
              ? "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)" 
              : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            border: `1px solid ${borderColor}`,
            transition: "all 0.3s ease",
            height: "100%",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <AirQualityIcon style={{ fontSize: "24px", color: iconColor }} />
                <p style={{ fontSize: "18px", fontWeight: "600" }}>Air Quality Index</p>
              </div>
              <div
                style={{
                  padding: "6px 12px",
                  fontSize: "14px",
                  fontWeight: "700",
                  backgroundColor: airQuality.color,
                  color: airQuality.textColor,
                  borderRadius: "12px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                }}
              >
                {airQuality.text}
              </div>
            </div>
            
            <div
              style={{
                background: sectionBackground,
                borderRadius: "12px",
                padding: "16px",
                marginTop: "12px",
                border: `1px solid ${borderColor}`,
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "16px",
                }}
              >
                <Tooltip title="Carbon Monoxide">
                  <div style={{ textAlign: "center" }}>
                    <p style={{ fontWeight: "bold", marginBottom: "5px", fontSize: "15px" }}>CO</p>
                    <p style={{ backgroundColor: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)", padding: "4px", borderRadius: "6px" }}>{co?.toFixed(1) || 0} µg/m³</p>
                  </div>
                </Tooltip>
                <Tooltip title="Nitrogen Monoxide">
                  <div style={{ textAlign: "center" }}>
                    <p style={{ fontWeight: "bold", marginBottom: "5px", fontSize: "15px" }}>NO</p>
                    <p style={{ backgroundColor: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)", padding: "4px", borderRadius: "6px" }}>{no?.toFixed(1) || 0} µg/m³</p>
                  </div>
                </Tooltip>
                <Tooltip title="Nitrogen Dioxide">
                  <div style={{ textAlign: "center" }}>
                    <p style={{ fontWeight: "bold", marginBottom: "5px", fontSize: "15px" }}>NO₂</p>
                    <p style={{ backgroundColor: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)", padding: "4px", borderRadius: "6px" }}>{no2?.toFixed(1) || 0} µg/m³</p>
                  </div>
                </Tooltip>
                <Tooltip title="Ozone">
                  <div style={{ textAlign: "center" }}>
                    <p style={{ fontWeight: "bold", marginBottom: "5px", fontSize: "15px" }}>O₃</p>
                    <p style={{ backgroundColor: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)", padding: "4px", borderRadius: "6px" }}>{o3?.toFixed(1) || 0} µg/m³</p>
                  </div>
                </Tooltip>
              </div>
              
              {(pm2_5 || pm10 || so2 || nh3) && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "16px",
                    marginTop: "16px",
                  }}
                >
                  {pm2_5 && (
                    <Tooltip title="Fine Particulate Matter">
                      <div style={{ textAlign: "center" }}>
                        <p style={{ fontWeight: "bold", marginBottom: "5px", fontSize: "15px" }}>PM₂.₅</p>
                        <p style={{ backgroundColor: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)", padding: "4px", borderRadius: "6px" }}>{pm2_5.toFixed(1)} µg/m³</p>
                      </div>
                    </Tooltip>
                  )}
                  {pm10 && (
                    <Tooltip title="Coarse Particulate Matter">
                      <div style={{ textAlign: "center" }}>
                        <p style={{ fontWeight: "bold", marginBottom: "5px", fontSize: "15px" }}>PM₁₀</p>
                        <p style={{ backgroundColor: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)", padding: "4px", borderRadius: "6px" }}>{pm10.toFixed(1)} µg/m³</p>
                      </div>
                    </Tooltip>
                  )}
                  {so2 && (
                    <Tooltip title="Sulfur Dioxide">
                      <div style={{ textAlign: "center" }}>
                        <p style={{ fontWeight: "bold", marginBottom: "5px", fontSize: "15px" }}>SO₂</p>
                        <p style={{ backgroundColor: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)", padding: "4px", borderRadius: "6px" }}>{so2.toFixed(1)} µg/m³</p>
                      </div>
                    </Tooltip>
                  )}
                  {nh3 && (
                    <Tooltip title="Ammonia">
                      <div style={{ textAlign: "center" }}>
                        <p style={{ fontWeight: "bold", marginBottom: "5px", fontSize: "15px" }}>NH₃</p>
                        <p style={{ backgroundColor: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)", padding: "4px", borderRadius: "6px" }}>{nh3.toFixed(1)} µg/m³</p>
                      </div>
                    </Tooltip>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sunrise and Sunset Card */}
        <div
          style={{
            background: cardBackground,
            color: textColor,
            padding: "20px",
            borderRadius: "16px",
            boxShadow: isDarkMode 
              ? "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)" 
              : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            border: `1px solid ${borderColor}`,
            transition: "all 0.3s ease",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "10px", 
            marginBottom: "16px" 
          }}>
            <WbSunnyIcon style={{ fontSize: "24px", color: "#FFC107" }} />
            <p style={{ fontSize: "18px", fontWeight: "600" }}>Sunrise & Sunset</p>
          </div>
          
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              background: sectionBackground,
              borderRadius: "12px",
              padding: "20px",
              gap: "30px",
              border: `1px solid ${borderColor}`,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px",
                width: "100%",
                position: "relative",
              }}
            >
              <div 
                style={{ 
                  height: "4px", 
                  background: "linear-gradient(90deg, #FFC107 0%, #FF9800 50%, #F44336 100%)",
                  width: "70%", 
                  position: "absolute",
                  borderRadius: "2px",
                  top: "50%",
                  zIndex: 0,
                }}
              />
              
              <div 
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  position: "relative",
                  zIndex: 1,
                  background: isDarkMode ? "rgba(30, 41, 59, 0.8)" : "rgba(255, 255, 255, 0.8)",
                  padding: "12px",
                  borderRadius: "16px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                  backdropFilter: "blur(8px)",
                  minWidth: "110px",
                  border: `1px solid ${borderColor}`,
                }}
              >
                <WbSunnyIcon style={{ fontSize: "40px", color: "#FFC107", filter: "drop-shadow(0 0 8px rgba(255, 193, 7, 0.5))" }} />
                <p style={{ fontWeight: "600", margin: "5px 0", fontSize: "14px" }}>Sunrise</p>
                <p style={{ fontSize: "18px", fontWeight: "700" }}>
                  {getTimeString(sys.sunrise)}
                </p>
              </div>
              
              <div 
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  position: "relative",
                  zIndex: 1,
                  background: isDarkMode ? "rgba(30, 41, 59, 0.8)" : "rgba(255, 255, 255, 0.8)",
                  padding: "12px",
                  borderRadius: "16px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                  backdropFilter: "blur(8px)",
                  minWidth: "110px",
                  border: `1px solid ${borderColor}`,
                }}
              >
                <NightsStayIcon style={{ fontSize: "40px", color: "#5E35B1", filter: "drop-shadow(0 0 8px rgba(94, 53, 177, 0.5))" }} />
                <p style={{ fontWeight: "600", margin: "5px 0", fontSize: "14px" }}>Sunset</p>
                <p style={{ fontSize: "18px", fontWeight: "700" }}>
                  {getTimeString(sys.sunset)}
                </p>
              </div>
            </div>
            
            {/* Day Length */}
            <div 
              style={{
                textAlign: "center",
                background: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
                padding: "8px 16px",
                borderRadius: "12px",
                fontWeight: "500",
              }}
            >
              Day Length: {(() => {
                const dayLengthSec = sys.sunset - sys.sunrise;
                const hours = Math.floor(dayLengthSec / 3600);
                const minutes = Math.floor((dayLengthSec % 3600) / 60);
                return `${hours}h ${minutes}m`;
              })()}
            </div>
          </div>
        </div>
      </div>

      {/* Highlight Boxes */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
          marginTop: "16px",
        }}
      >
        {highlights.map((highlight, index) => (
          <div
            key={index}
            style={{
              background: cardBackground,
              borderRadius: "16px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: isDarkMode 
                ? "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)" 
                : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              border: `1px solid ${borderColor}`,
              transition: "all 0.3s ease",
              minHeight: "150px",
            }}
          >
            <Tooltip title={highlight.tooltip}>
              <div style={{ 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center" 
              }}>
                <div 
                  style={{ 
                    backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
                    padding: "12px",
                    borderRadius: "50%",
                    marginBottom: "12px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <highlight.Icon style={{ fontSize: "30px", color: highlight.color }} />
                </div>
                <p style={{ fontWeight: "600", fontSize: "16px", marginBottom: "8px" }}>{highlight.title}</p>
                <p style={{ 
                  fontSize: "24px", 
                  fontWeight: "700",
                  color: highlight.color
                }}>{highlight.value}</p>
              </div>
            </Tooltip>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodayHighlights;