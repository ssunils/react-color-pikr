# Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview

This is a React color picker library called "react-color-pikr" built with TypeScript and Vite. The library provides a modern, customizable color picker component that can be published to npm and used in React applications.

## Key Components

- `ColorPicker`: Main color picker component with saturation/value area, hue slider, and optional alpha slider
- `ColorSwatch`: Individual color swatch component for preset colors
- Color utility functions for converting between different color formats (HEX, RGB, HSV, HSL)

## Code Style Guidelines

- Use TypeScript for all components and utilities
- Follow React functional component patterns with hooks
- Use CSS modules or styled-components for styling
- Export types for better TypeScript integration
- Use semantic versioning for releases
- Include comprehensive JSDoc comments for public APIs

## Library Structure

- `/src/components/`: React components
- `/src/types.ts`: TypeScript type definitions
- `/src/utils/`: Utility functions for color manipulation
- `/src/index.ts`: Main entry point for the library

## Development Guidelines

- Ensure components are accessible (keyboard navigation, ARIA labels)
- Support touch interactions for mobile devices
- Optimize for performance with proper memoization
- Include comprehensive examples in the demo application
- Write unit tests for utility functions and components
- Use consistent naming conventions throughout the codebase

## Build Configuration

- Library mode configured in Vite for npm publishing
- TypeScript declarations generated automatically
- CSS bundled separately for optional inclusion
- UMD and ESM builds for maximum compatibility
