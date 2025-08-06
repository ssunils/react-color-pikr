# API Reference

Complete API documentation for React Color Pikr components and utilities.

## ColorPicker Component

The main color picker component with full customization options.

### Props

| Prop              | Type                               | Default         | Description                                  |
| ----------------- | ---------------------------------- | --------------- | -------------------------------------------- |
| `value`           | `ColorValue`                       | `#FF0000`       | Current color value                          |
| `onChange`        | `(color: ColorValue) => void`      | -               | Callback when color changes                  |
| `format`          | `'hex' \| 'rgb' \| 'hsv' \| 'hsl'` | `'hex'`         | Color format to return in onChange           |
| `showAlpha`       | `boolean`                          | `false`         | Whether to show alpha (transparency) control |
| `showColorFormat` | `boolean`                          | `true`          | Whether to show color format toggles         |
| `showPresets`     | `boolean`                          | `true`          | Whether to show preset colors                |
| `presetColors`    | `string[]`                         | Default palette | Array of preset colors                       |
| `width`           | `number`                           | `280`           | Width of the color picker                    |
| `height`          | `number`                           | `200`           | Height of the color picker                   |
| `className`       | `string`                           | `''`            | Custom CSS class name                        |
| `disabled`        | `boolean`                          | `false`         | Whether the picker is disabled               |

### Usage Examples

#### Basic Usage
```tsx
import { ColorPicker } from "react-color-pikr";

function BasicExample() {
  const [color, setColor] = useState("#ff6b6b");
  return <ColorPicker value={color} onChange={setColor} />;
}
```

#### With All Options
```tsx
function FullFeaturedPicker() {
  const [color, setColor] = useState("#3498db80");
  
  return (
    <ColorPicker
      value={color}
      onChange={setColor}
      format="hex"
      showAlpha={true}
      showColorFormat={true}
      showPresets={true}
      width={320}
      height={240}
      className="my-picker"
      presetColors={["#e74c3c", "#3498db", "#2ecc71"]}
    />
  );
}
```

## ColorSwatch Component

Individual color swatch for displaying preset colors.

### Props

| Prop        | Type         | Default | Description                    |
| ----------- | ------------ | ------- | ------------------------------ |
| `color`     | `string`     | -       | Color to display               |
| `size`      | `number`     | `24`    | Size of the swatch             |
| `selected`  | `boolean`    | `false` | Whether the swatch is selected |
| `onClick`   | `() => void` | -       | Click handler                  |
| `className` | `string`     | `''`    | Custom CSS class name          |

### Usage Example

```tsx
import { ColorSwatch } from "react-color-pikr";

function SwatchExample() {
  const [selectedColor, setSelectedColor] = useState("#3498db");
  
  const colors = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12"];
  
  return (
    <div>
      {colors.map(color => (
        <ColorSwatch
          key={color}
          color={color}
          size={32}
          selected={selectedColor === color}
          onClick={() => setSelectedColor(color)}
        />
      ))}
    </div>
  );
}
```

## Utility Functions

Color conversion utilities for working with different color formats.

### hexToRgb(hex: string)

Converts hexadecimal color to RGB format. Supports both 6-digit (#RRGGBB) and 8-digit (#RRGGBBAA) formats.

```tsx
import { hexToRgb } from "react-color-pikr";

// 6-digit hex
const rgb = hexToRgb("#3498db");
// Returns: { r: 52, g: 152, b: 219 }

// 8-digit hex with alpha
const rgbAlpha = hexToRgb("#3498db80");
// Returns: { r: 52, g: 152, b: 219, a: 0.5 }
```

### rgbToHex(r: number, g: number, b: number)

Converts RGB values to 6-digit hexadecimal format.

```tsx
import { rgbToHex } from "react-color-pikr";

const hex = rgbToHex(52, 152, 219);
// Returns: "#3498db"
```

### rgbToHexAlpha(r: number, g: number, b: number, a: number)

Converts RGB with alpha to 8-digit hexadecimal format.

```tsx
import { rgbToHexAlpha } from "react-color-pikr";

const hexAlpha = rgbToHexAlpha(52, 152, 219, 0.5);
// Returns: "#3498db80"
```

### rgbToHsv(r: number, g: number, b: number)

Converts RGB to HSV (Hue, Saturation, Value) format.

```tsx
import { rgbToHsv } from "react-color-pikr";

const hsv = rgbToHsv(52, 152, 219);
// Returns: { h: 204, s: 76, v: 86 }
```

### hsvToRgb(h: number, s: number, v: number)

Converts HSV to RGB format.

```tsx
import { hsvToRgb } from "react-color-pikr";

const rgb = hsvToRgb(204, 76, 86);
// Returns: { r: 52, g: 152, b: 219 }
```

### rgbToHsl(r: number, g: number, b: number)

Converts RGB to HSL (Hue, Saturation, Lightness) format.

```tsx
import { rgbToHsl } from "react-color-pikr";

const hsl = rgbToHsl(52, 152, 219);
// Returns: { h: 204, s: 68, l: 53 }
```

### hslToRgb(h: number, s: number, l: number)

Converts HSL to RGB format.

```tsx
import { hslToRgb } from "react-color-pikr";

const rgb = hslToRgb(204, 68, 53);
// Returns: { r: 52, g: 152, b: 219 }
```

## Type Definitions

### ColorValue

```tsx
type ColorValue = string;
```

Represents a color value in any supported format:
- HEX: `"#3498db"` or `"#3498db80"`
- RGB: `"rgb(52, 152, 219)"` or `"rgba(52, 152, 219, 0.5)"`
- HSL: `"hsl(204, 68%, 53%)"` or `"hsla(204, 68%, 53%, 0.5)"`
- HSV: `"hsv(204, 76%, 86%)"`

### RGB

```tsx
interface RGB {
  r: number; // 0-255
  g: number; // 0-255
  b: number; // 0-255
  a?: number; // 0-1 (optional alpha)
}
```

### HSV

```tsx
interface HSV {
  h: number; // 0-360
  s: number; // 0-100
  v: number; // 0-100
}
```

### HSL

```tsx
interface HSL {
  h: number; // 0-360
  s: number; // 0-100
  l: number; // 0-100
}
```
