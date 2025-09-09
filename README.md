# Extended Cookie Consent

[![Build Status](https://github.com/casjay-templates/cookieconsent/workflows/Build%20and%20Deploy%20to%20GitHub%20Pages/badge.svg)](https://github.com/casjay-templates/cookieconsent/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Demo-blue)](https://casjay-templates.github.io/cookieconsent/)

An enhanced, GDPR-compliant cookie consent library with granular controls, modern UI, and comprehensive compliance features. Built as an extension of the popular [Osano Cookie Consent](https://github.com/osano/cookieconsent) library.

## 🚀 Features

- **🍪 Granular Cookie Controls** - Let users choose specific cookie categories
- **⚡ Modern UI/UX** - Beautiful, responsive design with smooth animations
- **🔒 GDPR Compliant** - Built-in compliance with GDPR, CCPA, and other privacy laws
- **📊 Analytics Integration** - Seamless integration with Google Analytics, GTM
- **🎨 21+ Beautiful Themes** - Including Dracula, GitHub, Material, VS Code, and more
- **📍 10 Position Options** - From corner popups to full-width bars and center modals
- **📱 Mobile Optimized** - Perfect responsive design for all devices
- **🌙 Dark Mode Support** - Automatic dark/light theme detection plus custom dark themes
- **♿ Accessibility** - Full keyboard navigation and screen reader support
- **🔍 Audit Trail** - Optional consent recording for compliance

## 📦 Installation

### CDN (Recommended)

```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/casjay-templates/cookieconsent@main/dist/cookieconsent.min.css">

<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/gh/casjay-templates/cookieconsent@main/dist/cookieconsent.min.js"></script>
```

### GitHub Raw

```html
<!-- CSS -->
<link rel="stylesheet" href="https://raw.githubusercontent.com/casjay-templates/cookieconsent/main/dist/cookieconsent.min.css">

<!-- JavaScript -->
<script src="https://raw.githubusercontent.com/casjay-templates/cookieconsent/main/dist/cookieconsent.min.js"></script>
```

### npm

```bash
npm install @casjay-templates/cookieconsent
```

## 🚀 Quick Start

### Basic Usage

```javascript
// Initialize with default settings
cookieconsent.extended.init({
  content: {
    header: 'We use cookies',
    message: 'This website uses cookies to enhance your experience.',
    acceptAll: 'Accept All',
    rejectAll: 'Reject All'
  }
});
```

### Advanced Configuration with Themes

```javascript
cookieconsent.extended.init({
  ui: {
    position: 'center-modal',
    theme: 'dracula',
    showPreferences: true,
    animationType: 'bounce',
    backdrop: true
  },
  
  categories: {
    necessary: {
      enabled: true,
      locked: true,
      name: 'Essential Cookies',
      description: 'Required for basic website functionality'
    },
    analytics: {
      enabled: false,
      locked: false,
      name: 'Analytics Cookies',
      description: 'Help us understand how visitors use our website'
    },
    marketing: {
      enabled: false,
      locked: false,
      name: 'Marketing Cookies',
      description: 'Used to deliver personalized advertisements'
    }
  },
  
  analytics: {
    enabled: true,
    gtag: true
  },
  
  callbacks: {
    onAcceptAll: function(categories) {
      // Initialize all tracking
      gtag('config', 'GA_MEASUREMENT_ID');
    },
    
    onCategoryToggle: function(category, enabled) {
      console.log(\`\${category} cookies \${enabled ? 'enabled' : 'disabled'}\`);
    }
  }
});
```

### Theme and Position Examples

```javascript
// Dracula theme with center modal
cookieconsent.extended.init({
  ui: { theme: 'dracula', position: 'center-modal' }
});

// GitHub Dark theme with bottom bar
cookieconsent.extended.init({
  ui: { theme: 'github-dark', position: 'bottom-bar' }
});

// Material Light theme with top-right corner
cookieconsent.extended.init({
  ui: { theme: 'material-light', position: 'top-right' }
});
```

### Checking Consent Status

```javascript
// Check if user has consented to analytics
if (cookieconsent.extended.hasConsent('analytics')) {
  // Initialize analytics
  gtag('config', 'GA_MEASUREMENT_ID');
}

// Get all consented categories
const consent = cookieconsent.extended.getConsent();
console.log('Consented categories:', consent);

// Get audit trail (if enabled)
const auditTrail = cookieconsent.extended.getAuditTrail();
console.log('Consent history:', auditTrail);
```

## 🎨 Themes & Customization

### 🌈 Available Themes (21)

#### Light Themes (10)
- `github-light` - Clean GitHub-inspired design
- `material-light` - Google Material Design
- `tailwind-light` - Tailwind CSS styling
- `bootstrap-light` - Bootstrap framework colors
- `ant-light` - Ant Design system
- `chakra-light` - Chakra UI theme
- `mantine-light` - Mantine framework
- `semantic-light` - Semantic UI styling
- `bulma-light` - Bulma CSS framework
- `foundation-light` - Foundation framework

#### Dark Themes (11)
- `dracula` - Popular Dracula color scheme
- `github-dark` - GitHub's dark mode
- `material-dark` - Material Design dark
- `tailwind-dark` - Tailwind dark mode
- `vscode-dark` - Visual Studio Code dark
- `atom-dark` - Atom editor theme
- `sublime-dark` - Sublime Text colors
- `nord-dark` - Nord color palette
- `discord-dark` - Discord app styling
- `slack-dark` - Slack app theme
- `notion-dark` - Notion app colors

### 📍 Position Options (10)

- `bottom-right` - Corner popup (default)
- `bottom-left` - Bottom left corner
- `bottom-center` - Bottom center
- `bottom-bar` - Full-width bottom bar
- `top-right` - Top right corner
- `top-left` - Top left corner
- `top-center` - Top center
- `top-bar` - Full-width top bar
- `center` - Center of screen
- `center-modal` - Center modal with backdrop

### 🎬 Animation Types

- `slide` - Smooth slide animation (default)
- `fade` - Fade in/out effect
- `bounce` - Bouncy entrance

### 🛠️ Theme API

```javascript
// Get all available themes
const themes = cookieconsent.extended.getAvailableThemes();

// Get only light themes
const lightThemes = cookieconsent.extended.getThemesByType('light');

// Get only dark themes
const darkThemes = cookieconsent.extended.getThemesByType('dark');

// Get available positions
const positions = cookieconsent.extended.getAvailablePositions();
```

### 🎨 Custom Styling

You can override theme variables with CSS:

```css
.cc-popup-extended.cc-theme-dracula {
  --cc-primary-color: #your-custom-color;
  --cc-background: #your-background;
  --cc-text-primary: #your-text-color;
}
```

## 📚 Documentation

- [Live Demo](https://casjay-templates.github.io/cookieconsent/)
- [API Reference](https://casjay-templates.github.io/cookieconsent/docs/api.html)
- [Examples](https://casjay-templates.github.io/cookieconsent/examples/)

## 🔧 Development

### Building from Source

```bash
# Clone the repository
git clone https://github.com/casjay-templates/cookieconsent.git
cd cookieconsent

# Install dependencies
npm install

# Build the project
npm run build

# Start development server
npm run dev
```

### Project Structure

```
cookieconsent/
├── src/                    # Source files
│   ├── cookieconsent-extended.js
│   └── cookieconsent-extended.css
├── dist/                   # Built files
├── docs/                   # Documentation and demo
├── examples/              # Usage examples
└── build/                 # Build scripts
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built upon the excellent [Osano Cookie Consent](https://github.com/osano/cookieconsent) library
- Inspired by modern privacy requirements and user experience best practices

## 📞 Support

- [GitHub Issues](https://github.com/casjay-templates/cookieconsent/issues)
- [Discussions](https://github.com/casjay-templates/cookieconsent/discussions)

---

**Made with ❤️ by CasJay Templates**