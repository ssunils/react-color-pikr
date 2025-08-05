import React from "react";
import type { ColorSwatchProps } from "../types";
import { parseColorString, getContrastColor } from "../utils/colorUtils";
import "./ColorSwatch.css";

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
      className={`color-swatch ${selected ? "selected" : ""} ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        cursor: onClick ? "pointer" : "default",
      }}
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
        <div className='swatch-checkmark' style={{ color: contrastColor }}>
          ✓
        </div>
      )}
    </div>
  );
};

export default ColorSwatch;
