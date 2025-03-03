import React, { useState, useEffect } from "react";
import FilterDramaIcon from "@mui/icons-material/FilterDrama";
import { Button, IconButton, InputAdornment, Fade } from "@mui/material";
import TextField from "@mui/material/TextField";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import SearchIcon from "@mui/icons-material/Search";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import Brightness3Icon from "@mui/icons-material/Brightness3";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const NavBar = ({ onSearch, onCurrentLocation, currentCity, isDarkMode, toggleDarkMode }) => {
  const [searchCity, setSearchCity] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchClick = () => {
    if (searchCity.trim()) {
      onSearch(searchCity);
      setSearchCity("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && searchCity.trim()) {
      onSearch(searchCity);
      setSearchCity("");
    }
  };

  const handleCurrentLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onCurrentLocation(latitude, longitude);
        },
        (error) => {
          console.error("Error fetching current location:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 30px",
        position: "sticky",
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
        zIndex: 100,
        margin: 0,
        transition: "all 0.3s ease",
        boxShadow: isScrolled 
          ? isDarkMode 
            ? "0 4px 20px rgba(0, 0, 0, 0.4)" 
            : "0 4px 12px rgba(0, 0, 0, 0.15)" 
          : "none",
        background: isDarkMode 
          ? "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)" 
          : "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
        backdropFilter: "blur(8px)",
        color: isDarkMode ? "#ffffff" : "#333333",
        borderRadius: "0 0 20px 20px",
      }}
    >
      {/* Logo and App Name Section */}
      <div 
        style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "8px",
          cursor: "pointer"
        }}
      >
        <FilterDramaIcon 
          style={{ 
            fontSize: "36px", 
            color: isDarkMode ? "#64b5f6" : "#1976d2",
            filter: "drop-shadow(0 0 6px rgba(33, 150, 243, 0.5))"
          }} 
        />
        <div>
          <p 
            style={{ 
              fontWeight: "bold", 
              fontSize: "22px", 
              margin: 0,
              letterSpacing: "1px",
              textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
              display: "flex",
              alignItems: "center"
            }}
          >
            Weather<span style={{ color: "#2196f3" }}>Pulse</span>
            <span 
              style={{ 
                fontSize: "10px", 
                backgroundColor: "#2196f3", 
                color: "white", 
                padding: "2px 6px", 
                borderRadius: "10px", 
                marginLeft: "6px",
                fontWeight: "normal",
                textShadow: "none"
              }}
            >
              BETA
            </span>
          </p>
          <p 
            style={{ 
              fontSize: "12px", 
              margin: 0, 
              opacity: 0.8,
              fontStyle: "italic"
            }}
          >
            Real-time forecasts
          </p>
        </div>
      </div>

      {/* Current City Display */}
      {currentCity && (
        <Fade in={!!currentCity}>
          <div 
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
              padding: "6px 12px",
              borderRadius: "20px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              backdropFilter: "blur(5px)",
              marginLeft: "12px",
              transition: "all 0.3s ease",
              border: isDarkMode ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.05)"
            }}
          >
            <LocationOnIcon style={{ fontSize: "20px", marginRight: "4px", color: "#f44336" }} />
            <span style={{ fontWeight: "600" }}>{currentCity}</span>
          </div>
        </Fade>
      )}

      {/* Search Section */}
      <div 
        style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "8px",
          width: "35%",
          maxWidth: "450px",
          minWidth: "250px"
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search for a city..."
          size="small"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          onKeyPress={handleKeyPress}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
          style={{
            backgroundColor: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.7)",
            borderRadius: "24px",
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "24px",
              "& fieldset": {
                borderColor: isDarkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)",
              },
              "&:hover fieldset": {
                borderColor: "#2196f3",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#2196f3",
              },
            },
            "& .MuiInputBase-input": {
              color: isDarkMode ? "white" : "inherit",
            }
          }}
        />
        <Button
          variant="contained"
          onClick={handleSearchClick}
          style={{
            borderRadius: "24px",
            backgroundColor: "#2196f3",
            textTransform: "none",
            fontWeight: "bold",
            boxShadow: "0 4px 12px rgba(33, 150, 243, 0.4)",
            padding: "8px 16px",
            transition: "all 0.2s ease",
          }}
          sx={{
            "&:hover": {
              backgroundColor: "#1976d2",
              transform: "translateY(-2px)",
              boxShadow: "0 6px 16px rgba(33, 150, 243, 0.5)",
            }
          }}
        >
          Search
        </Button>
      </div>

      {/* Controls Section */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        {/* Dark Mode Toggle */}
        <IconButton 
          onClick={toggleDarkMode}
          style={{
            color: isDarkMode ? "#fdd835" : "#5e35b1",
            backgroundColor: isDarkMode ? "rgba(253, 216, 53, 0.1)" : "rgba(94, 53, 177, 0.1)",
            padding: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            border: isDarkMode ? "1px solid rgba(253, 216, 53, 0.3)" : "1px solid rgba(94, 53, 177, 0.3)",
            transition: "all 0.2s ease",
          }}
          sx={{
            "&:hover": {
              backgroundColor: isDarkMode ? "rgba(253, 216, 53, 0.2)" : "rgba(94, 53, 177, 0.2)",
              transform: "scale(1.05)",
            }
          }}
        >
          {isDarkMode ? <WbSunnyIcon /> : <Brightness3Icon />}
        </IconButton>
        
        {/* Current Location Button */}
        <Button
          variant="contained"
          startIcon={<GpsFixedIcon />}
          onClick={handleCurrentLocationClick}
          style={{
            borderRadius: "24px",
            backgroundColor: isDarkMode ? "#455a64" : "#546e7a",
            textTransform: "none",
            fontWeight: "600",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
            padding: "8px 16px",
            transition: "all 0.2s ease",
          }}
          sx={{
            "&:hover": {
              backgroundColor: isDarkMode ? "#607d8b" : "#78909c",
              transform: "translateY(-2px)",
              boxShadow: "0 6px 16px rgba(0, 0, 0, 0.25)",
            }
          }}
        >
          My Location
        </Button>
      </div>
    </nav>
  );
};

export default NavBar;