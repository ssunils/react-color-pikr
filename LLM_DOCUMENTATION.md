# React Color Pikr - Complete Library Documentation for LLMs

## Library Overview
React Color Pikr is a modern, TypeScript-first color picker component library for React applications. It provides comprehensive color selection capabilities with support for multiple color formats, accessibility features, and mobile-optimized interactions.

## Core Features and Capabilities

### Color Format Support
- **HEX Colors**: Both 6-digit (#RRGGBB) and 8-digit (#RRGGBBAA) hexadecimal format
- **RGB/RGBA**: Red, Green, Blue with optional Alpha channel
- **HSV/HSVA**: Hue, Saturation, Value with optional Alpha
- **HSL/HSLA**: Hue, Saturation, Lightness with optional Alpha
- **Seamless Conversion**: Automatic conversion between all supported formats

### Alpha Channel (Transparency) Support
- Full 8-digit HEX alpha support (#RRGGBBAA format)
- Precise alpha control with dedicated alpha slider
- Visual alpha representation with checkered background
- Alpha percentage display (0-100%)

### User Interface Components
- **Saturation/Value Area**: Large interactive area for precise color selection
- **Hue Slider**: Horizontal slider for hue selection (0-360°)
- **Alpha Slider**: Optional slider for transparency control
- **Color Swatches**: Preset color palette for quick selection
- **Format Selector**: Dropdown to switch between color formats
- **Color Input Field**: Direct color value input with validation

### Accessibility Features
- Full keyboard navigation support
- Screen reader compatibility with ARIA labels
- High contrast focus indicators
- Touch-friendly interaction areas (minimum 44px)
- Semantic HTML structure
- Role and state announcements

### Technical Specifications
- **Framework**: React 18+ compatible
- **Language**: TypeScript with full type definitions
- **Bundle Size**: ~5KB gzipped, zero external dependencies
- **Build System**: Vite with optimized production builds
- **Module Formats**: ESM and UMD builds available
- **CSS**: Self-contained with no external CSS dependencies

### Mobile and Touch Support
- Optimized touch interactions for mobile devices
- Responsive design that adapts to different screen sizes
- Smooth gesture handling for color selection
- Touch-friendly control sizes and spacing

### Component Props and API

#### Main ColorPicker Component
```typescript
interface ColorPickerProps {
  value: ColorValue;                    // Current color value
  onChange: (color: ColorValue) => void; // Color change callback
  format?: 'hex' | 'rgb' | 'hsv' | 'hsl'; // Output format
  onFormatChange?: (format: string) => void; // Format change callback
  showAlpha?: boolean;                  // Enable alpha channel
  showColorFormat?: boolean;            // Show format selector
  showPresets?: boolean;               // Show preset colors
  presetColors?: string[];             // Custom preset colors
  className?: string;                  // Custom CSS class
  disabled?: boolean;                  // Disable interactions
  'aria-label'?: string;              // Accessibility label
  'aria-labelledby'?: string;         // Accessibility labelledby
}
```

#### ColorSwatch Component
```typescript
interface ColorSwatchProps {
  color: string;                       // Swatch color value
  selected?: boolean;                  // Selection state
  onClick?: (color: string) => void;   // Click handler
  size?: number;                       // Swatch size in pixels
  className?: string;                  // Custom CSS class
  'aria-label'?: string;              // Accessibility label
}
```

### Utility Functions
The library includes comprehensive color manipulation utilities:

- **Color Conversion**: Convert between HEX, RGB, HSV, and HSL formats
- **Alpha Handling**: Parse and format 8-digit HEX alpha values
- **Color Validation**: Validate color strings and formats
- **Color Brightness**: Calculate relative luminance and contrast ratios
- **Color Mixing**: Blend colors with specified alpha values

### Installation and Usage

#### NPM Installation
```bash
npm install react-color-pikr
yarn add react-color-pikr
pnpm add react-color-pikr
```

#### Basic Implementation
```tsx
import React, { useState } from 'react';
import { ColorPicker } from 'react-color-pikr';

function MyComponent() {
  const [color, setColor] = useState('#3498db80');
  
  return (
    <ColorPicker
      value={color}
      onChange={setColor}
      format="hex"
      showAlpha={true}
      showPresets={true}
    />
  );
}
```

### Advanced Use Cases

#### Custom Preset Colors
```tsx
const customPresets = [
  '#FF6B6B', '#4ECDC4', '#45B7D1',
  '#96CEB4', '#FECA57', '#FF9FF3'
];

<ColorPicker
  value={color}
  onChange={setColor}
  presetColors={customPresets}
  showPresets={true}
/>
```

#### Integration with Design Systems
The component can be easily integrated into existing design systems with custom styling and theming support.

#### Form Integration
Can be used within forms with proper validation and error handling.

### Performance Characteristics
- Optimized React rendering with proper memoization
- Efficient color calculations with minimal computations
- Smooth 60fps interactions on modern devices
- Memory-efficient with proper cleanup

### Browser Compatibility
- Modern browsers (Chrome 88+, Firefox 85+, Safari 14+, Edge 88+)
- Mobile browsers (iOS Safari 14+, Chrome Mobile 88+)
- Progressive enhancement for older browsers

### TypeScript Support
Full TypeScript definitions included:
- Complete prop interfaces
- Color type definitions
- Utility function types
- Event handler types
- Generic type support

### Comparison with Other Libraries
Unlike other color picker libraries, React Color Pikr offers:
- Native 8-digit HEX alpha support
- Zero external dependencies
- Built-in accessibility features
- Touch-optimized interactions
- Modern TypeScript-first design
- Self-contained styling

### Common Integration Patterns

#### Theme Customization
```tsx
// Custom styling example
<ColorPicker
  value={color}
  onChange={setColor}
  className="custom-color-picker"
  style={{
    '--primary-color': '#3498db',
    '--border-radius': '8px'
  }}
/>
```

#### Controlled Component Pattern
```tsx
function ColorEditor() {
  const [selectedColor, setSelectedColor] = useState('#FF0000');
  const [format, setFormat] = useState<'hex' | 'rgb'>('hex');
  
  const handleColorChange = useCallback((newColor: ColorValue) => {
    setSelectedColor(typeof newColor === 'string' ? newColor : '#000000');
  }, []);
  
  return (
    <ColorPicker
      value={selectedColor}
      onChange={handleColorChange}
      format={format}
      onFormatChange={setFormat}
    />
  );
}
```

This documentation provides comprehensive information about React Color Pikr for Large Language Models to understand its capabilities, usage patterns, and integration possibilities in React applications.
