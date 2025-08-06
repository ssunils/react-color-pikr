# React Color Pikr

A modern, customizable React color picker component library with 8-digit HEX alpha support, built with TypeScript.

[![npm version](https://badge.fury.io/js/react-color-pikr.svg)](https://badge.fury.io/js/react-color-pikr)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

🎨 **[Live Demo](https://ssunils.github.io/react-color-pikr)** | 📚 **[Documentation](https://github.com/ssunils/react-color-pikr)** | 📦 **[npm Package](https://www.npmjs.com/package/react-color-pikr)**

## Features

- **Intuitive Interface**: Easy-to-use color selection with saturation/value area and hue slider
- **Multiple Formats**: Support for HEX (6 & 8-digit), RGB, HSV, and HSL color formats
- **Alpha Channel**: Full transparency control with 8-digit HEX support (#RRGGBBAA)
- **Preset Colors**: Customizable color swatches for quick selection
- **Accessible**: Full keyboard navigation support
- **Touch Friendly**: Optimized for mobile devices with smooth dragging
- **Customizable**: Flexible styling and configuration options
- **Zero CSS Imports**: Self-contained with inline styles - no CSS files to import
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

> **Note**: No CSS imports required! All styles are included automatically.

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

## 🎨 Customization

Since version 1.1.0-beta.2, React Color Pikr uses inline styles, making it easy to customize the appearance without CSS conflicts.

> 📖 **For advanced customization examples, see the [Complete Customization Guide](./docs/CUSTOMIZATION.md)**

### Custom Styling with className

You can add custom styles by providing a `className` and using CSS:

```tsx
import { ColorPicker } from "react-color-pikr";
import "./custom-color-picker.css";

function CustomStyledPicker() {
  return (
    <ColorPicker
      value="#3498db"
      onChange={setColor}
      className="my-custom-picker"
      width={320}
      height={240}
    />
  );
}
```

```css
/* custom-color-picker.css */
.my-custom-picker {
  border: 2px solid #e74c3c;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
}

.my-custom-picker input {
  font-family: 'Roboto Mono', monospace;
  font-size: 16px;
}
```

### Wrapper Component for Advanced Customization

Create a wrapper component to override specific styles:

```tsx
import React from 'react';
import { ColorPicker, type ColorPickerProps } from 'react-color-pikr';

interface CustomColorPickerProps extends ColorPickerProps {
  theme?: 'light' | 'dark';
}

const CustomColorPicker: React.FC<CustomColorPickerProps> = ({ 
  theme = 'light', 
  ...props 
}) => {
  const wrapperStyle = {
    padding: '20px',
    borderRadius: '12px',
    backgroundColor: theme === 'dark' ? '#2c3e50' : '#ffffff',
    border: `2px solid ${theme === 'dark' ? '#34495e' : '#e0e0e0'}`,
  };

  return (
    <div style={wrapperStyle}>
      <ColorPicker
        {...props}
        width={props.width || 300}
        height={props.height || 220}
      />
    </div>
  );
};
```

### Themed Color Picker

Create different themes for your color picker:

```tsx
const themes = {
  minimal: {
    container: {
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      padding: '12px',
      backgroundColor: '#fafafa',
    }
  },
  modern: {
    container: {
      border: 'none',
      borderRadius: '16px',
      padding: '24px',
      backgroundColor: '#ffffff',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
    }
  },
  dark: {
    container: {
      border: '1px solid #444',
      borderRadius: '12px',
      padding: '20px',
      backgroundColor: '#2c3e50',
      color: '#ecf0f1',
    }
  }
};

function ThemedColorPicker({ theme = 'modern' }) {
  return (
    <div style={themes[theme].container}>
      <ColorPicker
        value={color}
        onChange={setColor}
        showAlpha={true}
      />
    </div>
  );
}
```

### Responsive Color Picker

Make the color picker responsive for different screen sizes:

```tsx
import { useState, useEffect } from 'react';

function ResponsiveColorPicker() {
  const [dimensions, setDimensions] = useState({ width: 280, height: 200 });

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      if (width < 480) {
        setDimensions({ width: 260, height: 180 });
      } else if (width < 768) {
        setDimensions({ width: 300, height: 220 });
      } else {
        setDimensions({ width: 320, height: 240 });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <ColorPicker
      value={color}
      onChange={setColor}
      width={dimensions.width}
      height={dimensions.height}
      showAlpha={true}
    />
  );
}
```

### Custom Preset Colors with Categories

Organize preset colors into categories:

```tsx
const colorCategories = {
  primary: ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6'],
  neutral: ['#95a5a6', '#7f8c8d', '#34495e', '#2c3e50', '#ecf0f1'],
  pastel: ['#ffeaa7', '#fab1a0', '#fd79a8', '#a29bfe', '#6c5ce7'],
};

function CategorizedColorPicker() {
  const [selectedCategory, setSelectedCategory] = useState('primary');
  
  return (
    <div>
      {/* Category Selector */}
      <div style={{ marginBottom: '16px' }}>
        {Object.keys(colorCategories).map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              margin: '0 4px',
              padding: '6px 12px',
              borderRadius: '4px',
              border: selectedCategory === category ? '2px solid #3498db' : '1px solid #ddd',
              background: selectedCategory === category ? '#e3f2fd' : '#fff',
            }}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      
      <ColorPicker
        value={color}
        onChange={setColor}
        presetColors={colorCategories[selectedCategory]}
        showPresets={true}
      />
    </div>
  );
}
```

### Integration with CSS-in-JS Libraries

Use with styled-components or emotion:

```tsx
import styled from 'styled-components';
import { ColorPicker } from 'react-color-pikr';

const StyledColorPickerWrapper = styled.div`
  .color-picker {
    border: 2px solid ${props => props.theme.primary};
    border-radius: 16px;
    
    input {
      font-family: 'JetBrains Mono', monospace;
      background: ${props => props.theme.inputBg};
      color: ${props => props.theme.text};
    }
  }
`;

function StyledColorPicker() {
  return (
    <StyledColorPickerWrapper>
      <ColorPicker
        value={color}
        onChange={setColor}
        className="color-picker"
      />
    </StyledColorPickerWrapper>
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

## License

MIT © [Sunil Soundarapandian](https://github.com/ssunils)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Build library: `npm run build:lib`

### Release Process

Before releasing, validate your workspace:
```bash
npm run validate-release
```

Create releases using GitHub Actions (recommended) or npm scripts:
```bash
npm run release:patch  # Bug fixes
npm run release:minor  # New features  
npm run release:major  # Breaking changes
npm run release:beta   # Prerelease
```

See [Release Documentation](.github/RELEASE.md) for detailed information.

## Issues

If you find any issues, please report them on [GitHub Issues](https://github.com/ssunils/react-color-pikr/issues).
