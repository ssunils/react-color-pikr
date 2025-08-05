export interface RGBColor {
  r: number;
  g: number;
  b: number;
  a?: number;
}

export interface HSVColor {
  h: number;
  s: number;
  v: number;
  a?: number;
}

export interface HSLColor {
  h: number;
  s: number;
  l: number;
  a?: number;
}

export type ColorFormat = "hex" | "rgb" | "hsv" | "hsl";

export type ColorValue = string | RGBColor | HSVColor | HSLColor;

export interface ColorPickerProps {
  /** Current color value */
  value?: ColorValue;
  /** Callback when color changes */
  onChange?: (color: ColorValue) => void;
  /** Color format to return in onChange */
  format?: ColorFormat;
  /** Callback when format changes */
  onFormatChange?: (format: ColorFormat) => void;
  /** Whether to show alpha (transparency) control */
  showAlpha?: boolean;
  /** Whether to show color format toggles */
  showColorFormat?: boolean;
  /** Whether to show preset colors */
  showPresets?: boolean;
  /** Array of preset colors */
  presetColors?: string[];
  /** Width of the color picker */
  width?: number;
  /** Height of the color picker */
  height?: number;
  /** Custom CSS class name */
  className?: string;
  /** Whether the picker is disabled */
  disabled?: boolean;
}

export interface ColorSwatchProps {
  /** Color to display */
  color: string;
  /** Size of the swatch */
  size?: number;
  /** Whether the swatch is selected */
  selected?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Custom CSS class name */
  className?: string;
}

export interface ColorInputProps {
  /** Current color value */
  value: string;
  /** Callback when value changes */
  onChange: (value: string) => void;
  /** Input format */
  format: ColorFormat;
  /** Whether the input is disabled */
  disabled?: boolean;
}
