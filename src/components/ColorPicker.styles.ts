import React from 'react';

export const colorPickerStyles = {
  colorPicker: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
    background: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    padding: '16px',
    userSelect: 'none' as const,
  },

  colorPickerDisabled: {
    opacity: 0.6,
    pointerEvents: 'none' as const,
  },

  colorPreview: {
    marginBottom: '12px',
  },

  colorPreviewCurrent: {
    width: '100%',
    height: '40px',
    borderRadius: '6px',
    border: '1px solid #e0e0e0',
    background: '#ffffff',
    transition: 'border-color 0.2s ease',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
  },

  saturationArea: {
    position: 'relative' as const,
    marginBottom: '12px',
    borderRadius: '4px',
    cursor: 'crosshair',
    overflow: 'hidden',
  },

  saturationOverlay: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  saturationPointer: {
    position: 'absolute' as const,
    width: '14px',
    height: '14px',
    border: '2px solid #ffffff',
    borderRadius: '50%',
    boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 0.3)',
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none' as const,
    cursor: 'crosshair',
    transition: 'box-shadow 0.1s ease',
  },

  hueSlider: {
    position: 'relative' as const,
    height: '12px',
    marginBottom: '12px',
    borderRadius: '6px',
    background: 'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)',
    cursor: 'pointer',
  },

  huePointer: {
    position: 'absolute' as const,
    top: '-3px',
    width: '18px',
    height: '18px',
    border: '2px solid #ffffff',
    borderRadius: '50%',
    boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 0.3)',
    transform: 'translateX(-50%)',
    pointerEvents: 'none' as const,
    cursor: 'pointer',
    transition: 'box-shadow 0.1s ease',
  },

  alphaSlider: {
    position: 'relative' as const,
    height: '12px',
    marginBottom: '12px',
    borderRadius: '6px',
    cursor: 'pointer',
  },

  alphaBackground: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: '#f0f0f0',
    borderRadius: '6px',
  },

  alphaOverlay: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '6px',
  },

  alphaPointer: {
    position: 'absolute' as const,
    top: '-3px',
    width: '18px',
    height: '18px',
    border: '2px solid #ffffff',
    borderRadius: '50%',
    boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 0.3)',
    transform: 'translateX(-50%)',
    pointerEvents: 'none' as const,
    cursor: 'pointer',
    transition: 'box-shadow 0.1s ease',
  },

  formatToggle: {
    display: 'flex',
    gap: '4px',
    marginBottom: '12px',
  },

  formatButton: {
    padding: '6px 12px',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    background: '#ffffff',
    color: '#666666',
    fontSize: '12px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontFamily: 'inherit',
  },

  formatButtonActive: {
    background: '#007bff',
    color: '#ffffff',
    borderColor: '#007bff',
  },

  formatButtonDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
  },

  colorInput: {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    fontSize: '14px',
    fontFamily: 'Monaco, Menlo, Ubuntu Mono, monospace',
    background: '#ffffff',
    color: '#2c3e50',
    marginBottom: '12px',
    transition: 'border-color 0.2s ease',
    boxSizing: 'border-box' as const
  },

  colorInputFocused: {
    borderColor: '#007bff',
    outline: 'none',
  },

  presets: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '6px',
    marginTop: '8px',
  },

  presetSwatch: {
    width: '24px',
    height: '24px',
    borderRadius: '4px',
    border: '2px solid #ffffff',
    cursor: 'pointer',
    boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.1s ease, box-shadow 0.1s ease',
  },

  presetSwatchSelected: {
    transform: 'scale(1.1)',
    boxShadow: '0 0 0 2px #007bff',
  },

  checkerboard: {
    backgroundImage: `
      linear-gradient(45deg, #f0f0f0 25%, transparent 25%),
      linear-gradient(-45deg, #f0f0f0 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #f0f0f0 75%),
      linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)
    `,
    backgroundSize: '8px 8px',
    backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px',
  },
};

// Helper function to combine styles
export const combineStyles = (...styles: Array<React.CSSProperties | undefined>): React.CSSProperties => {
  return Object.assign({}, ...styles.filter(Boolean));
};
