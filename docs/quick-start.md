---
layout: docs
title: Quick Start Guide
description: Get Extended Cookie Consent up and running in minutes
permalink: /docs/quick-start/
---

# 🚀 Quick Start Guide

Get Extended Cookie Consent up and running in minutes with this step-by-step guide.

<div class="alert alert-info">
<strong>💡 TL;DR:</strong> Add two files, call one function, and you're done!
</div>

## Step 1: Installation

### Option A: CDN (Recommended)
Add these links to your HTML file:

```html
<!-- CSS -->
<link rel="stylesheet" href="{{ site.cdn_base }}/cookieconsent.min.css">

<!-- JavaScript -->
<script src="{{ site.cdn_base }}/cookieconsent.min.js"></script>
```

### Option B: GitHub Raw
```html
<!-- CSS -->
<link rel="stylesheet" href="{{ site.github_raw }}/cookieconsent.min.css">

<!-- JavaScript -->
<script src="{{ site.github_raw }}/cookieconsent.min.js"></script>
```

## Step 2: Basic Usage

Initialize with default settings:

```javascript
// Basic initialization
cookieconsent.extended.init({
  content: {
    header: 'We use cookies',
    message: 'This website uses cookies to enhance your experience.'
  }
});
```

<div class="alert alert-success">
<strong>✅ That's it!</strong> Your cookie consent is now working with GDPR compliance.
</div>

## Step 3: Choose a Theme

Select from 21 beautiful themes:

```javascript
// Dark theme example
cookieconsent.extended.init({
  ui: {
    theme: 'dracula',
    position: 'bottom-right'
  },
  content: {
    header: '🧛 Cookie Notice',
    message: 'We use cookies to make your experience awesome!'
  }
});
```

### Popular Themes:

**🌞 Light Themes:**
- `github-light`, `material-light`, `tailwind-light`, `bootstrap-light`, `ant-light`

**🌙 Dark Themes:**  
- `dracula`, `github-dark`, `vscode-dark`, `material-dark`, `discord-dark`

## Step 4: Set Position

Choose where the popup appears:

```javascript
// Bottom bar across full width
cookieconsent.extended.init({
  ui: {
    position: 'bottom-bar',
    theme: 'github-dark'
  }
});

// Center modal with backdrop
cookieconsent.extended.init({
  ui: {
    position: 'center-modal',
    backdrop: true,
    theme: 'material-light'
  }
});
```

### Position Options:
- **Corners:** `bottom-right`, `bottom-left`, `top-right`, `top-left`
- **Bars:** `bottom-bar`, `top-bar` (full width)
- **Center:** `center`, `center-modal` (with backdrop)

## Step 5: Enable Cookie Categories

Let users choose which cookies to accept:

```javascript
cookieconsent.extended.init({
  ui: {
    showPreferences: true,
    theme: 'tailwind-dark',
    position: 'center'
  },
  
  categories: {
    necessary: {
      enabled: true,
      locked: true,
      name: 'Essential Cookies',
      description: 'Required for the website to function properly.'
    },
    analytics: {
      enabled: false,
      locked: false,
      name: 'Analytics Cookies',
      description: 'Help us understand how visitors use our website.'
    },
    marketing: {
      enabled: false,
      locked: false,
      name: 'Marketing Cookies',
      description: 'Used to show you relevant advertisements.'
    }
  }
});
```

## Step 6: Check Consent Status

Use the consent status to conditionally load scripts:

```javascript
// Check if analytics are allowed
if (cookieconsent.extended.hasConsent('analytics')) {
  // Load Google Analytics
  gtag('config', 'GA_MEASUREMENT_ID');
}

// Check if marketing cookies are allowed
if (cookieconsent.extended.hasConsent('marketing')) {
  // Load Facebook Pixel, etc.
  fbq('init', 'PIXEL_ID');
}

// Get all consent status
const consent = cookieconsent.extended.getConsent();
console.log('Current consent:', consent);
// Output: { necessary: true, analytics: false, marketing: true }
```

## Step 7: Listen for Changes

React to consent changes:

```javascript
// Listen for consent changes
window.addEventListener('cookieConsentChange', function(event) {
  const categories = event.detail.categories;
  
  // Update Google Analytics consent
  if (window.gtag) {
    gtag('consent', 'update', {
      'analytics_storage': categories.analytics ? 'granted' : 'denied',
      'ad_storage': categories.marketing ? 'granted' : 'denied'
    });
  }
  
  console.log('Consent updated:', categories);
});
```

## Complete Example

Here's a complete, production-ready implementation:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website</title>
    
    <!-- Cookie Consent CSS -->
    <link rel="stylesheet" href="{{ site.cdn_base }}/cookieconsent.min.css">
</head>
<body>
    <h1>Welcome to My Website</h1>
    <p>Your content here...</p>
    
    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        
        // Initialize with denied consent
        gtag('consent', 'default', {
            'analytics_storage': 'denied',
            'ad_storage': 'denied'
        });
        
        gtag('js', new Date());
        gtag('config', 'GA_MEASUREMENT_ID');
    </script>
    
    <!-- Cookie Consent -->
    <script src="{{ site.cdn_base }}/cookieconsent.min.js"></script>
    <script>
        cookieconsent.extended.init({
            ui: {
                theme: 'github-dark',
                position: 'bottom-bar',
                showPreferences: true
            },
            
            content: {
                header: 'We value your privacy',
                message: 'We use cookies to enhance your browsing experience and analyze our traffic.',
                acceptAll: 'Accept All Cookies',
                rejectAll: 'Reject All',
                acceptSelected: 'Save Preferences'
            },
            
            categories: {
                necessary: {
                    enabled: true,
                    locked: true,
                    name: 'Essential',
                    description: 'Required for basic website functionality.'
                },
                analytics: {
                    enabled: false,
                    locked: false,
                    name: 'Analytics',
                    description: 'Help us improve our website.'
                },
                marketing: {
                    enabled: false,
                    locked: false,
                    name: 'Marketing',
                    description: 'Personalized advertising.'
                }
            },
            
            callbacks: {
                onAcceptAll: function(categories) {
                    // Enable all tracking
                    gtag('consent', 'update', {
                        'analytics_storage': 'granted',
                        'ad_storage': 'granted'
                    });
                },
                
                onRejectAll: function(categories) {
                    // Keep analytics denied
                    gtag('consent', 'update', {
                        'analytics_storage': 'denied',
                        'ad_storage': 'denied'
                    });
                }
            }
        });
        
        // Listen for changes
        window.addEventListener('cookieConsentChange', function(event) {
            const categories = event.detail.categories;
            
            gtag('consent', 'update', {
                'analytics_storage': categories.analytics ? 'granted' : 'denied',
                'ad_storage': categories.marketing ? 'granted' : 'denied'
            });
        });
    </script>
</body>
</html>
```

<div class="alert alert-warning">
<h5>⚠️ Important Notes</h5>
<ul>
<li>Always initialize analytics with <code>denied</code> consent first</li>
<li>Update consent when user makes choices</li>
<li>Test your implementation thoroughly</li>
<li>Consider your local privacy laws (GDPR, CCPA, etc.)</li>
</ul>
</div>

<div class="alert alert-success">
<h4>🎯 Next Steps</h4>
<ul>
<li>Explore more <a href="{{ site.baseurl }}/examples/">examples</a></li>
<li>Check the <a href="{{ site.baseurl }}/docs/api">API reference</a> for advanced features</li>
<li>Try the <a href="{{ site.baseurl }}/examples/themes">theme showcase</a></li>
<li>Customize colors with CSS variables</li>
</ul>
</div>

<div class="text-center mt-5 mb-4">
    <h3>🚀 You're Ready!</h3>
    <p>You now have a fully functional, GDPR-compliant cookie consent system.</p>
    <a href="{{ site.baseurl }}/examples/" class="btn btn-primary btn-lg">View Examples</a>
    <a href="{{ site.baseurl }}/docs/api" class="btn btn-outline-primary btn-lg">API Reference</a>
</div>