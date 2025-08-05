import React, { useState, useCallback, useRef, useEffect } from "react";
import type { ColorPickerProps, RGBColor, HSVColor } from "../types";
import {
  rgbToHex,
  rgbToHexAlpha,
  rgbToHsv,
  hsvToRgb,
  rgbToHsl,
  parseColorString,
  rgbToCssString,
} from "../utils/colorUtils";
import ColorSwatch from "./ColorSwatch";
import "./ColorPicker.css";

const DEFAULT_PRESETS = [
  "#FF0000",
  "#FF8000",
  "#FFFF00",
  "#80FF00",
  "#00FF00",
  "#00FF80",
  "#00FFFF",
  "#0080FF",
  "#0000FF",
  "#8000FF",
  "#FF00FF",
  "#FF0080",
  "#000000",
  "#404040",
  "#808080",
  "#BFBFBF",
  "#FFFFFF",
];

const ColorPicker: React.FC<ColorPickerProps> = ({
  value = "#FF0000",
  onChange,
  format = "hex",
  onFormatChange,
  showAlpha = false,
  showColorFormat = true,
  showPresets = true,
  presetColors = DEFAULT_PRESETS,
  width = 280,
  height = 200,
  className = "",
  disabled = false,
}) => {
  const [currentColor, setCurrentColor] = useState<HSVColor>(() => {
    const rgb =
      typeof value === "string"
        ? parseColorString(value) || { r: 255, g: 0, b: 0 }
        : (value as RGBColor);
    return rgbToHsv(rgb.r, rgb.g, rgb.b);
  });

  const [isDragging, setIsDragging] = useState<
    "saturation" | "hue" | "alpha" | null
  >(null);
  const [currentFormat, setCurrentFormat] = useState(format);
  const [alpha, setAlpha] = useState(() => {
    if (typeof value === "string") {
      const rgb = parseColorString(value);
      return rgb?.a !== undefined ? rgb.a : 1;
    }
    return typeof value === "object" && value.a !== undefined ? value.a : 1;
  });

  const saturationRef = useRef<HTMLDivElement>(null);
  const hueRef = useRef<HTMLDivElement>(null);
  const alphaRef = useRef<HTMLDivElement>(null);

  // Update color when value prop changes
  useEffect(() => {
    if (typeof value === "string") {
      const rgb = parseColorString(value);
      if (rgb) {
        setCurrentColor(rgbToHsv(rgb.r, rgb.g, rgb.b));
        if (rgb.a !== undefined) {
          setAlpha(rgb.a);
        }
      }
    }
  }, [value]);

  // Update format when format prop changes
  useEffect(() => {
    setCurrentFormat(format);
  }, [format]);

  const getCurrentColorValue = useCallback(() => {
    const rgb = hsvToRgb(currentColor.h, currentColor.s, currentColor.v);

    switch (currentFormat) {
      case "hex":
        // Support both 6-digit and 8-digit HEX format
        return showAlpha && alpha < 1
          ? rgbToHexAlpha(rgb.r, rgb.g, rgb.b, alpha)
          : rgbToHex(rgb.r, rgb.g, rgb.b);
      case "rgb":
        return showAlpha && alpha < 1
          ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha.toFixed(2)})`
          : `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
      case "hsv":
        return showAlpha && alpha < 1
          ? `hsva(${currentColor.h.toFixed(2)}, ${currentColor.s.toFixed(
              2
            )}%, ${currentColor.v.toFixed(2)}%, ${alpha.toFixed(2)})`
          : `hsv(${currentColor.h.toFixed(2)}, ${currentColor.s.toFixed(
              2
            )}%, ${currentColor.v.toFixed(2)}%)`;
      case "hsl": {
        // Convert RGB to HSL for display
        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
        return showAlpha && alpha < 1
          ? `hsla(${hsl.h.toFixed(2)}, ${hsl.s.toFixed(2)}%, ${hsl.l.toFixed(
              2
            )}%, ${alpha.toFixed(2)})`
          : `hsl(${hsl.h.toFixed(2)}, ${hsl.s.toFixed(2)}%, ${hsl.l.toFixed(
              2
            )}%)`;
      }
      default:
        return rgbToHex(rgb.r, rgb.g, rgb.b);
    }
  }, [currentColor, currentFormat, showAlpha, alpha]);

  const handleColorChange = useCallback(
    (newColor: HSVColor) => {
      setCurrentColor(newColor);
      if (onChange) {
        const colorValue = getCurrentColorValue();
        onChange(colorValue);
      }
    },
    [onChange, getCurrentColorValue]
  );

  const handleSaturationMouseDown = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (disabled) return;

      setIsDragging("saturation");
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      const rect = saturationRef.current?.getBoundingClientRect();
      if (rect) {
        const s = Math.max(
          0,
          Math.min(100, ((clientX - rect.left) / rect.width) * 100)
        );
        const v = Math.max(
          0,
          Math.min(100, (1 - (clientY - rect.top) / rect.height) * 100)
        );
        handleColorChange({ ...currentColor, s, v });
      }

      e.preventDefault();
    },
    [disabled, currentColor, handleColorChange]
  );

  const handleHueMouseDown = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (disabled) return;

      setIsDragging("hue");
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;

      const rect = hueRef.current?.getBoundingClientRect();
      if (rect) {
        const h = Math.max(
          0,
          Math.min(360, ((clientX - rect.left) / rect.width) * 360)
        );
        handleColorChange({ ...currentColor, h });
      }

      e.preventDefault();
    },
    [disabled, currentColor, handleColorChange]
  );

  const handleAlphaMouseDown = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (disabled || !showAlpha) return;

      setIsDragging("alpha");
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;

      const rect = alphaRef.current?.getBoundingClientRect();
      if (rect) {
        const newAlpha = Math.max(
          0,
          Math.min(1, (clientX - rect.left) / rect.width)
        );
        setAlpha(newAlpha);
        if (onChange) {
          onChange(getCurrentColorValue());
        }
      }

      e.preventDefault();
    },
    [disabled, showAlpha, onChange, getCurrentColorValue]
  );

  const handlePresetClick = useCallback(
    (color: string) => {
      if (disabled) return;

      const rgb = parseColorString(color);
      if (rgb) {
        const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
        setCurrentColor(hsv);

        // Handle alpha from preset color if it exists
        if (rgb.a !== undefined) {
          setAlpha(rgb.a);
        }

        // Directly call onChange with the preset color
        if (onChange) {
          onChange(color);
        }
      }
    },
    [disabled, onChange]
  );

  // Mouse move and up handlers
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;

      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      if (isDragging === "saturation") {
        const rect = saturationRef.current?.getBoundingClientRect();
        if (rect) {
          const s = Math.max(
            0,
            Math.min(100, ((clientX - rect.left) / rect.width) * 100)
          );
          const v = Math.max(
            0,
            Math.min(100, (1 - (clientY - rect.top) / rect.height) * 100)
          );
          handleColorChange({ ...currentColor, s, v });
        }
      } else if (isDragging === "hue") {
        const rect = hueRef.current?.getBoundingClientRect();
        if (rect) {
          const h = Math.max(
            0,
            Math.min(360, ((clientX - rect.left) / rect.width) * 360)
          );
          handleColorChange({ ...currentColor, h });
        }
      } else if (isDragging === "alpha") {
        const rect = alphaRef.current?.getBoundingClientRect();
        if (rect) {
          const newAlpha = Math.max(
            0,
            Math.min(1, (clientX - rect.left) / rect.width)
          );
          setAlpha(newAlpha);
          if (onChange) {
            onChange(getCurrentColorValue());
          }
        }
      }

      e.preventDefault();
    };

    const handleMouseUp = () => {
      setIsDragging(null);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleMouseMove);
      document.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleMouseMove);
      document.removeEventListener("touchend", handleMouseUp);
    };
  }, [
    isDragging,
    currentColor,
    handleColorChange,
    onChange,
    getCurrentColorValue,
  ]);

  const currentRgb = hsvToRgb(currentColor.h, currentColor.s, currentColor.v);
  const saturationBackground = `linear-gradient(to right, #fff, ${rgbToHex(
    hsvToRgb(currentColor.h, 100, 100).r,
    hsvToRgb(currentColor.h, 100, 100).g,
    hsvToRgb(currentColor.h, 100, 100).b
  )})`;

  return (
    <div
      className={`color-picker ${className} ${disabled ? "disabled" : ""}`}
      style={{ width, minHeight: height }}
    >
      {/* Color Preview */}
      <div className='color-preview'>
        <div
          className='color-preview-current'
          style={{
            backgroundColor: showAlpha
              ? rgbToCssString({ ...currentRgb, a: alpha })
              : rgbToCssString(currentRgb),
          }}
        />
      </div>

      {/* Saturation/Value Area */}
      <div
        ref={saturationRef}
        className='saturation-area'
        style={{
          background: saturationBackground,
          height: height * 0.6,
        }}
        onMouseDown={handleSaturationMouseDown}
        onTouchStart={handleSaturationMouseDown}
      >
        <div
          className='saturation-overlay'
          style={{
            background: "linear-gradient(to top, #000, transparent)",
          }}
        >
          <div
            className='saturation-pointer'
            style={{
              left: `${currentColor.s}%`,
              top: `${100 - currentColor.v}%`,
            }}
          />
        </div>
      </div>

      {/* Hue Slider */}
      <div
        ref={hueRef}
        className='hue-slider'
        onMouseDown={handleHueMouseDown}
        onTouchStart={handleHueMouseDown}
      >
        <div
          className='hue-pointer'
          style={{ left: `${(currentColor.h / 360) * 100}%` }}
        />
      </div>

      {/* Alpha Slider */}
      {showAlpha && (
        <div
          ref={alphaRef}
          className='alpha-slider'
          onMouseDown={handleAlphaMouseDown}
          onTouchStart={handleAlphaMouseDown}
        >
          <div className='alpha-background' />
          <div
            className='alpha-overlay'
            style={{
              background: `linear-gradient(to right, transparent, ${rgbToCssString(
                currentRgb
              )})`,
            }}
          />
          <div className='alpha-pointer' style={{ left: `${alpha * 100}%` }} />
        </div>
      )}

      {/* Color Format Toggle */}
      {showColorFormat && (
        <div className='format-toggle'>
          {(["hex", "rgb", "hsv", "hsl"] as const).map((fmt) => (
            <button
              key={fmt}
              className={`format-button ${
                currentFormat === fmt ? "active" : ""
              }`}
              onClick={() => {
                setCurrentFormat(fmt);
                if (onFormatChange) {
                  onFormatChange(fmt);
                }
              }}
              disabled={disabled}
            >
              {fmt.toUpperCase()}
            </button>
          ))}
        </div>
      )}

      {/* Color Input */}
      <div className='color-input'>
        <input
          type='text'
          value={getCurrentColorValue()}
          onChange={(e) => {
            const rgb = parseColorString(e.target.value);
            if (rgb) {
              const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
              handleColorChange(hsv);
            }
          }}
          disabled={disabled}
          className='color-input-field'
        />
      </div>

      {/* Preset Colors */}
      {showPresets && presetColors && presetColors.length > 0 && (
        <div className='preset-colors'>
          {presetColors.map((color, index) => (
            <ColorSwatch
              key={index}
              color={color}
              size={20}
              onClick={() => handlePresetClick(color)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
