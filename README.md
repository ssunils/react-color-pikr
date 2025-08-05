# React Color Pikr

A modern, customizable React color picker component library with 8-digit HEX alpha support, built with TypeScript.

[![npm version](https://badge.fury.io/js/react-color-pikr.svg)](https://badge.fury.io/js/react-color-pikr)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- **Intuitive Interface**: Easy-to-use color selection with saturation/value area and hue slider
- **Multiple Formats**: Support for HEX (6 & 8-digit), RGB, HSV, and HSL color formats
- **Alpha Channel**: Full transparency control with 8-digit HEX support (#RRGGBBAA)
- **Preset Colors**: Customizable color swatches for quick selection
- **Accessible**: Full keyboard navigation support
- **Touch Friendly**: Optimized for mobile devices with smooth dragging
- **Customizable**: Flexible styling and configuration options
- **Lightweight**: Minimal dependencies and small bundle size
- **TypeScript**: Full TypeScript support with type definitions

## Installation

```bash
npm install react-color-pikr
```

```bash
yarn add react-color-pikr
```

```bash
pnpm add react-color-pikr
```

## Quick Start

```tsx
import { ColorPicker } from "react-color-pikr";
import "react-color-pikr/dist/style.css";

function App() {
  const [color, setColor] = useState("#3498db80"); // 8-digit HEX with alpha

  return (
    <ColorPicker
      value={color}
      onChange={setColor}
      format='hex'
      showAlpha={true}
      showPresets={true}
    />
  );
}
```

## 📖 API Reference

### ColorPicker Props

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

### ColorSwatch Props

| Prop        | Type         | Default | Description                    |
| ----------- | ------------ | ------- | ------------------------------ |
| `color`     | `string`     | -       | Color to display               |
| `size`      | `number`     | `24`    | Size of the swatch             |
| `selected`  | `boolean`    | `false` | Whether the swatch is selected |
| `onClick`   | `() => void` | -       | Click handler                  |
| `className` | `string`     | `''`    | Custom CSS class name          |

## Utility Functions

The library also exports utility functions for color manipulation:

```typescript
import {
  hexToRgb,
  rgbToHex,
  rgbToHexAlpha,
  rgbToHsv,
  hsvToRgb,
  rgbToHsl,
  hslToRgb,
} from "react-color-pikr";

// Convert hex to RGB (supports 6 & 8-digit formats)
const rgb = hexToRgb("#3498db"); // { r: 52, g: 152, b: 219 }
const rgbAlpha = hexToRgb("#3498db80"); // { r: 52, g: 152, b: 219, a: 0.5 }

// Convert RGB to hex (6-digit format)
const hex = rgbToHex(52, 152, 219); // '#3498db'

// Convert RGB with alpha to 8-digit hex
const hexAlpha = rgbToHexAlpha(52, 152, 219, 0.5); // '#3498db80'
```

## Examples

### Basic Usage

```tsx
import { ColorPicker } from "react-color-pikr";

function BasicExample() {
  const [color, setColor] = useState("#ff6b6b");

  return <ColorPicker value={color} onChange={setColor} />;
}
```

### With Alpha Channel

```tsx
function AlphaExample() {
  const [color, setColor] = useState("rgba(255, 107, 107, 0.8)");

  return (
    <ColorPicker
      value={color}
      onChange={setColor}
      format='rgb'
      showAlpha={true}
    />
  );
}
```

### Custom Presets

```tsx
function CustomPresetsExample() {
  const customColors = [
    "#e74c3c",
    "#3498db",
    "#2ecc71",
    "#f39c12",
    "#9b59b6",
    "#1abc9c",
    "#34495e",
    "#95a5a6",
  ];

  return (
    <ColorPicker
      value={color}
      onChange={setColor}
      presetColors={customColors}
    />
  );
}
```

## Development

```bash
# Clone the repository
git clone https://github.com/ssunils/react-color-pikr.git

# Install dependencies
npm install

# Start development server
npm run dev

# Build the library
npm run build:lib

# Run linting
npm run lint
```

## 🚀 Automated Publishing

This repository uses GitHub Actions for automated publishing:

### 🔄 Continuous Integration
- **CI Pipeline**: Runs on every push and pull request
- **Multi-Node Testing**: Tests against Node.js 18, 20, and 22
- **Quality Checks**: Linting, type checking, and building
- **Bundle Analysis**: Automatic bundle size reporting

### 📦 Release Process

#### Option 1: Manual Release (Recommended)
1. Go to **Actions** tab in GitHub
2. Select **Release** workflow
3. Click **Run workflow**
4. Choose version type:
   - `patch`: Bug fixes (1.0.0 → 1.0.1)
   - `minor`: New features (1.0.0 → 1.1.0)
   - `major`: Breaking changes (1.0.0 → 2.0.0)
   - `prerelease`: Beta versions (1.0.0 → 1.1.0-beta.1)

#### Option 2: Tag-based Release
```bash
# Create and push a tag
git tag v1.0.1
git push origin v1.0.1
```

### 🏷️ Publishing Tags
- **Latest**: Stable releases (`npm install react-color-pikr`)
- **Beta**: Prerelease versions (`npm install react-color-pikr@beta`)

### 🔧 Setup Instructions for Contributors

To set up automated publishing, add these secrets to your GitHub repository:

1. **NPM_TOKEN**: Your npm authentication token
   - Go to npmjs.com → Account → Access Tokens
   - Create a new **Automation** token
   - Add to GitHub: Settings → Secrets → Actions → `NPM_TOKEN`

2. **GITHUB_TOKEN**: Automatically provided by GitHub Actions

## License

MIT © [Sunil Soundarapandian](https://github.com/ssunils)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Issues

If you find any issues, please report them on [GitHub Issues](https://github.com/ssunils/react-color-pikr/issues).
