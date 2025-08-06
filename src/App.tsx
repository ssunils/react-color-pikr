import { useState } from "react";
import ColorPicker from "./components/ColorPicker";
import type { ColorValue } from "./types";
import "./App.css";

function App() {
  const [color, setColor] = useState("#3498db80"); // 8-digit HEX with 50% alpha
  const [showAlpha, setShowAlpha] = useState(true); // Start with alpha enabled to showcase
  const [showColorFormat, setShowColorFormat] = useState(true); // New state for format toggle
  const [format, setFormat] = useState<"hex" | "rgb" | "hsv" | "hsl">("hex");

  const handleColorChange = (newColor: ColorValue) => {
    setColor(typeof newColor === "string" ? newColor : "#000000");
  };

  return (
    <div className='app'>
      <header className='app-header'>
        <h1>React Color Pikr</h1>
        <p>A modern, customizable React color picker component library</p>
        <div className='header-links'>
          <a 
            href="https://github.com/ssunils/react-color-pikr" 
            target="_blank" 
            rel="noopener noreferrer"
            className="link-button"
          >
            📚 GitHub
          </a>
          <a 
            href="https://www.npmjs.com/package/react-color-pikr" 
            target="_blank" 
            rel="noopener noreferrer"
            className="link-button"
          >
            📦 npm
          </a>
        </div>
      </header>

      <main className='app-main'>
        <div className='demo-section'>
          <h2>Interactive Demo</h2>
          <div className='demo-controls'>
            <label>
              <input
                type='checkbox'
                checked={showAlpha}
                onChange={(e) => setShowAlpha(e.target.checked)}
              />
              Show Alpha Channel
            </label>

            <label>
              <input
                type='checkbox'
                checked={showColorFormat}
                onChange={(e) => setShowColorFormat(e.target.checked)}
              />
              Show Format Selector
            </label>

            <label>
              Format:
              <select
                value={format}
                onChange={(e) =>
                  setFormat(e.target.value as "hex" | "rgb" | "hsv" | "hsl")
                }
              >
                <option value='hex'>HEX</option>
                <option value='rgb'>RGB</option>
                <option value='hsv'>HSV</option>
                <option value='hsl'>HSL</option>
              </select>
              {showAlpha && format === "hex" && (
                <span
                  style={{
                    color: "#27ae60",
                    fontSize: "12px",
                    marginLeft: "8px",
                  }}
                >
                  (8-digit format: #RRGGBBAA)
                </span>
              )}
            </label>
          </div>{" "}
          <div className='demo-container'>
            <div className='color-picker-container'>
              <ColorPicker
                value={color}
                onChange={handleColorChange}
                format={format}
                onFormatChange={setFormat}
                showAlpha={showAlpha}
                showColorFormat={showColorFormat}
                showPresets={true}
              />
            </div>

            <div className='result-container'>
              <h3>Selected Color</h3>
              <div
                className='color-display'
                style={{ backgroundColor: color }}
              />
              <div className='color-value'>
                <code>{color}</code>
              </div>
            </div>
          </div>
        </div>

        <div className='features-section'>
          <h2>Features</h2>
          <ul>
            <li>✨ Multiple color formats: HEX (6 & 8-digit), RGB, HSV, HSL</li>
            <li>🎨 Smooth draggable color selection interface</li>
            <li>
              🔄 Alpha channel support with 8-digit HEX format (#RRGGBBAA)
            </li>
            <li>🎯 Preset color swatches with customization</li>
            <li>🎛️ Configurable UI elements (format selector, alpha, presets)</li>
            <li>📱 Touch-friendly for mobile devices</li>
            <li>♿ Accessible with keyboard navigation</li>
            <li>🎭 TypeScript support with comprehensive types</li>
            <li>🎡 Lightweight with no external dependencies</li>
          </ul>
        </div>

        <div className='installation-section'>
          <h2>Installation</h2>
          <div className='install-commands'>
            <div className='install-option'>
              <h3>npm</h3>
              <pre className='code-block'>npm install react-color-pikr</pre>
            </div>
            <div className='install-option'>
              <h3>yarn</h3>
              <pre className='code-block'>yarn add react-color-pikr</pre>
            </div>
            <div className='install-option'>
              <h3>pnpm</h3>
              <pre className='code-block'>pnpm add react-color-pikr</pre>
            </div>
          </div>
        </div>

        <div className='usage-section'>
          <h2>Usage</h2>
          <pre className='code-block'>
            {`import { ColorPicker } from 'react-color-pikr';

function MyComponent() {
  const [color, setColor] = useState('#3498db80'); // 8-digit HEX with alpha

  return (
    <ColorPicker
      value={color}
      onChange={setColor}
      format="hex"
      showAlpha={true}
      showPresets={true}
    />
  );
}`}
          </pre>
        </div>
      </main>
    </div>
  );
}

export default App;
