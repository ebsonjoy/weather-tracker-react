import React from "react";
import { Tooltip } from "@mui/material";

const HighlightBox = ({ title, value, Icon, tooltip, isDarkMode = true }) => {
  const cardBackground = isDarkMode ? 
    "linear-gradient(145deg, #293B5F 0%, #1E2B45 100%)" : 
    "linear-gradient(145deg, #FFFFFF 0%, #F5F9FF 100%)";
  
  const textColor = isDarkMode ? "#FFFFFF" : "#333333";
  const borderColor = isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";

  return (
    <Tooltip title={tooltip || title}>
      <div
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
          width: "100%",
          height: "100%",
          minHeight: "150px",
          color: textColor,
        }}
      >
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
          <Icon style={{ fontSize: "30px", color: "#2196f3" }} />
        </div>
        <p style={{ fontWeight: "600", fontSize: "16px", marginBottom: "8px" }}>{title}</p>
        <p style={{ 
          fontSize: "24px", 
          fontWeight: "700",
          color: "#2196f3"
        }}>{value}</p>
      </div>
    </Tooltip>
  );
};

export default HighlightBox;