# Advanced Customization Guide

This guide covers advanced customization techniques for React Color Pikr.

## Table of Contents

- [Styling Architecture](#styling-architecture)
- [Custom Components](#custom-components)
- [Theming System](#theming-system)
- [Advanced Examples](#advanced-examples)
- [Best Practices](#best-practices)

## Styling Architecture

React Color Pikr uses inline styles for maximum portability and zero CSS dependencies. All styles are defined as JavaScript objects in `ColorPicker.styles.ts`.

### Style Structure

```typescript
export const colorPickerStyles = {
  // Main container
  colorPicker: { /* base styles */ },
  colorPickerDisabled: { /* disabled state */ },
  
  // Color preview
  colorPreview: { /* preview container */ },
  colorPreviewCurrent: { /* preview display */ },
  
  // Saturation/Value area
  saturationArea: { /* saturation container */ },
  saturationOverlay: { /* gradient overlay */ },
  saturationPointer: { /* draggable pointer */ },
  
  // Sliders
  hueSlider: { /* hue slider */ },
  huePointer: { /* hue pointer */ },
  alphaSlider: { /* alpha slider */ },
  alphaPointer: { /* alpha pointer */ },
  
  // Controls
  formatToggle: { /* format buttons container */ },
  formatButton: { /* format button */ },
  formatButtonActive: { /* active format button */ },
  
  // Input and presets
  colorInput: { /* text input */ },
  presets: { /* presets container */ },
};
```

## Custom Components

### Creating a Themed Wrapper

```tsx
import React from 'react';
import { ColorPicker, type ColorPickerProps } from 'react-color-pikr';

interface Theme {
  primary: string;
  background: string;
  border: string;
  text: string;
  shadow: string;
}

const themes: Record<string, Theme> = {
  light: {
    primary: '#3498db',
    background: '#ffffff',
    border: '#e0e0e0',
    text: '#2c3e50',
    shadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  },
  dark: {
    primary: '#74b9ff',
    background: '#2d3436',
    border: '#636e72',
    text: '#ddd',
    shadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
  },
  neon: {
    primary: '#00ff88',
    background: '#0a0a0a',
    border: '#00ff88',
    text: '#00ff88',
    shadow: '0 0 20px rgba(0, 255, 136, 0.3)',
  },
};

interface ThemedColorPickerProps extends Omit<ColorPickerProps, 'className'> {
  theme?: keyof typeof themes;
  variant?: 'default' | 'compact' | 'minimal';
}

export const ThemedColorPicker: React.FC<ThemedColorPickerProps> = ({
  theme = 'light',
  variant = 'default',
  ...props
}) => {
  const currentTheme = themes[theme];
  
  const getContainerStyle = () => {
    const baseStyle = {
      background: currentTheme.background,
      border: `1px solid ${currentTheme.border}`,
      borderRadius: variant === 'minimal' ? '4px' : '12px',
      padding: variant === 'compact' ? '12px' : '20px',
      boxShadow: variant === 'minimal' ? 'none' : currentTheme.shadow,
      color: currentTheme.text,
    };

    if (variant === 'compact') {
      return { ...baseStyle, maxWidth: '240px' };
    }

    return baseStyle;
  };

  const getDimensions = () => {
    switch (variant) {
      case 'compact':
        return { width: 200, height: 150 };
      case 'minimal':
        return { width: 260, height: 180 };
      default:
        return { width: 300, height: 220 };
    }
  };

  return (
    <div style={getContainerStyle()}>
      <ColorPicker
        {...props}
        {...getDimensions()}
      />
    </div>
  );
};
```

### Custom Format Toggle

```tsx
import React from 'react';
import { ColorPicker, type ColorPickerProps, type ColorFormat } from 'react-color-pikr';

const formatIcons = {
  hex: '#',
  rgb: 'RGB',
  hsv: 'HSV',
  hsl: 'HSL',
};

interface CustomFormatPickerProps extends ColorPickerProps {
  showFormatIcons?: boolean;
}

export const CustomFormatPicker: React.FC<CustomFormatPickerProps> = ({
  showFormatIcons = true,
  ...props
}) => {
  const [format, setFormat] = React.useState<ColorFormat>(props.format || 'hex');

  const customFormatToggle = showFormatIcons ? (
    <div style={{
      display: 'flex',
      gap: '8px',
      marginBottom: '12px',
      justifyContent: 'center',
    }}>
      {Object.entries(formatIcons).map(([fmt, icon]) => (
        <button
          key={fmt}
          onClick={() => {
            setFormat(fmt as ColorFormat);
            props.onFormatChange?.(fmt as ColorFormat);
          }}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: format === fmt ? '2px solid #3498db' : '1px solid #ddd',
            background: format === fmt ? '#e3f2fd' : '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          {icon}
        </button>
      ))}
    </div>
  ) : null;

  return (
    <div>
      {customFormatToggle}
      <ColorPicker
        {...props}
        format={format}
        onFormatChange={setFormat}
        showColorFormat={false} // Hide default format toggle
      />
    </div>
  );
};
```

## Theming System

### CSS Custom Properties Integration

```tsx
import React from 'react';
import { ColorPicker, type ColorPickerProps } from 'react-color-pikr';

interface CSSVarPickerProps extends ColorPickerProps {
  cssVarPrefix?: string;
}

export const CSSVarPicker: React.FC<CSSVarPickerProps> = ({
  cssVarPrefix = '--color-picker',
  className = '',
  ...props
}) => {
  const wrapperStyle = {
    '--primary': 'var(--color-picker-primary, #3498db)',
    '--background': 'var(--color-picker-bg, #ffffff)',
    '--border': 'var(--color-picker-border, #e0e0e0)',
    '--shadow': 'var(--color-picker-shadow, 0 4px 20px rgba(0, 0, 0, 0.1))',
    '--radius': 'var(--color-picker-radius, 8px)',
    
    background: 'var(--background)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    padding: '16px',
    boxShadow: 'var(--shadow)',
  } as React.CSSProperties;

  return (
    <div style={wrapperStyle} className={`css-var-picker ${className}`}>
      <ColorPicker {...props} />
    </div>
  );
};
```

### React Context Theme Provider

```tsx
import React, { createContext, useContext } from 'react';
import { ColorPicker, type ColorPickerProps } from 'react-color-pikr';

interface ColorPickerTheme {
  primary: string;
  background: string;
  border: string;
  borderRadius: string;
  shadow: string;
  fontFamily: string;
}

const defaultTheme: ColorPickerTheme = {
  primary: '#3498db',
  background: '#ffffff',
  border: '#e0e0e0',
  borderRadius: '8px',
  shadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const ColorPickerThemeContext = createContext<ColorPickerTheme>(defaultTheme);

export const ColorPickerThemeProvider: React.FC<{
  theme?: Partial<ColorPickerTheme>;
  children: React.ReactNode;
}> = ({ theme, children }) => {
  const mergedTheme = { ...defaultTheme, ...theme };
  
  return (
    <ColorPickerThemeContext.Provider value={mergedTheme}>
      {children}
    </ColorPickerThemeContext.Provider>
  );
};

export const useColorPickerTheme = () => useContext(ColorPickerThemeContext);

interface ThemedColorPickerProps extends ColorPickerProps {
  overrideTheme?: Partial<ColorPickerTheme>;
}

export const ThemedColorPicker: React.FC<ThemedColorPickerProps> = ({
  overrideTheme,
  className = '',
  ...props
}) => {
  const contextTheme = useColorPickerTheme();
  const theme = { ...contextTheme, ...overrideTheme };

  const wrapperStyle = {
    background: theme.background,
    border: `1px solid ${theme.border}`,
    borderRadius: theme.borderRadius,
    boxShadow: theme.shadow,
    fontFamily: theme.fontFamily,
    padding: '16px',
  };

  return (
    <div style={wrapperStyle} className={`themed-picker ${className}`}>
      <ColorPicker {...props} />
    </div>
  );
};
```

## Advanced Examples

### Multi-Instance Color Picker

```tsx
import React, { useState } from 'react';
import { ColorPicker } from 'react-color-pikr';

interface ColorSet {
  primary: string;
  secondary: string;
  accent: string;
}

export const MultiColorPicker: React.FC = () => {
  const [colors, setColors] = useState<ColorSet>({
    primary: '#3498db',
    secondary: '#2ecc71',
    accent: '#e74c3c',
  });

  const updateColor = (key: keyof ColorSet) => (color: string) => {
    setColors(prev => ({ ...prev, [key]: color }));
  };

  const colorPickerStyle = {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '16px',
    margin: '8px',
    flex: 1,
  };

  return (
    <div>
      <h3>Color Palette Editor</h3>
      
      {/* Preview */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '20px',
        padding: '16px',
        background: '#f8f9fa',
        borderRadius: '8px',
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          background: colors.primary,
          borderRadius: '8px',
          border: '2px solid #fff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }} />
        <div style={{
          width: '60px',
          height: '60px',
          background: colors.secondary,
          borderRadius: '8px',
          border: '2px solid #fff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }} />
        <div style={{
          width: '60px',
          height: '60px',
          background: colors.accent,
          borderRadius: '8px',
          border: '2px solid #fff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }} />
      </div>

      {/* Pickers */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <div style={colorPickerStyle}>
          <h4>Primary Color</h4>
          <ColorPicker
            value={colors.primary}
            onChange={updateColor('primary')}
            width={200}
            height={150}
            showPresets={false}
          />
        </div>
        
        <div style={colorPickerStyle}>
          <h4>Secondary Color</h4>
          <ColorPicker
            value={colors.secondary}
            onChange={updateColor('secondary')}
            width={200}
            height={150}
            showPresets={false}
          />
        </div>
        
        <div style={colorPickerStyle}>
          <h4>Accent Color</h4>
          <ColorPicker
            value={colors.accent}
            onChange={updateColor('accent')}
            width={200}
            height={150}
            showPresets={false}
          />
        </div>
      </div>
    </div>
  );
};
```

### Gradient Builder

```tsx
import React, { useState } from 'react';
import { ColorPicker } from 'react-color-pikr';

interface GradientStop {
  color: string;
  position: number;
}

export const GradientBuilder: React.FC = () => {
  const [stops, setStops] = useState<GradientStop[]>([
    { color: '#3498db', position: 0 },
    { color: '#e74c3c', position: 100 },
  ]);
  const [selectedStop, setSelectedStop] = useState(0);

  const updateStopColor = (color: string) => {
    setStops(prev => prev.map((stop, index) => 
      index === selectedStop ? { ...stop, color } : stop
    ));
  };

  const generateGradient = () => {
    const sortedStops = [...stops].sort((a, b) => a.position - b.position);
    return `linear-gradient(90deg, ${sortedStops
      .map(stop => `${stop.color} ${stop.position}%`)
      .join(', ')})`;
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>Gradient Builder</h3>
      
      {/* Gradient Preview */}
      <div style={{
        width: '100%',
        height: '80px',
        background: generateGradient(),
        borderRadius: '8px',
        marginBottom: '20px',
        border: '1px solid #e0e0e0',
      }} />
      
      {/* CSS Output */}
      <div style={{
        background: '#f8f9fa',
        padding: '12px',
        borderRadius: '4px',
        fontFamily: 'monospace',
        fontSize: '14px',
        marginBottom: '20px',
        overflow: 'auto',
      }}>
        background: {generateGradient()};
      </div>
      
      <div style={{ display: 'flex', gap: '20px' }}>
        {/* Stop Selector */}
        <div style={{ flex: 1 }}>
          <h4>Gradient Stops</h4>
          {stops.map((stop, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px',
                border: selectedStop === index ? '2px solid #3498db' : '1px solid #e0e0e0',
                borderRadius: '4px',
                marginBottom: '8px',
                cursor: 'pointer',
              }}
              onClick={() => setSelectedStop(index)}
            >
              <div style={{
                width: '24px',
                height: '24px',
                background: stop.color,
                borderRadius: '4px',
                border: '1px solid #ddd',
              }} />
              <span>{stop.position}%</span>
            </div>
          ))}
        </div>
        
        {/* Color Picker */}
        <div style={{ flex: 2 }}>
          <h4>Edit Color Stop</h4>
          <ColorPicker
            value={stops[selectedStop]?.color || '#3498db'}
            onChange={updateStopColor}
            width={280}
            height={200}
            showAlpha={true}
          />
        </div>
      </div>
    </div>
  );
};
```

## Best Practices

### Performance Optimization

1. **Memoize Heavy Components**: Use `React.memo` for color picker wrappers
2. **Debounce onChange**: Avoid excessive re-renders during dragging
3. **Lazy Load**: Load color picker components only when needed

```tsx
import React, { memo, useMemo, useCallback } from 'react';
import { debounce } from 'lodash';

const OptimizedColorPicker = memo<ColorPickerProps>(({ onChange, ...props }) => {
  const debouncedOnChange = useMemo(
    () => debounce(onChange || (() => {}), 16), // ~60fps
    [onChange]
  );

  const handleChange = useCallback((color: string) => {
    debouncedOnChange(color);
  }, [debouncedOnChange]);

  return <ColorPicker {...props} onChange={handleChange} />;
});
```

### Accessibility

1. **Focus Management**: Ensure keyboard navigation works
2. **ARIA Labels**: Add descriptive labels for screen readers
3. **Color Contrast**: Maintain sufficient contrast for UI elements

```tsx
const AccessibleColorPicker: React.FC<ColorPickerProps> = (props) => {
  return (
    <div role="group" aria-label="Color picker">
      <ColorPicker
        {...props}
        aria-label="Select color"
      />
    </div>
  );
};
```

### Testing

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ColorPicker } from 'react-color-pikr';

test('color picker updates value on change', () => {
  const handleChange = jest.fn();
  
  render(
    <ColorPicker
      value="#ff0000"
      onChange={handleChange}
      data-testid="color-picker"
    />
  );
  
  const input = screen.getByDisplayValue('#ff0000');
  fireEvent.change(input, { target: { value: '#00ff00' } });
  
  expect(handleChange).toHaveBeenCalledWith('#00ff00');
});
```

## Troubleshooting

### Common Issues

1. **Styles not applying**: Ensure you're not overriding inline styles with CSS
2. **Performance issues**: Use debouncing for onChange callbacks
3. **Bundle size**: Tree-shake unused utility functions

### Migration from CSS to Inline Styles

If upgrading from an older version that used CSS files:

```tsx
// Before (v1.0.x)
import { ColorPicker } from 'react-color-pikr';
import 'react-color-pikr/dist/style.css'; // Remove this line

// After (v1.1.0+)
import { ColorPicker } from 'react-color-pikr';
// No CSS import needed!
```
