import React from "react";
import type { ColorSwatchProps } from "../types";
import { parseColorString, getContrastColor } from "../utils/colorUtils";

const swatchStyles = {
  colorSwatch: {
    borderRadius: '4px',
    border: '2px solid #ffffff',
    cursor: 'pointer',
    boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.1s ease, box-shadow 0.1s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } as React.CSSProperties,
  
  colorSwatchSelected: {
    transform: 'scale(1.1)',
    boxShadow: '0 0 0 2px #007bff',
  } as React.CSSProperties,
  
  swatchCheckmark: {
    fontSize: '12px',
    fontWeight: 'bold',
    userSelect: 'none',
    pointerEvents: 'none',
  } as React.CSSProperties,
};

const ColorSwatch: React.FC<ColorSwatchProps> = ({
  color,
  size = 24,
  selected = false,
  onClick,
  className = "",
}) => {
  const rgb = parseColorString(color);
  const contrastColor = rgb ? getContrastColor(rgb) : "#000000";

  return (
    <div
      style={{
        ...swatchStyles.colorSwatch,
        ...(selected ? swatchStyles.colorSwatchSelected : {}),
        width: size,
        height: size,
        backgroundColor: color,
        cursor: onClick ? "pointer" : "default",
      }}
      className={className}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {selected && (
        <div style={{ ...swatchStyles.swatchCheckmark, color: contrastColor }}>
          ✓
        </div>
      )}
    </div>
  );
};

export default ColorSwatch;
