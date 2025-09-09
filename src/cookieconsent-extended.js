/*!
 * Extended Cookie Consent v1.0.0
 * Based on Cookie Consent by Osano
 * Enhanced with additional features for better UX and compliance
 * https://github.com/casjay-templates/cookieconsent
 * Copyright 2024 CasJay Templates
 * Licensed under MIT
 */

(function(window) {
  'use strict';

  // Extend the original cookieconsent functionality
  var cookieconsent = window.cookieconsent || {};
  
  // Enhanced configuration defaults
  var enhancedDefaults = {
    // Analytics integration
    analytics: {
      enabled: false,
      gtag: null,
      googleAnalytics: null,
      customCallback: null
    },
    
    // Advanced UI options
    ui: {
      showPreferences: true,
      showStatistics: false,
      animationType: 'slide', // 'slide', 'fade', 'bounce'
      position: 'bottom-right', // 'bottom-right', 'bottom-left', 'bottom-center', 'top-right', 'top-left', 'top-center', 'center', 'center-modal', 'bottom-bar', 'top-bar'
      theme: null, // Theme name or null for default
      cornerRadius: '8px',
      shadow: true,
      backdrop: false
    },
    
    // Cookie categories for granular control
    categories: {
      necessary: {
        enabled: true,
        locked: true,
        name: 'Necessary',
        description: 'Essential cookies for website functionality'
      },
      analytics: {
        enabled: false,
        locked: false,
        name: 'Analytics',
        description: 'Help us understand how visitors use our website'
      },
      marketing: {
        enabled: false,
        locked: false,
        name: 'Marketing',
        description: 'Used to deliver personalized advertisements'
      },
      preferences: {
        enabled: false,
        locked: false,
        name: 'Preferences',
        description: 'Remember your settings and preferences'
      }
    },
    
    // Enhanced content
    content: {
      header: 'We use cookies',
      message: 'We use cookies and similar technologies to help personalize content, tailor and measure ads, and provide a better experience.',
      acceptAll: 'Accept All',
      acceptSelected: 'Accept Selected',
      rejectAll: 'Reject All',
      preferences: 'Cookie Preferences',
      save: 'Save Settings',
      close: '✕',
      necessary: 'Necessary',
      analytics: 'Analytics', 
      marketing: 'Marketing',
      showDetails: 'Show Details',
      hideDetails: 'Hide Details',
      cookieUsage: 'Cookie Usage',
      privacyPolicy: 'Privacy Policy',
      poweredBy: 'Cookie management powered by'
    },
    
    // Compliance enhancements
    compliance: {
      gdprCompliant: true,
      ccpaCompliant: true,
      recordConsent: true,
      consentVersion: '1.0',
      auditTrail: false
    },
    
    // Advanced callbacks
    callbacks: {
      onAcceptAll: null,
      onRejectAll: null,
      onCategoryToggle: null,
      onPreferencesShow: null,
      onPreferencesHide: null
    }
  };

  // Extended utility functions
  var utils = {
    // Create unique ID for consent records
    generateId: function() {
      return 'cc_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    },
    
    // Save consent record
    saveConsentRecord: function(categories, metadata) {
      if (!enhancedDefaults.compliance.recordConsent) return;
      
      var record = {
        id: this.generateId(),
        timestamp: new Date().toISOString(),
        categories: categories,
        version: enhancedDefaults.compliance.consentVersion,
        userAgent: navigator.userAgent,
        url: window.location.href,
        metadata: metadata || {}
      };
      
      // Save to localStorage for audit trail
      if (enhancedDefaults.compliance.auditTrail) {
        var records = JSON.parse(localStorage.getItem('cc_audit_trail') || '[]');
        records.push(record);
        // Keep only last 50 records
        if (records.length > 50) records = records.slice(-50);
        localStorage.setItem('cc_audit_trail', JSON.stringify(records));
      }
      
      return record;
    },
    
    // Enhanced cookie management
    setCookieWithCategory: function(name, value, category, options) {
      options = options || {};
      var categories = this.getConsentedCategories();
      
      if (categories[category]) {
        var expires = new Date();
        expires.setTime(expires.getTime() + (options.days || 365) * 24 * 60 * 60 * 1000);
        
        document.cookie = [
          name + '=' + encodeURIComponent(value),
          'expires=' + expires.toUTCString(),
          'path=' + (options.path || '/'),
          options.domain ? 'domain=' + options.domain : '',
          options.secure ? 'secure' : '',
          options.sameSite ? 'samesite=' + options.sameSite : ''
        ].filter(Boolean).join('; ');
        
        return true;
      }
      return false;
    },
    
    // Get consented categories
    getConsentedCategories: function() {
      var consent = localStorage.getItem('cc_categories');
      return consent ? JSON.parse(consent) : {};
    },
    
    // Analytics integration helpers
    triggerAnalytics: function(action, categories) {
      var analytics = enhancedDefaults.analytics;
      
      if (analytics.gtag && window.gtag) {
        window.gtag('event', 'cookie_consent', {
          action: action,
          categories: Object.keys(categories).filter(k => categories[k]).join(',')
        });
      }
      
      if (analytics.googleAnalytics && window.ga) {
        window.ga('send', 'event', 'Cookie Consent', action, 
          Object.keys(categories).filter(k => categories[k]).join(','));
      }
      
      if (analytics.customCallback && typeof analytics.customCallback === 'function') {
        analytics.customCallback(action, categories);
      }
    }
  };

  // Enhanced Popup class extension
  var EnhancedPopup = function(options) {
    this.options = this.mergeOptions(enhancedDefaults, options || {});
    this.isPreferencesOpen = false;
    this.consentRecord = null;
    
    this.init();
  };

  EnhancedPopup.prototype = {
    mergeOptions: function(defaults, options) {
      var merged = JSON.parse(JSON.stringify(defaults));
      for (var key in options) {
        if (options.hasOwnProperty(key)) {
          if (typeof options[key] === 'object' && options[key] !== null && !Array.isArray(options[key])) {
            merged[key] = this.mergeOptions(merged[key] || {}, options[key]);
          } else {
            merged[key] = options[key];
          }
        }
      }
      return merged;
    },

    init: function() {
      // Check if consent already exists
      var existingConsent = localStorage.getItem('cc_categories');
      if (existingConsent) {
        this.loadExistingConsent();
        return;
      }

      this.createPopup();
      this.attachEventListeners();
      this.show();
    },

    loadExistingConsent: function() {
      var categories = JSON.parse(localStorage.getItem('cc_categories') || '{}');
      
      // Apply existing consent
      this.applyConsent(categories);
      
      // Show revoke button if enabled
      if (this.options.revokable) {
        this.showRevokeButton();
      }
    },

    createPopup: function() {
      var popup = document.createElement('div');
      popup.className = this.getPopupClasses();
      popup.innerHTML = this.getPopupHTML();
      
      document.body.appendChild(popup);
      this.element = popup;
    },

    getPopupClasses: function() {
      var classes = ['cc-popup-extended'];
      
      // Add animation class
      if (this.options.ui.animationType) {
        classes.push('cc-animation-' + this.options.ui.animationType);
      }
      
      // Add theme class
      if (this.options.ui.theme) {
        classes.push('cc-theme-' + this.options.ui.theme);
      }
      
      return classes.join(' ');
    },

    getPopupHTML: function() {
      var content = this.options.content;
      var categories = this.options.categories;
      
      var html = `
        <div class="cc-popup-backdrop" ${this.options.ui.backdrop ? '' : 'style="display:none"'}></div>
        <div class="cc-popup-container ${this.options.ui.position}">
          <div class="cc-popup-header">
            <h3>${content.header}</h3>
            <button class="cc-close-btn" data-action="close">${content.close}</button>
          </div>
          
          <div class="cc-popup-body">
            <p class="cc-message">${content.message}</p>
            
            ${this.options.ui.showPreferences ? `
              <div class="cc-categories">
                ${Object.keys(categories).map(key => `
                  <div class="cc-category">
                    <div class="cc-category-header">
                      <label class="cc-category-toggle">
                        <input type="checkbox" 
                               data-category="${key}" 
                               ${categories[key].enabled ? 'checked' : ''} 
                               ${categories[key].locked ? 'disabled' : ''}/>
                        <span class="cc-toggle-slider"></span>
                        <span class="cc-category-name">${categories[key].name}</span>
                      </label>
                    </div>
                    <div class="cc-category-description">
                      ${categories[key].description}
                    </div>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>
          
          <div class="cc-popup-footer">
            <div class="cc-popup-actions">
              <button class="cc-btn cc-btn-reject" data-action="reject-all">${content.rejectAll}</button>
              ${this.options.ui.showPreferences ? `
                <button class="cc-btn cc-btn-accept-selected" data-action="accept-selected">${content.acceptSelected}</button>
              ` : ''}
              <button class="cc-btn cc-btn-accept cc-btn-primary" data-action="accept-all">${content.acceptAll}</button>
            </div>
            
            <div class="cc-popup-links">
              <a href="${this.options.content.href || '#'}" target="_blank">${content.privacyPolicy}</a>
              <span class="cc-powered-by">${content.poweredBy} 
                <a href="https://github.com/casjay-templates/cookieconsent" target="_blank">Extended Cookie Consent</a>
              </span>
            </div>
          </div>
        </div>
      `;
      
      return html;
    },

    attachEventListeners: function() {
      var self = this;
      
      this.element.addEventListener('click', function(e) {
        var action = e.target.getAttribute('data-action');
        var category = e.target.getAttribute('data-category');
        
        if (action) {
          e.preventDefault();
          self.handleAction(action, e.target);
        } else if (category) {
          self.handleCategoryToggle(category, e.target);
        }
      });

      // Handle backdrop clicks
      var backdrop = this.element.querySelector('.cc-popup-backdrop');
      if (backdrop) {
        backdrop.addEventListener('click', function() {
          if (self.options.ui.backdrop) {
            self.hide();
          }
        });
      }
    },

    handleAction: function(action, element) {
      switch (action) {
        case 'accept-all':
          this.acceptAll();
          break;
        case 'reject-all':
          this.rejectAll();
          break;
        case 'accept-selected':
          this.acceptSelected();
          break;
        case 'close':
          this.hide();
          break;
      }
    },

    handleCategoryToggle: function(category, element) {
      if (this.options.categories[category] && !this.options.categories[category].locked) {
        var isChecked = element.checked;
        
        // Update internal state
        this.options.categories[category].enabled = isChecked;
        
        // Trigger callback
        if (this.options.callbacks.onCategoryToggle) {
          this.options.callbacks.onCategoryToggle(category, isChecked);
        }
      }
    },

    acceptAll: function() {
      var categories = {};
      
      Object.keys(this.options.categories).forEach(function(key) {
        categories[key] = true;
      });
      
      this.saveConsent(categories, 'accept_all');
      this.applyConsent(categories);
      
      if (this.options.callbacks.onAcceptAll) {
        this.options.callbacks.onAcceptAll(categories);
      }
      
      this.hide();
    },

    rejectAll: function() {
      var categories = {};
      
      Object.keys(this.options.categories).forEach(function(key) {
        categories[key] = this.options.categories[key].locked;
      }.bind(this));
      
      this.saveConsent(categories, 'reject_all');
      this.applyConsent(categories);
      
      if (this.options.callbacks.onRejectAll) {
        this.options.callbacks.onRejectAll(categories);
      }
      
      this.hide();
    },

    acceptSelected: function() {
      var categories = {};
      
      Object.keys(this.options.categories).forEach(function(key) {
        categories[key] = this.options.categories[key].enabled;
      }.bind(this));
      
      this.saveConsent(categories, 'accept_selected');
      this.applyConsent(categories);
      
      this.hide();
    },

    saveConsent: function(categories, action) {
      // Save to localStorage
      localStorage.setItem('cc_categories', JSON.stringify(categories));
      localStorage.setItem('cc_timestamp', new Date().toISOString());
      localStorage.setItem('cc_action', action);
      
      // Create consent record
      this.consentRecord = utils.saveConsentRecord(categories, { action: action });
      
      // Trigger analytics
      utils.triggerAnalytics(action, categories);
    },

    applyConsent: function(categories) {
      // Enable/disable cookies based on consent
      this.manageGoogleAnalytics(categories.analytics);
      this.manageGoogleTagManager(categories.analytics || categories.marketing);
      
      // Custom consent application
      if (window.ccApplyConsent) {
        window.ccApplyConsent(categories);
      }
      
      // Dispatch custom event
      var event = new CustomEvent('cookieConsentChange', {
        detail: { categories: categories, record: this.consentRecord }
      });
      window.dispatchEvent(event);
    },

    manageGoogleAnalytics: function(enabled) {
      if (window.gtag) {
        window.gtag('consent', 'update', {
          analytics_storage: enabled ? 'granted' : 'denied',
          ad_storage: enabled ? 'granted' : 'denied'
        });
      }
    },

    manageGoogleTagManager: function(enabled) {
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'cookie_consent_update',
          analytics_enabled: enabled,
          marketing_enabled: enabled
        });
      }
    },

    show: function() {
      if (this.element) {
        this.element.style.display = 'block';
        
        // Apply animation
        setTimeout(function() {
          this.element.classList.add('cc-show');
        }.bind(this), 10);
      }
    },

    hide: function() {
      if (this.element) {
        this.element.classList.remove('cc-show');
        
        setTimeout(function() {
          if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
          }
        }.bind(this), 300);
      }
    },

    showRevokeButton: function() {
      var revokeBtn = document.createElement('div');
      revokeBtn.className = 'cc-revoke-extended';
      revokeBtn.innerHTML = '<button class="cc-revoke-btn">Cookie Settings</button>';
      revokeBtn.addEventListener('click', function() {
        this.revoke();
      }.bind(this));
      
      document.body.appendChild(revokeBtn);
    },

    revoke: function() {
      localStorage.removeItem('cc_categories');
      localStorage.removeItem('cc_timestamp');
      localStorage.removeItem('cc_action');
      
      // Remove revoke button
      var revokeBtn = document.querySelector('.cc-revoke-extended');
      if (revokeBtn) {
        revokeBtn.parentNode.removeChild(revokeBtn);
      }
      
      // Reinitialize
      this.init();
    }
  };

  // Theme registry
  var themes = {
    // Light themes
    'github-light': 'GitHub Light',
    'material-light': 'Material Light',
    'tailwind-light': 'Tailwind Light',
    'bootstrap-light': 'Bootstrap Light',
    'ant-light': 'Ant Design Light',
    'chakra-light': 'Chakra Light',
    'mantine-light': 'Mantine Light',
    'semantic-light': 'Semantic UI Light',
    'bulma-light': 'Bulma Light',
    'foundation-light': 'Foundation Light',
    
    // Dark themes
    'dracula': 'Dracula',
    'github-dark': 'GitHub Dark',
    'material-dark': 'Material Dark',
    'tailwind-dark': 'Tailwind Dark',
    'vscode-dark': 'VS Code Dark',
    'atom-dark': 'Atom Dark',
    'sublime-dark': 'Sublime Dark',
    'nord-dark': 'Nord Dark',
    'discord-dark': 'Discord Dark',
    'slack-dark': 'Slack Dark',
    'notion-dark': 'Notion Dark'
  };

  // Enhanced API
  cookieconsent.extended = {
    init: function(options) {
      return new EnhancedPopup(options);
    },
    
    getConsent: function() {
      return JSON.parse(localStorage.getItem('cc_categories') || '{}');
    },
    
    hasConsent: function(category) {
      var consent = this.getConsent();
      return consent[category] === true;
    },
    
    getAuditTrail: function() {
      return JSON.parse(localStorage.getItem('cc_audit_trail') || '[]');
    },
    
    // Theme management
    getAvailableThemes: function() {
      return themes;
    },
    
    getThemesByType: function(type) {
      if (type === 'light') {
        return Object.keys(themes).filter(key => key.includes('-light')).reduce((obj, key) => {
          obj[key] = themes[key];
          return obj;
        }, {});
      } else if (type === 'dark') {
        return Object.keys(themes).filter(key => key.includes('-dark') || key === 'dracula').reduce((obj, key) => {
          obj[key] = themes[key];
          return obj;
        }, {});
      }
      return themes;
    },
    
    // Position management
    getAvailablePositions: function() {
      return {
        'bottom-right': 'Bottom Right',
        'bottom-left': 'Bottom Left',
        'bottom-center': 'Bottom Center',
        'bottom-bar': 'Bottom Bar',
        'top-right': 'Top Right',
        'top-left': 'Top Left',
        'top-center': 'Top Center',
        'top-bar': 'Top Bar',
        'center': 'Center',
        'center-modal': 'Center Modal'
      };
    },
    
    utils: utils
  };

  // Auto-initialize if window.cookieConsentConfig exists
  if (window.cookieConsentConfig) {
    cookieconsent.extended.init(window.cookieConsentConfig);
  }

  window.cookieconsent = cookieconsent;

})(window);