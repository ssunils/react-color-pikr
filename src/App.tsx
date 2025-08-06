import { useState } from "react";
import ColorPicker from "./components/ColorPicker";
import type { ColorValue } from "./types";
import { Palette, Smartphone, Zap, Eye, Keyboard, FileCode2 } from "lucide-react";
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
        <div className='hero-content'>
          <div className='hero-badge'>
            <span>TypeScript</span>
            <span>React</span>
            <span>Zero Dependencies</span>
          </div>
          <h1>React Color Pikr</h1>
          <p className='hero-description'>
            A modern, customizable React color picker component library with 8-digit HEX alpha support, 
            built with TypeScript for professional applications.
          </p>
          <div className='hero-stats'>
            <div className='stat'>
              <span className='stat-number'>&lt; 50KB</span>
              <span className='stat-label'>Bundle Size</span>
            </div>
            <div className='stat'>
              <span className='stat-number'>100%</span>
              <span className='stat-label'>TypeScript</span>
            </div>
            <div className='stat'>
              <span className='stat-number'>A11Y</span>
              <span className='stat-label'>Accessible</span>
            </div>
          </div>
          <div className='header-links'>
            <a 
              href="https://github.com/ssunils/react-color-pikr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="link-button primary"
            >
              View on GitHub
            </a>
            <a 
              href="https://www.npmjs.com/package/react-color-pikr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="link-button secondary"
            >
              npm Package
            </a>
            <a 
              href="https://github.com/ssunils/react-color-pikr/tree/main/docs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="link-button secondary"
            >
              Documentation
            </a>
          </div>
        </div>
      </header>

      <main className='app-main'>
        <div className='demo-section'>
          <div className='section-header'>
            <h2>Interactive Demo</h2>
            <p>Try out all the features of React Color Pikr. Adjust settings and see real-time updates.</p>
          </div>
          
          <div className='demo-controls-wrapper'>
            <h3>Configuration Options</h3>
            <div className='demo-controls'>
              <div className='control-group'>
                <label className='control-label'>
                  <input
                    type='checkbox'
                    checked={showAlpha}
                    onChange={(e) => setShowAlpha(e.target.checked)}
                  />
                  <span className='control-text'>Alpha Channel Support</span>
                </label>
                <small className='control-description'>Enable transparency control with 8-digit HEX format</small>
              </div>

              <div className='control-group'>
                <label className='control-label'>
                  <input
                    type='checkbox'
                    checked={showColorFormat}
                    onChange={(e) => setShowColorFormat(e.target.checked)}
                  />
                  <span className='control-text'>Format Selector</span>
                </label>
                <small className='control-description'>Show format switching in the color picker</small>
              </div>

              <div className='control-group'>
                <label className='control-label'>
                  <span className='control-text'>Output Format:</span>
                  <select
                    className='format-select'
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
                </label>
                {showAlpha && format === "hex" && (
                  <small className='control-description format-note'>
                    Using 8-digit format: #RRGGBBAA
                  </small>
                )}
              </div>
            </div>
          </div>
          <div className='demo-container'>
            <div className='color-picker-container'>
              <h3>Color Picker</h3>
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
              <div className='color-output'>
                <div
                  className='color-display'
                  style={{ backgroundColor: color }}
                />
                <div className='color-info'>
                  <div className='color-value-container'>
                    <label>Current Value:</label>
                    <code className='color-value'>{color}</code>
                  </div>
                  <div className='color-details'>
                    <small>Format: {format.toUpperCase()}</small>
                    {showAlpha && <small>Alpha: {Math.round((parseInt(color.slice(-2) || 'FF', 16) / 255) * 100)}%</small>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='features-section'>
          <div className='section-header'>
            <h2>Why Choose React Color Pikr?</h2>
            <p>Designed for modern React applications with developer experience in mind.</p>
          </div>
          
          <div className='features-grid'>
            <div className='feature-card'>
              <div className='feature-icon'>
                <Palette size={32} />
              </div>
              <h3>Multiple Formats</h3>
              <p>Support for HEX (6 & 8-digit), RGB, HSV, and HSL color formats with seamless conversion.</p>
            </div>
            
            <div className='feature-card'>
              <div className='feature-icon'>
                <Smartphone size={32} />
              </div>
              <h3>Touch Friendly</h3>
              <p>Optimized for mobile devices with smooth touch interactions and responsive design.</p>
            </div>
            
            <div className='feature-card'>
              <div className='feature-icon'>
                <Zap size={32} />
              </div>
              <h3>Lightweight</h3>
              <p>Zero external dependencies and optimized bundle size for fast loading.</p>
            </div>
            
            <div className='feature-card'>
              <div className='feature-icon'>
                <Eye size={32} />
              </div>
              <h3>8-Digit HEX Alpha</h3>
              <p>Full transparency support with 8-digit HEX format (#RRGGBBAA) for precise alpha control.</p>
            </div>
            
            <div className='feature-card'>
              <div className='feature-icon'>
                <Keyboard size={32} />
              </div>
              <h3>Accessible</h3>
              <p>Built with accessibility in mind, supporting keyboard navigation and screen readers.</p>
            </div>
            
            <div className='feature-card'>
              <div className='feature-icon'>
                <FileCode2 size={32} />
              </div>
              <h3>TypeScript</h3>
              <p>Comprehensive TypeScript support with full type definitions for better development experience.</p>
            </div>
          </div>
        </div>

        <div className='quick-start-section'>
          <div className='section-header'>
            <h2>Quick Start</h2>
            <p>Get started with React Color Pikr in under 2 minutes.</p>
          </div>
          
          <div className='quick-start-steps'>
            <div className='step'>
              <div className='step-number'>1</div>
              <div className='step-content'>
                <h3>Install</h3>
                <p>Add React Color Pikr to your project using your preferred package manager.</p>
              </div>
            </div>
            
            <div className='step'>
              <div className='step-number'>2</div>
              <div className='step-content'>
                <h3>Import</h3>
                <p>Import the component and start using it in your React application.</p>
              </div>
            </div>
            
            <div className='step'>
              <div className='step-number'>3</div>
              <div className='step-content'>
                <h3>Customize</h3>
                <p>Configure the color picker with your preferred settings and styling.</p>
              </div>
            </div>
          </div>
        </div>

        <div className='installation-section'>
          <h2>Installation</h2>
          <p className='installation-intro'>
            Choose your preferred package manager to add React Color Pikr to your project.
          </p>
          <div className='install-commands'>
            <div className='install-option'>
              <div className='install-header'>
                <div className='package-manager-logo npm'>npm</div>
                <h3>npm</h3>
              </div>
              <div className='install-command'>
                <pre className='code-block'>npm install react-color-pikr
                  <button className='copy-button' onClick={() => navigator.clipboard?.writeText('npm install react-color-pikr')}>
                    Copy
                  </button>
                </pre>
              </div>
            </div>
            <div className='install-option'>
              <div className='install-header'>
                <div className='package-manager-logo yarn'>Y</div>
                <h3>Yarn</h3>
              </div>
              <div className='install-command'>
                <pre className='code-block'>yarn add react-color-pikr
                  <button className='copy-button' onClick={() => navigator.clipboard?.writeText('yarn add react-color-pikr')}>
                    Copy
                  </button>
                </pre>
              </div>
            </div>
            <div className='install-option'>
              <div className='install-header'>
                <div className='package-manager-logo pnpm'>P</div>
                <h3>pnpm</h3>
              </div>
              <div className='install-command'>
                <pre className='code-block'>pnpm add react-color-pikr
                  <button className='copy-button' onClick={() => navigator.clipboard?.writeText('pnpm add react-color-pikr')}>
                    Copy
                  </button>
                </pre>
              </div>
            </div>
          </div>
          <div className='install-note'>
            <div className='install-note-content'>
              <h4>Zero Configuration Required</h4>
              <p>No CSS imports needed! All styles are included automatically with the component.</p>
            </div>
          </div>
        </div>

        <div className='usage-section'>
          <div className='section-header'>
            <h2>Basic Usage Example</h2>
            <p>Here's how simple it is to add a color picker to your React application.</p>
          </div>
          
          <div className='code-example'>
            <div className='code-tabs'>
              <button className='tab-button active'>Basic Usage</button>
            </div>
            <pre className='code-block'>
              {`import React, { useState } from 'react';
import { ColorPicker } from 'react-color-pikr';

function App() {
  const [color, setColor] = useState('#3498db80');

  return (
    <div>
      <h3>Choose your color:</h3>
      <ColorPicker
        value={color}
        onChange={setColor}
        format="hex"
        showAlpha={true}
        showPresets={true}
      />
      <p>Selected color: {color}</p>
    </div>
  );
}`}
            </pre>
          </div>
          
          <div className="usage-notes">
            <div className="note-item">
              <strong>No CSS imports required!</strong> All styles are included automatically.
            </div>
            <div className="note-item">
              <strong>TypeScript ready:</strong> Full type definitions included for better development experience.
            </div>
          </div>
        </div>
      </main>
      
      <footer className='app-footer'>
        <div className='footer-content'>
          <div className='footer-section'>
            <h3>Resources</h3>
            <ul>
              <li><a href="https://github.com/ssunils/react-color-pikr/tree/main/docs/GETTING_STARTED.md" target="_blank" rel="noopener noreferrer">Getting Started</a></li>
              <li><a href="https://github.com/ssunils/react-color-pikr/tree/main/docs/API.md" target="_blank" rel="noopener noreferrer">API Reference</a></li>
              <li><a href="https://github.com/ssunils/react-color-pikr/tree/main/docs/EXAMPLES.md" target="_blank" rel="noopener noreferrer">Examples</a></li>
              <li><a href="https://github.com/ssunils/react-color-pikr/tree/main/docs/MIGRATION.md" target="_blank" rel="noopener noreferrer">Migration Guide</a></li>
            </ul>
          </div>
          <div className='footer-section'>
            <h3>Support</h3>
            <ul>
              <li><a href="https://github.com/ssunils/react-color-pikr/issues" target="_blank" rel="noopener noreferrer">Report Issues</a></li>
              <li><a href="https://github.com/ssunils/react-color-pikr/discussions" target="_blank" rel="noopener noreferrer">Discussions</a></li>
              <li><a href="https://github.com/ssunils/react-color-pikr" target="_blank" rel="noopener noreferrer">Source Code</a></li>
            </ul>
          </div>
          <div className='footer-section'>
            <h3>Package</h3>
            <ul>
              <li><a href="https://www.npmjs.com/package/react-color-pikr" target="_blank" rel="noopener noreferrer">npm Package</a></li>
              <li><a href="https://github.com/ssunils/react-color-pikr/releases" target="_blank" rel="noopener noreferrer">Changelog</a></li>
              <li><a href="https://github.com/ssunils/react-color-pikr/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">MIT License</a></li>
            </ul>
          </div>
        </div>
        <div className='footer-bottom'>
          <p>&copy; 2025 React Color Pikr. Built with TypeScript and React.</p>
          <p>Created by <a href="https://github.com/ssunils" target="_blank" rel="noopener noreferrer">Sunil Soundarapandian</a></p>
        </div>
      </footer>
    </div>
  );
}

export default App;
