# Contributing to React Color Pikr

We welcome contributions from the community! This guide will help you get started.

## 🤝 Ways to Contribute

- 🐛 **Bug Reports**: Found a bug? Let us know!
- 💡 **Feature Requests**: Have an idea? We'd love to hear it!
- 📝 **Documentation**: Help improve our docs
- 🔧 **Code**: Submit bug fixes or new features
- 🎨 **Examples**: Share usage examples and demos

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm
- Git
- A GitHub account

### Development Setup

1. **Fork the repository** on GitHub
2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/react-color-pikr.git
   cd react-color-pikr
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/ssunils/react-color-pikr.git
   ```
4. **Install dependencies**:
   ```bash
   npm install
   ```
5. **Start development server**:
   ```bash
   npm run dev
   ```

## 🛠️ Development Workflow

### Branch Strategy

- `main`: Production-ready code
- `develop`: Integration branch for features
- `feature/feature-name`: New features
- `fix/bug-description`: Bug fixes
- `docs/update-description`: Documentation updates

### Making Changes

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/amazing-feature
   ```

2. **Make your changes** following our coding standards

3. **Test your changes**:
   ```bash
   npm run lint          # Check code style
   npm run typecheck     # Verify TypeScript
   npm run build:lib     # Build library
   npm test              # Run tests
   ```

4. **Commit with a descriptive message**:
   ```bash
   git commit -m "feat: add amazing new feature"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Create a Pull Request** on GitHub

## 📝 Coding Standards

### TypeScript

- Use TypeScript for all new code
- Provide proper type definitions
- Export types for public APIs

```tsx
// Good
interface ColorPickerProps {
  value: ColorValue;
  onChange: (color: ColorValue) => void;
  showAlpha?: boolean;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ ... }) => {
  // Implementation
};
```

### Code Style

- Use ESLint configuration provided
- Follow React functional component patterns
- Use meaningful variable and function names
- Add JSDoc comments for public APIs

```tsx
/**
 * Converts RGB values to hexadecimal format
 * @param r Red component (0-255)
 * @param g Green component (0-255)  
 * @param b Blue component (0-255)
 * @returns Hexadecimal color string (#RRGGBB)
 */
export function rgbToHex(r: number, g: number, b: number): string {
  // Implementation
}
```

### Component Guidelines

- Use React hooks (functional components)
- Keep components focused and reusable
- Use proper prop validation
- Handle edge cases gracefully

```tsx
export const ColorSwatch: React.FC<ColorSwatchProps> = ({
  color,
  size = 24,
  selected = false,
  onClick,
  className = '',
  ...props
}) => {
  // Validate color prop
  if (!color || typeof color !== 'string') {
    console.warn('ColorSwatch: Invalid color prop');
    return null;
  }

  // Implementation
};
```

## 🧪 Testing

### Writing Tests

- Write tests for new features
- Include edge cases and error scenarios
- Test accessibility features

```tsx
describe('ColorPicker', () => {
  it('should call onChange when color changes', () => {
    const handleChange = jest.fn();
    render(<ColorPicker value="#ff0000" onChange={handleChange} />);
    
    // Test interaction
    // Assert handleChange was called
  });

  it('should handle invalid color values gracefully', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
    render(<ColorPicker value="invalid" onChange={() => {}} />);
    
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
```

### Running Tests

```bash
npm test              # Run all tests
npm test -- --watch  # Run tests in watch mode
npm run test:coverage # Run with coverage report
```

## 📚 Documentation

### Writing Documentation

- Use clear, concise language
- Include code examples
- Document all props and return values
- Add migration notes for breaking changes

### Documentation Structure

```
docs/
├── API.md           # Complete API reference
├── EXAMPLES.md      # Usage examples
├── CUSTOMIZATION.md # Styling and theming
├── MIGRATION.md     # Migration from other libraries
└── GETTING_STARTED.md # Installation and setup
```

## 🐛 Reporting Bugs

### Before Reporting

1. Check if the issue already exists
2. Try the latest version
3. Reproduce with minimal code

### Bug Report Template

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- React Color Pikr version: [e.g. 1.1.0]
- React version: [e.g. 18.2.0]
- Browser: [e.g. Chrome 91]
- OS: [e.g. macOS]

**Additional context**
Any other context about the problem.
```

## 💡 Feature Requests

### Before Requesting

1. Check existing feature requests
2. Consider if it fits the library's scope
3. Think about backwards compatibility

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
A clear description of what the problem is.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
Other solutions you've considered.

**Additional context**
Screenshots, mockups, or examples.
```

## 📋 Pull Request Process

### PR Checklist

Before submitting, ensure:

- [ ] Code follows style guidelines
- [ ] Tests pass locally
- [ ] TypeScript compiles without errors
- [ ] Documentation is updated
- [ ] Commit messages follow convention
- [ ] PR description explains the changes

### PR Template

```markdown
**Description**
Brief description of changes.

**Type of change**
- [ ] Bug fix (non-breaking change)
- [ ] New feature (non-breaking change)  
- [ ] Breaking change (fix or feature causing existing functionality to change)
- [ ] Documentation update

**Testing**
- [ ] Tests pass
- [ ] New tests added (if applicable)
- [ ] Manual testing completed

**Screenshots** (if applicable)
Add screenshots to help explain your changes.
```

### Review Process

1. **Automated checks** must pass
2. **Code review** by maintainers
3. **Testing** in different environments
4. **Merge** when approved

## 🔄 Release Process

### Versioning

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backwards compatible)
- **PATCH**: Bug fixes (backwards compatible)

### Release Steps

1. **Update version** in package.json
2. **Update CHANGELOG.md**
3. **Create GitHub release**
4. **Publish to npm** (automated)

## 🏆 Recognition

Contributors are recognized in:

- README.md contributors section
- Release notes
- GitHub contributors graph

## 📞 Getting Help

Need help contributing?

- 💬 **[GitHub Discussions](https://github.com/ssunils/react-color-pikr/discussions)**
- 📧 **Email**: sunil.soundarapandian@gmail.com
- 📖 **Documentation**: Check our docs first

## 📜 Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

**Positive behavior includes:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community

**Unacceptable behavior includes:**
- Trolling, insulting/derogatory comments
- Public or private harassment
- Publishing others' private information
- Other conduct inappropriate in a professional setting

### Enforcement

Project maintainers are responsible for clarifying standards and taking appropriate action in response to unacceptable behavior.

## 🙏 Thank You

Thank you for contributing to React Color Pikr! Every contribution, no matter how small, helps make this library better for everyone.

---

**Happy Contributing! 🎉**
