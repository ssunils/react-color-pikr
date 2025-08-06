# Migration Guide

Guide for migrating from other color picker libraries to React Color Pikr.

## From react-color

React Color was a popular choice but is no longer maintained. Here's how to migrate:

### Installation
```bash
# Remove react-color
npm uninstall react-color

# Install react-color-pikr
npm install react-color-pikr
```

### Basic Usage Changes

#### Before (react-color)
```tsx
import { SketchPicker } from 'react-color';

function MyComponent() {
  const [color, setColor] = useState('#3498db');

  const handleChange = (color) => {
    setColor(color.hex);
  };

  return (
    <SketchPicker 
      color={color}
      onChange={handleChange}
    />
  );
}
```

#### After (react-color-pikr)
```tsx
import { ColorPicker } from 'react-color-pikr';

function MyComponent() {
  const [color, setColor] = useState('#3498db');

  return (
    <ColorPicker 
      value={color}
      onChange={setColor}
    />
  );
}
```

### Key Differences

| Feature | react-color | react-color-pikr |
|---------|-------------|------------------|
| Color prop | `color` | `value` |
| Change handler | Returns color object | Returns string directly |
| CSS Import | Required | Not needed (inline styles) |
| Bundle size | ~50KB | ~15KB |
| TypeScript | Community types | Built-in |
| Alpha support | Limited | Full 8-digit HEX |

### Alpha Channel Migration

#### Before (react-color)
```tsx
import { SketchPicker } from 'react-color';

const handleChange = (color) => {
  const rgba = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;
  setColor(rgba);
};

<SketchPicker 
  color={color}
  onChange={handleChange}
  disableAlpha={false}
/>
```

#### After (react-color-pikr)
```tsx
import { ColorPicker } from 'react-color-pikr';

<ColorPicker 
  value={color}
  onChange={setColor}
  showAlpha={true}
  format="rgb" // Returns rgba(r, g, b, a) format
/>
```

### Preset Colors Migration

#### Before (react-color)
```tsx
import { SwatchesPicker } from 'react-color';

const presetColors = [
  ['#FF6900', '#FCB900', '#7BDCB5', '#00D084'],
  ['#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C']
];

<SwatchesPicker 
  colors={presetColors}
  onChange={handleChange}
/>
```

#### After (react-color-pikr)
```tsx
import { ColorPicker } from 'react-color-pikr';

const presetColors = [
  '#FF6900', '#FCB900', '#7BDCB5', '#00D084',
  '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C'
];

<ColorPicker 
  value={color}
  onChange={setColor}
  presetColors={presetColors}
  showPresets={true}
/>
```

## From react-colorful

React Colorful is minimal but lacks features. Here's how to migrate:

### Installation
```bash
# Remove react-colorful
npm uninstall react-colorful

# Install react-color-pikr
npm install react-color-pikr
```

### Basic Migration

#### Before (react-colorful)
```tsx
import { HexColorPicker } from 'react-colorful';

<HexColorPicker color={color} onChange={setColor} />
```

#### After (react-color-pikr)
```tsx
import { ColorPicker } from 'react-color-pikr';

<ColorPicker value={color} onChange={setColor} />
```

### Feature Additions

With react-color-pikr, you gain many features that react-colorful doesn't have:

```tsx
// Enhanced version with all features
<ColorPicker 
  value={color}
  onChange={setColor}
  showAlpha={true}           // Alpha channel support
  showPresets={true}         // Preset color swatches
  showColorFormat={true}     // Format selector
  format="hex"               // Multiple formats
  width={320}                // Customizable size
  height={240}
/>
```

## From @uiw/react-color

### Installation
```bash
# Remove @uiw/react-color
npm uninstall @uiw/react-color

# Install react-color-pikr
npm install react-color-pikr
```

### Component Migration

#### Before (@uiw/react-color)
```tsx
import { Sketch } from '@uiw/react-color';

<Sketch
  color={color}
  onChange={(color) => setColor(color.hex)}
/>
```

#### After (react-color-pikr)
```tsx
import { ColorPicker } from 'react-color-pikr';

<ColorPicker 
  value={color}
  onChange={setColor}
/>
```

## Common Migration Patterns

### Form Integration

#### Before (Multiple libraries)
```tsx
// Various patterns from different libraries
const handleColorChange = (color) => {
  // Different libraries return different formats
  let colorValue;
  if (color.hex) colorValue = color.hex;
  else if (color.target) colorValue = color.target.value;
  else colorValue = color;
  
  setFormData(prev => ({ ...prev, color: colorValue }));
};
```

#### After (react-color-pikr)
```tsx
// Consistent string return value
const handleColorChange = (color) => {
  setFormData(prev => ({ ...prev, color }));
};

<ColorPicker 
  value={formData.color}
  onChange={handleColorChange}
/>
```

### Controlled vs Uncontrolled

React Color Pikr is always controlled, simplifying state management:

#### Before (Some libraries)
```tsx
// Complex state synchronization
const [internalColor, setInternalColor] = useState(color);

useEffect(() => {
  setInternalColor(color);
}, [color]);

const handleChange = (newColor) => {
  setInternalColor(newColor);
  onChange(newColor);
};
```

#### After (react-color-pikr)
```tsx
// Simple controlled component
<ColorPicker 
  value={color}
  onChange={onChange}
/>
```

## Breaking Changes to Watch For

### 1. Props Names
- `color` → `value`
- `onChangeComplete` → `onChange`
- `disableAlpha` → `showAlpha` (inverted logic)

### 2. Return Values
- Object with color data → Direct string value
- Multiple formats in object → Single format string

### 3. Styling
- CSS classes → Inline styles (no CSS import needed)
- Complex theming → Simple className prop

## Step-by-Step Migration

### 1. Update Dependencies
```bash
npm uninstall [old-color-picker-library]
npm install react-color-pikr
```

### 2. Update Imports
```tsx
// Old
import { SomeColorPicker } from 'old-library';

// New
import { ColorPicker } from 'react-color-pikr';
```

### 3. Update Props
```tsx
// Old pattern (varies by library)
<SomeColorPicker 
  color={color}
  onChange={(colorObj) => setColor(colorObj.hex)}
  disableAlpha={false}
/>

// New pattern
<ColorPicker 
  value={color}
  onChange={setColor}
  showAlpha={true}
/>
```

### 4. Remove CSS Imports
```tsx
// Remove these lines
import 'react-color/lib/styles.css';
import 'old-library/dist/styles.css';
// No CSS imports needed for react-color-pikr!
```

### 5. Update TypeScript Types (if applicable)
```tsx
// Old
import { ColorResult } from 'react-color';
const handleChange = (color: ColorResult) => {
  setColor(color.hex);
};

// New
import { ColorValue } from 'react-color-pikr';
const handleChange = (color: ColorValue) => {
  setColor(color);
};
```

## Migration Checklist

- [ ] Remove old color picker library
- [ ] Install react-color-pikr
- [ ] Update component imports
- [ ] Change `color` prop to `value`
- [ ] Simplify onChange handlers (no more color object)
- [ ] Remove CSS imports
- [ ] Update TypeScript types
- [ ] Test alpha channel functionality
- [ ] Test preset colors
- [ ] Test responsive behavior
- [ ] Update tests/stories

## Getting Help

If you need help migrating:

1. **Check the [Examples](./EXAMPLES.md)** for common patterns
2. **Read the [API Reference](./API.md)** for complete documentation
3. **Open an [Issue](https://github.com/ssunils/react-color-pikr/issues)** for specific migration questions
4. **Join [Discussions](https://github.com/ssunils/react-color-pikr/discussions)** for community help

## Benefits After Migration

✅ **Smaller bundle size**: Significantly reduced JavaScript payload
✅ **Better TypeScript support**: Built-in types, no @types packages needed  
✅ **No CSS conflicts**: Inline styles eliminate styling issues
✅ **Better alpha support**: Native 8-digit HEX alpha format
✅ **Consistent API**: Predictable props and return values
✅ **Active maintenance**: Regular updates and bug fixes
✅ **Better accessibility**: Improved keyboard navigation and screen reader support
