# Examples

Real-world examples and use cases for React Color Pikr.

## Basic Usage

### Simple Color Picker

The most basic implementation with minimal configuration.

```tsx
import React, { useState } from 'react';
import { ColorPicker } from 'react-color-pikr';

function SimpleColorPicker() {
  const [color, setColor] = useState('#3498db');

  return (
    <div>
      <h3>Choose a color:</h3>
      <ColorPicker 
        value={color} 
        onChange={setColor} 
      />
      <p>Selected color: {color}</p>
    </div>
  );
}
```

### With Alpha Channel

Enable transparency control for colors with alpha channels.

```tsx
function AlphaColorPicker() {
  const [color, setColor] = useState('#3498db80'); // 50% transparency

  return (
    <ColorPicker
      value={color}
      onChange={setColor}
      showAlpha={true}
      format="hex" // Will return 8-digit hex when alpha is enabled
    />
  );
}
```

## Advanced Examples

### Multi-Format Color Picker

Allow users to switch between different color formats.

```tsx
function MultiFormatPicker() {
  const [color, setColor] = useState('#3498db');
  const [format, setFormat] = useState('hex');

  const handleColorChange = (newColor) => {
    setColor(newColor);
    console.log(`Color in ${format} format:`, newColor);
  };

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <label>
          Format: 
          <select 
            value={format} 
            onChange={(e) => setFormat(e.target.value)}
          >
            <option value="hex">HEX</option>
            <option value="rgb">RGB</option>
            <option value="hsl">HSL</option>
            <option value="hsv">HSV</option>
          </select>
        </label>
      </div>
      
      <ColorPicker
        value={color}
        onChange={handleColorChange}
        format={format}
        showAlpha={true}
        showColorFormat={true}
      />
      
      <div style={{ marginTop: '16px' }}>
        <strong>Output:</strong> {color}
      </div>
    </div>
  );
}
```

### Custom Preset Colors

Create themed color palettes for different use cases.

```tsx
function ThemedColorPicker() {
  const [color, setColor] = useState('#3498db');
  const [theme, setTheme] = useState('material');

  const colorThemes = {
    material: [
      '#f44336', '#e91e63', '#9c27b0', '#673ab7',
      '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4',
      '#009688', '#4caf50', '#8bc34a', '#cddc39',
      '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'
    ],
    pastel: [
      '#ffeaa7', '#fab1a0', '#fd79a8', '#a29bfe',
      '#6c5ce7', '#74b9ff', '#0984e3', '#00b894',
      '#00cec9', '#55a3ff', '#fdcb6e', '#e17055'
    ],
    earth: [
      '#8d6e63', '#a1887f', '#bcaaa4', '#d7ccc8',
      '#5d4037', '#6d4c41', '#795548', '#8d6e63',
      '#3e2723', '#4e342e', '#5d4037', '#6d4c41'
    ]
  };

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <label>
          Theme: 
          <select 
            value={theme} 
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="material">Material Design</option>
            <option value="pastel">Pastel Colors</option>
            <option value="earth">Earth Tones</option>
          </select>
        </label>
      </div>
      
      <ColorPicker
        value={color}
        onChange={setColor}
        presetColors={colorThemes[theme]}
        showPresets={true}
      />
    </div>
  );
}
```

### Responsive Color Picker

Adapt the color picker size based on screen size.

```tsx
import { useState, useEffect } from 'react';

function ResponsiveColorPicker() {
  const [color, setColor] = useState('#3498db');
  const [dimensions, setDimensions] = useState({ width: 280, height: 200 });

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      
      if (width < 480) {
        // Mobile
        setDimensions({ width: 260, height: 180 });
      } else if (width < 768) {
        // Tablet
        setDimensions({ width: 300, height: 220 });
      } else {
        // Desktop
        setDimensions({ width: 350, height: 260 });
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
      showPresets={true}
    />
  );
}
```

## Integration Examples

### With React Hook Form

Integrate the color picker with form validation.

```tsx
import { useForm, Controller } from 'react-hook-form';
import { ColorPicker } from 'react-color-pikr';

function ColorForm() {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      backgroundColor: '#ffffff',
      textColor: '#000000',
      accentColor: '#3498db'
    }
  });

  const onSubmit = (data) => {
    console.log('Form data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Background Color:</label>
        <Controller
          name="backgroundColor"
          control={control}
          rules={{ required: 'Background color is required' }}
          render={({ field }) => (
            <ColorPicker
              value={field.value}
              onChange={field.onChange}
              showAlpha={true}
            />
          )}
        />
        {errors.backgroundColor && (
          <span>{errors.backgroundColor.message}</span>
        )}
      </div>

      <div>
        <label>Text Color:</label>
        <Controller
          name="textColor"
          control={control}
          render={({ field }) => (
            <ColorPicker
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>

      <button type="submit">Apply Colors</button>
    </form>
  );
}
```

### With State Management (Redux)

Using the color picker with Redux state management.

```tsx
import { useSelector, useDispatch } from 'react-redux';
import { setThemeColor } from './themeSlice';
import { ColorPicker } from 'react-color-pikr';

function ThemeColorPicker() {
  const dispatch = useDispatch();
  const themeColors = useSelector(state => state.theme.colors);

  const handleColorChange = (colorType) => (newColor) => {
    dispatch(setThemeColor({ type: colorType, color: newColor }));
  };

  return (
    <div>
      <h3>Theme Customization</h3>
      
      <div>
        <h4>Primary Color</h4>
        <ColorPicker
          value={themeColors.primary}
          onChange={handleColorChange('primary')}
          showAlpha={true}
        />
      </div>

      <div>
        <h4>Secondary Color</h4>
        <ColorPicker
          value={themeColors.secondary}
          onChange={handleColorChange('secondary')}
          showAlpha={true}
        />
      </div>

      <div>
        <h4>Accent Color</h4>
        <ColorPicker
          value={themeColors.accent}
          onChange={handleColorChange('accent')}
          showAlpha={true}
        />
      </div>
    </div>
  );
}
```

### CSS Variable Integration

Update CSS custom properties dynamically.

```tsx
function CSSVariableColorPicker() {
  const [primaryColor, setPrimaryColor] = useState('#3498db');
  const [secondaryColor, setSecondaryColor] = useState('#2ecc71');

  useEffect(() => {
    // Update CSS custom properties
    document.documentElement.style.setProperty('--primary-color', primaryColor);
    document.documentElement.style.setProperty('--secondary-color', secondaryColor);
  }, [primaryColor, secondaryColor]);

  return (
    <div>
      <div className="theme-preview" style={{
        backgroundColor: 'var(--primary-color)',
        border: '2px solid var(--secondary-color)',
        padding: '20px',
        borderRadius: '8px',
        color: 'white',
        marginBottom: '20px'
      }}>
        <h3>Live Theme Preview</h3>
        <p>This preview updates in real-time as you change colors!</p>
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        <div>
          <h4>Primary Color</h4>
          <ColorPicker
            value={primaryColor}
            onChange={setPrimaryColor}
            showAlpha={true}
          />
        </div>

        <div>
          <h4>Secondary Color</h4>
          <ColorPicker
            value={secondaryColor}
            onChange={setSecondaryColor}
            showAlpha={true}
          />
        </div>
      </div>
    </div>
  );
}
```

## Accessibility Examples

### Keyboard Navigation

The color picker supports full keyboard navigation by default, but you can enhance it further.

```tsx
function AccessibleColorPicker() {
  const [color, setColor] = useState('#3498db');
  const [announcement, setAnnouncement] = useState('');

  const handleColorChange = (newColor) => {
    setColor(newColor);
    setAnnouncement(`Color changed to ${newColor}`);
    
    // Clear announcement after screen reader reads it
    setTimeout(() => setAnnouncement(''), 1000);
  };

  return (
    <div>
      <label htmlFor="color-picker">
        Choose a color for the theme:
      </label>
      
      <ColorPicker
        id="color-picker"
        value={color}
        onChange={handleColorChange}
        showAlpha={true}
        className="accessible-color-picker"
      />

      {/* Screen reader announcements */}
      <div 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
      >
        {announcement}
      </div>

      <div style={{ marginTop: '16px' }}>
        <strong>Selected color:</strong> {color}
      </div>
    </div>
  );
}
```

### High Contrast Mode

Adapt the color picker for high contrast accessibility.

```tsx
function HighContrastColorPicker() {
  const [color, setColor] = useState('#3498db');
  const [highContrast, setHighContrast] = useState(false);

  const pickerStyle = highContrast ? {
    border: '3px solid #000000',
    backgroundColor: '#ffffff',
  } : {};

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={highContrast}
          onChange={(e) => setHighContrast(e.target.checked)}
        />
        High Contrast Mode
      </label>

      <div style={pickerStyle}>
        <ColorPicker
          value={color}
          onChange={setColor}
          showAlpha={true}
          className={highContrast ? 'high-contrast' : ''}
        />
      </div>
    </div>
  );
}
```

## Performance Examples

### Debounced Color Changes

Reduce the frequency of onChange calls for better performance.

```tsx
import { useState, useCallback } from 'react';
import { debounce } from 'lodash';

function DebouncedColorPicker() {
  const [color, setColor] = useState('#3498db');
  const [previewColor, setPreviewColor] = useState('#3498db');

  // Debounce the actual color change
  const debouncedSetColor = useCallback(
    debounce((newColor) => {
      setColor(newColor);
      console.log('Color committed:', newColor);
    }, 300),
    []
  );

  const handleColorChange = (newColor) => {
    setPreviewColor(newColor); // Immediate preview
    debouncedSetColor(newColor); // Debounced commit
  };

  return (
    <div>
      <ColorPicker
        value={previewColor}
        onChange={handleColorChange}
        showAlpha={true}
      />
      
      <div style={{ marginTop: '16px' }}>
        <div>Preview: {previewColor}</div>
        <div>Committed: {color}</div>
      </div>
    </div>
  );
}
```

### Memoized Color Picker

Optimize re-renders with React.memo and useMemo.

```tsx
import React, { useState, useMemo, memo } from 'react';
import { ColorPicker } from 'react-color-pikr';

const MemoizedColorPicker = memo(ColorPicker);

function OptimizedColorPicker() {
  const [color, setColor] = useState('#3498db');
  const [otherState, setOtherState] = useState(0);

  const presetColors = useMemo(() => [
    '#e74c3c', '#3498db', '#2ecc71', '#f39c12',
    '#9b59b6', '#1abc9c', '#34495e', '#95a5a6'
  ], []);

  return (
    <div>
      <button onClick={() => setOtherState(s => s + 1)}>
        Other State: {otherState}
      </button>
      
      <MemoizedColorPicker
        value={color}
        onChange={setColor}
        presetColors={presetColors}
        showPresets={true}
        showAlpha={true}
      />
    </div>
  );
}
```
