---
layout: docs
title: API Reference
description: Complete API documentation for Extended Cookie Consent
permalink: /docs/api/
---

# 📋 API Reference

Complete API documentation for Extended Cookie Consent library.

## 🚀 Initialization

### cookieconsent.extended.init(options)

Initialize the cookie consent popup with the provided configuration.

**Signature:** `cookieconsent.extended.init(options: Object): EnhancedPopup`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| options | Object | No | Configuration object for the cookie consent popup |

**Returns:** EnhancedPopup instance

**Example:**
```javascript
// Basic initialization
const popup = cookieconsent.extended.init();

// With configuration
const popup = cookieconsent.extended.init({
  ui: {
    theme: 'dracula',
    position: 'center-modal'
  },
  content: {
    header: 'Cookie Notice',
    message: 'We use cookies to improve your experience.'
  }
});
```

## ⚙️ Configuration Options

### UI Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| ui.theme | String | null | Theme name (e.g., 'dracula', 'github-dark') |
| ui.position | String | 'bottom-right' | Position of the popup |
| ui.animationType | String | 'slide' | Animation type: 'slide', 'fade', 'bounce' |
| ui.showPreferences | Boolean | true | Show category preference controls |
| ui.backdrop | Boolean | false | Show backdrop overlay |

### Content Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| content.header | String | 'We use cookies' | Popup header text |
| content.message | String | Default message | Main message text |
| content.acceptAll | String | 'Accept All' | Accept all button text |
| content.rejectAll | String | 'Reject All' | Reject all button text |
| content.acceptSelected | String | 'Accept Selected' | Accept selected button text |

### Categories Configuration

Each category object can have the following properties:

| Property | Type | Description |
|----------|------|-------------|
| enabled | Boolean | Whether the category is enabled by default |
| locked | Boolean | Whether the category cannot be disabled (for necessary cookies) |
| name | String | Display name for the category |
| description | String | Description of what this category includes |

## 📋 Methods

### getConsent()

Get the current consent status for all categories.

**Signature:** `cookieconsent.extended.getConsent(): Object`

**Returns:** Object with category names as keys and boolean values

```javascript
const consent = cookieconsent.extended.getConsent();
// Returns: { necessary: true, analytics: false, marketing: true }
```

### hasConsent(category)

Check if user has consented to a specific category.

**Signature:** `cookieconsent.extended.hasConsent(category: String): Boolean`

**Returns:** Boolean indicating consent status

```javascript
if (cookieconsent.extended.hasConsent('analytics')) {
  // Initialize analytics
  gtag('config', 'GA_MEASUREMENT_ID');
}
```

### getAuditTrail()

Get the audit trail of consent records (if enabled).

**Signature:** `cookieconsent.extended.getAuditTrail(): Array`

**Returns:** Array of consent records with timestamps and metadata

### getAvailableThemes()

Get all available themes.

**Signature:** `cookieconsent.extended.getAvailableThemes(): Object`

**Returns:** Object with theme keys and display names

### getThemesByType(type)

Get themes filtered by type.

**Signature:** `cookieconsent.extended.getThemesByType(type: String): Object`

| Parameter | Type | Description |
|-----------|------|-------------|
| type | String | 'light' or 'dark' |

### getAvailablePositions()

Get all available position options.

**Signature:** `cookieconsent.extended.getAvailablePositions(): Object`

**Returns:** Object with position keys and display names

## 📡 Events

### cookieConsentChange

Fired when the user's consent status changes.

```javascript
window.addEventListener('cookieConsentChange', function(event) {
  console.log('Consent changed:', event.detail.categories);
  console.log('Consent record:', event.detail.record);
});
```

| Property | Type | Description |
|----------|------|-------------|
| event.detail.categories | Object | Current consent status for all categories |
| event.detail.record | Object | Consent record with timestamp and metadata |

## 🎨 Available Themes

### Light Themes (10)
- `github-light` - GitHub's light theme
- `material-light` - Google Material Design
- `tailwind-light` - Tailwind CSS styling
- `bootstrap-light` - Bootstrap framework
- `ant-light` - Ant Design system
- `chakra-light` - Chakra UI theme
- `mantine-light` - Mantine framework
- `semantic-light` - Semantic UI
- `bulma-light` - Bulma CSS framework
- `foundation-light` - Foundation framework

### Dark Themes (11)
- `dracula` - Popular Dracula theme
- `github-dark` - GitHub's dark mode
- `material-dark` - Material Design dark
- `tailwind-dark` - Tailwind dark mode
- `vscode-dark` - VS Code dark theme
- `atom-dark` - Atom editor theme
- `sublime-dark` - Sublime Text colors
- `nord-dark` - Nord color palette
- `discord-dark` - Discord app styling
- `slack-dark` - Slack workspace theme
- `notion-dark` - Notion app colors

## 📍 Available Positions

| Position | Description | Use Case |
|----------|-------------|----------|
| `bottom-right` | Bottom right corner | Default, non-intrusive |
| `bottom-left` | Bottom left corner | Alternative corner position |
| `bottom-center` | Bottom center | Central bottom positioning |
| `bottom-bar` | Full-width bottom bar | Prominent notice, mobile-friendly |
| `top-right` | Top right corner | Above-fold positioning |
| `top-left` | Top left corner | Alternative top position |
| `top-center` | Top center | Central top positioning |
| `top-bar` | Full-width top bar | Immediate visibility |
| `center` | Center of screen | Maximum attention |
| `center-modal` | Center with backdrop | Modal-style presentation |

## 🔗 Callbacks

| Callback | Parameters | Description |
|----------|------------|-------------|
| `onAcceptAll` | categories: Object | Called when user accepts all cookies |
| `onRejectAll` | categories: Object | Called when user rejects all non-essential cookies |
| `onCategoryToggle` | category: String, enabled: Boolean | Called when a category is toggled |
| `onPreferencesShow` | - | Called when preferences panel is shown |
| `onPreferencesHide` | - | Called when preferences panel is hidden |

```javascript
cookieconsent.extended.init({
  callbacks: {
    onAcceptAll: function(categories) {
      // Enable all tracking
      gtag('config', 'GA_MEASUREMENT_ID');
    },
    
    onCategoryToggle: function(category, enabled) {
      if (category === 'analytics') {
        gtag('consent', 'update', {
          'analytics_storage': enabled ? 'granted' : 'denied'
        });
      }
    }
  }
});
```

## 🛠️ Utilities

Access utility functions through `cookieconsent.extended.utils`:

### setCookieWithCategory(name, value, category, options)

Set a cookie only if the user has consented to the category.

```javascript
// Only set cookie if analytics is enabled
cookieconsent.extended.utils.setCookieWithCategory(
  'analytics_id', 
  'user123', 
  'analytics', 
  { days: 30 }
);
```

### getConsentedCategories()

Get the consented categories from localStorage.

### triggerAnalytics(action, categories)

Trigger analytics events for consent actions.