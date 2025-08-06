# React Color Pikr - Frequently Asked Questions (FAQ)

## General Questions

### What is React Color Pikr?
React Color Pikr is a modern, accessible color picker component library for React applications. It provides comprehensive color selection capabilities with support for multiple color formats, alpha channels, and built-in accessibility features.

### Why choose React Color Pikr over other color picker libraries?
- **8-digit HEX alpha support**: Native support for #RRGGBBAA format
- **Zero dependencies**: No external libraries required
- **Accessibility first**: WCAG 2.1 compliant with keyboard navigation
- **TypeScript native**: Built with TypeScript from the ground up
- **Mobile optimized**: Touch-friendly with responsive design
- **Self-contained**: No CSS imports needed

### What color formats are supported?
- HEX (6-digit: #RRGGBB, 8-digit: #RRGGBBAA)
- RGB/RGBA (rgb(r, g, b), rgba(r, g, b, a))
- HSV/HSVA (hsv(h, s, v), hsva(h, s, v, a))
- HSL/HSLA (hsl(h, s, l), hsla(h, s, l, a))

## Installation and Setup

### How do I install React Color Pikr?
```bash
npm install react-color-pikr
# or
yarn add react-color-pikr
# or
pnpm add react-color-pikr
```

### Do I need to import CSS files?
No! React Color Pikr is self-contained with inline styles. No external CSS imports are required.

### What are the minimum requirements?
- React 18+
- TypeScript 4.5+ (optional but recommended)
- Modern browser support (Chrome 88+, Firefox 85+, Safari 14+)

## Usage and Implementation

### How do I implement basic color picking?
```tsx
import React, { useState } from 'react';
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

### How do I enable alpha/transparency support?
```tsx
<ColorPicker
  value={color}
  onChange={setColor}
  showAlpha={true}
  format="hex" // Will output 8-digit HEX: #RRGGBBAA
/>
```

### How do I customize preset colors?
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

### How do I handle different color formats?
```tsx
const [color, setColor] = useState('#3498db');
const [format, setFormat] = useState('hex');

<ColorPicker
  value={color}
  onChange={setColor}
  format={format}
  onFormatChange={setFormat}
  showColorFormat={true}
/>
```

## Accessibility

### Is React Color Pikr accessible?
Yes! React Color Pikr is built with accessibility in mind:
- Full keyboard navigation support
- Screen reader compatibility with ARIA labels
- High contrast focus indicators
- Touch-friendly interaction areas (44px minimum)
- Semantic HTML structure

### How do I improve accessibility further?
```tsx
<ColorPicker
  value={color}
  onChange={setColor}
  aria-label="Choose background color"
  aria-labelledby="color-picker-heading"
/>
```

## Mobile and Touch Support

### Does it work on mobile devices?
Yes! React Color Pikr is optimized for mobile devices with:
- Touch-friendly controls
- Responsive design
- Smooth gesture handling
- Mobile-first approach

### Are there any mobile-specific considerations?
The component automatically adapts to touch interactions. No additional configuration is needed for mobile support.

## Integration with Other Libraries

### How do I use it with React Hook Form?
```tsx
import { Controller, useForm } from 'react-hook-form';

const { control } = useForm();

<Controller
  name="color"
  control={control}
  render={({ field }) => (
    <ColorPicker
      value={field.value}
      onChange={field.onChange}
    />
  )}
/>
```

### How do I use it with Formik?
```tsx
import { Field } from 'formik';

<Field name="color">
  {({ field, form }) => (
    <ColorPicker
      value={field.value}
      onChange={(color) => form.setFieldValue('color', color)}
    />
  )}
</Field>
```

### Can I use it with state management libraries?
Yes! It works with any state management solution:

```tsx
// Redux
const color = useSelector(state => state.theme.color);
const dispatch = useDispatch();

<ColorPicker
  value={color}
  onChange={(color) => dispatch(setColor(color))}
/>

// Zustand
const { color, setColor } = useColorStore();
<ColorPicker value={color} onChange={setColor} />
```

## Styling and Customization

### How do I customize the appearance?
```tsx
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

### Can I theme the component?
Yes! The component supports CSS custom properties for theming. You can override colors, spacing, and other visual properties.

## Performance

### What's the bundle size impact?
React Color Pikr is lightweight at approximately 5KB gzipped with zero external dependencies.

### Is it performant on mobile devices?
Yes! The component is optimized for 60fps interactions and includes proper React memoization for efficient rendering.

## TypeScript Support

### Does it support TypeScript?
Yes! React Color Pikr is built with TypeScript and includes comprehensive type definitions.

### What types are available?
```typescript
import type { ColorValue, ColorFormat, ColorPickerProps } from 'react-color-pikr';
```

## Troubleshooting

### The component doesn't update when I change the value prop
Make sure you're using a controlled component pattern:
```tsx
const [color, setColor] = useState('#3498db');

<ColorPicker
  value={color} // Controlled value
  onChange={setColor} // Update state
/>
```

### Alpha channel isn't working
Ensure you have `showAlpha={true}` and are using a format that supports alpha:
```tsx
<ColorPicker
  value={color}
  onChange={setColor}
  showAlpha={true}
  format="hex" // Will output 8-digit HEX
/>
```

### Colors appear differently than expected
Check the color format being used. Different formats may represent the same visual color differently:
- HEX: #3498db
- RGB: rgb(52, 152, 219)
- HSL: hsl(204, 70%, 53%)

## Browser Compatibility

### Which browsers are supported?
- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+
- Mobile browsers (iOS Safari 14+, Chrome Mobile 88+)

### What about older browsers?
The component uses modern web APIs and CSS features. For older browser support, consider using polyfills or a different solution.

## Contributing and Support

### How do I report issues?
Visit the [GitHub Issues page](https://github.com/ssunils/react-color-pikr/issues) to report bugs or request features.

### Can I contribute to the project?
Yes! Check the contributing guidelines in the repository for information on how to contribute.

### Where can I get help?
- [GitHub Discussions](https://github.com/ssunils/react-color-pikr/discussions)
- [Documentation](https://github.com/ssunils/react-color-pikr/tree/main/docs)
- [Live Demo](https://ssunils.github.io/react-color-pikr)

This FAQ covers the most common questions about React Color Pikr. For more detailed information, refer to the complete documentation.
