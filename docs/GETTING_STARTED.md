# Installation & Getting Started

Get up and running with React Color Pikr in minutes.

## Installation

Choose your preferred package manager:

### npm
```bash
npm install react-color-pikr
```

### yarn
```bash
yarn add react-color-pikr
```

### pnpm
```bash
pnpm add react-color-pikr
```

### CDN (UMD)
```html
<script src="https://unpkg.com/react-color-pikr@latest/dist/react-color-pikr.umd.js"></script>
```

## Requirements

- React 16.8+ (hooks support)
- TypeScript 4.0+ (if using TypeScript)

## Quick Start

### 1. Basic Import

```tsx
import { ColorPicker } from 'react-color-pikr';
```

### 2. Simple Usage

```tsx
import React, { useState } from 'react';
import { ColorPicker } from 'react-color-pikr';

function App() {
  const [color, setColor] = useState('#3498db');

  return (
    <div>
      <h1>My Color Picker App</h1>
      <ColorPicker 
        value={color} 
        onChange={setColor} 
      />
      <p>Selected color: {color}</p>
    </div>
  );
}

export default App;
```

### 3. No CSS Import Required!

Unlike many other color picker libraries, React Color Pikr uses inline styles, so you don't need to import any CSS files. Everything works out of the box!

## Key Features

### ✨ 8-Digit HEX Alpha Support
```tsx
const [color, setColor] = useState('#3498db80'); // 50% transparency

<ColorPicker 
  value={color} 
  onChange={setColor} 
  showAlpha={true} 
/>
```

### 🎨 Multiple Color Formats
```tsx
<ColorPicker 
  value={color} 
  onChange={setColor} 
  format="rgb" // hex, rgb, hsl, hsv
/>
```

### 🎯 Preset Colors
```tsx
const presets = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12'];

<ColorPicker 
  value={color} 
  onChange={setColor} 
  presetColors={presets}
  showPresets={true}
/>
```

### 📱 Touch Friendly
Works seamlessly on mobile devices with touch interactions.

### ♿ Accessible
Full keyboard navigation support with proper ARIA labels.

## TypeScript Support

React Color Pikr includes comprehensive TypeScript definitions:

```tsx
import { ColorPicker, ColorValue, ColorPickerProps } from 'react-color-pikr';

interface MyComponentProps {
  initialColor?: ColorValue;
  onColorChange?: (color: ColorValue) => void;
}

const MyComponent: React.FC<MyComponentProps> = ({ 
  initialColor = '#3498db',
  onColorChange 
}) => {
  const [color, setColor] = useState<ColorValue>(initialColor);

  const handleChange = (newColor: ColorValue) => {
    setColor(newColor);
    onColorChange?.(newColor);
  };

  return (
    <ColorPicker 
      value={color} 
      onChange={handleChange} 
      showAlpha={true}
    />
  );
};
```

## Browser Support

React Color Pikr works in all modern browsers:

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ iOS Safari 12+
- ✅ Android Chrome 60+

## Bundle Size

The library is designed to be lightweight:

- **Minified**: ~15KB
- **Minified + Gzipped**: ~5KB
- **Dependencies**: Only React (peer dependency)

## Common Patterns

### Form Integration

```tsx
function ColorForm() {
  const [formData, setFormData] = useState({
    backgroundColor: '#ffffff',
    textColor: '#000000'
  });

  const handleColorChange = (field: string) => (color: ColorValue) => {
    setFormData(prev => ({
      ...prev,
      [field]: color
    }));
  };

  return (
    <form>
      <div>
        <label>Background Color:</label>
        <ColorPicker 
          value={formData.backgroundColor}
          onChange={handleColorChange('backgroundColor')}
        />
      </div>
      
      <div>
        <label>Text Color:</label>
        <ColorPicker 
          value={formData.textColor}
          onChange={handleColorChange('textColor')}
        />
      </div>
    </form>
  );
}
```

### Theme Customization

```tsx
function ThemeCustomizer() {
  const [theme, setTheme] = useState({
    primary: '#3498db',
    secondary: '#2ecc71',
    accent: '#e74c3c'
  });

  // Apply theme to CSS variables
  useEffect(() => {
    Object.entries(theme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}-color`, value);
    });
  }, [theme]);

  return (
    <div>
      {Object.entries(theme).map(([key, value]) => (
        <div key={key}>
          <label>{key.charAt(0).toUpperCase() + key.slice(1)} Color:</label>
          <ColorPicker 
            value={value}
            onChange={(color) => setTheme(prev => ({ ...prev, [key]: color }))}
            showAlpha={true}
          />
        </div>
      ))}
    </div>
  );
}
```

## Troubleshooting

### Common Issues

#### 1. TypeScript Errors
If you're getting TypeScript errors, make sure you have the correct React types installed:

```bash
npm install @types/react @types/react-dom
```

#### 2. Module Resolution
If imports aren't working, try:

```tsx
// Instead of named import
import { ColorPicker } from 'react-color-pikr';

// Try default import
import ColorPicker from 'react-color-pikr';
```

#### 3. Build Errors
If you're getting build errors, ensure your bundler supports ES modules. For older setups, use the UMD build:

```tsx
import ColorPicker from 'react-color-pikr/dist/react-color-pikr.umd.js';
```

### Performance Tips

1. **Memoize preset colors**: If you're passing custom preset colors, wrap them in `useMemo`
2. **Debounce onChange**: For expensive operations, debounce the color change handler
3. **Use React.memo**: Wrap the ColorPicker in `React.memo` if the parent re-renders frequently

## Next Steps

- 📖 **[API Reference](./API.md)**: Complete component and utility documentation
- 🎨 **[Customization Guide](./CUSTOMIZATION.md)**: Advanced styling and theming
- 💡 **[Examples](./EXAMPLES.md)**: Real-world usage examples
- 🔧 **[Migration Guide](./MIGRATION.md)**: Upgrading from other libraries

## Getting Help

- 🐛 **[Report Issues](https://github.com/ssunils/react-color-pikr/issues)**
- 💬 **[Discussions](https://github.com/ssunils/react-color-pikr/discussions)**
- 📧 **Email**: sunil.soundarapandian@gmail.com

## Stay Updated

- ⭐ **[Star on GitHub](https://github.com/ssunils/react-color-pikr)** to get updates
- 📦 **[Follow on npm](https://www.npmjs.com/package/react-color-pikr)** for new releases
- 🐦 **Follow the author** for React tips and updates
