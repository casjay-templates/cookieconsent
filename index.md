---
layout: default
title: Home
description: Enhanced GDPR-compliant cookie consent library with 21 beautiful themes, 10 positioning options, and advanced compliance features
---

<!-- Hero Section -->
<section class="hero-section">
    <div class="container">
        <div class="row align-items-center">
            <div class="col-lg-6">
                <h1 class="display-4 fw-bold mb-4">
                    <i class="fas fa-cookie-bite me-3"></i>Extended Cookie Consent
                </h1>
                <p class="lead mb-4">
                    Enhanced GDPR-compliant cookie consent with <strong>21 beautiful themes</strong>, 
                    <strong>10 positioning options</strong>, and advanced compliance features.
                </p>
                <div class="d-flex flex-wrap gap-3 mb-4">
                    <a href="{{ site.baseurl }}/docs/quick-start" class="btn btn-cta btn-lg">
                        <i class="fas fa-rocket me-2"></i>Get Started
                    </a>
                    <button class="btn btn-outline-light btn-lg" onclick="showDemo('dracula')">
                        <i class="fas fa-play me-2"></i>Live Demo
                    </button>
                    <a href="{{ site.baseurl }}/examples/themes" class="btn btn-outline-light btn-lg">
                        <i class="fas fa-palette me-2"></i>Explore Themes
                    </a>
                </div>
                <div class="d-flex flex-wrap gap-2">
                    <span class="badge bg-light text-dark">✅ GDPR Compliant</span>
                    <span class="badge bg-light text-dark">📱 Mobile Optimized</span>
                    <span class="badge bg-light text-dark">🎨 21 Themes</span>
                    <span class="badge bg-light text-dark">📍 10 Positions</span>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="text-center">
                    <img src="https://via.placeholder.com/500x350/667eea/ffffff?text=Cookie+Consent+Preview" 
                         alt="Cookie Consent Preview" 
                         class="img-fluid rounded shadow-lg">
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Stats Section -->
<section class="stats-section">
    <div class="container">
        <div class="row text-center">
            <div class="col-md-3">
                <div class="stat-number">21</div>
                <h5>Beautiful Themes</h5>
                <p class="text-muted">Light & dark themes for every brand</p>
            </div>
            <div class="col-md-3">
                <div class="stat-number">10</div>
                <h5>Position Options</h5>
                <p class="text-muted">Corner, bar, and modal layouts</p>
            </div>
            <div class="col-md-3">
                <div class="stat-number">100%</div>
                <h5>GDPR Compliant</h5>
                <p class="text-muted">Built-in compliance features</p>
            </div>
            <div class="col-md-3">
                <div class="stat-number">0</div>
                <h5>Dependencies</h5>
                <p class="text-muted">Pure vanilla JavaScript</p>
            </div>
        </div>
    </div>
</section>

<!-- Quick Start Section -->
<section class="py-5">
    <div class="container">
        <div class="row">
            <div class="col-lg-6">
                <h2 class="h1 mb-4">🚀 Quick Start</h2>
                <p class="lead">Get up and running in under 2 minutes with our CDN links.</p>
                
                <h4>1. Include the files</h4>
                <div class="code-example">
                    <pre><code class="language-html">&lt;!-- CSS --&gt;
&lt;link rel="stylesheet" href="{{ site.cdn_base }}/cookieconsent.min.css"&gt;

&lt;!-- JavaScript --&gt;
&lt;script src="{{ site.cdn_base }}/cookieconsent.min.js"&gt;&lt;/script&gt;</code></pre>
                </div>
                
                <h4>2. Initialize</h4>
                <div class="code-example">
                    <pre><code class="language-javascript">cookieconsent.extended.init({
  ui: {
    theme: 'dracula',
    position: 'bottom-right'
  },
  content: {
    header: 'We use cookies',
    message: 'This website uses cookies to enhance your experience.'
  }
});</code></pre>
                </div>
                
                <div class="mt-4">
                    <a href="{{ site.baseurl }}/docs/quick-start" class="btn btn-primary me-3">
                        <i class="fas fa-book-open me-2"></i>Full Guide
                    </a>
                    <a href="{{ site.baseurl }}/examples/" class="btn btn-outline-primary">
                        <i class="fas fa-code me-2"></i>View Examples
                    </a>
                </div>
            </div>
            <div class="col-lg-6">
                <h2 class="h1 mb-4">🎨 Theme Preview</h2>
                <p class="lead">Choose from 21 professionally designed themes.</p>
                
                <div class="theme-showcase">
                    <div class="theme-pill" onclick="showDemo('dracula')">🧛 Dracula</div>
                    <div class="theme-pill dark" onclick="showDemo('github')">🐙 GitHub Dark</div>
                    <div class="theme-pill" onclick="showDemo('material')">🎨 Material</div>
                    <div class="theme-pill dark">💻 VS Code</div>
                    <div class="theme-pill">🌊 Tailwind</div>
                    <div class="theme-pill dark">⚛️ Atom</div>
                    <div class="theme-pill">🅱️ Bootstrap</div>
                    <div class="theme-pill dark">❄️ Nord</div>
                    <div class="theme-pill">🌐 Semantic</div>
                    <div class="theme-pill dark">🎮 Discord</div>
                    <div class="theme-pill">💚 Bulma</div>
                    <div class="theme-pill dark">💬 Slack</div>
                </div>
                
                <div class="mt-4">
                    <a href="{{ site.baseurl }}/examples/themes" class="btn btn-primary">
                        <i class="fas fa-palette me-2"></i>Explore All Themes
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Features Section -->
<section class="py-5 bg-light">
    <div class="container">
        <div class="row">
            <div class="col-lg-12 text-center mb-5">
                <h2 class="display-5 fw-bold">✨ Powerful Features</h2>
                <p class="lead text-muted">Everything you need for modern cookie compliance</p>
            </div>
        </div>
        <div class="row">
            {% for feature in site.features %}
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="card feature-card h-100">
                    <div class="card-body text-center">
                        <div class="feature-icon">{{ feature.icon }}</div>
                        <h5 class="card-title">{{ feature.title }}</h5>
                        <p class="card-text">{{ feature.description }}</p>
                    </div>
                </div>
            </div>
            {% endfor %}
        </div>
    </div>
</section>

<!-- Installation Options -->
<section class="py-5">
    <div class="container">
        <div class="row">
            <div class="col-lg-12 text-center mb-5">
                <h2 class="display-5 fw-bold">📦 Installation Options</h2>
                <p class="lead text-muted">Choose the method that works best for your project</p>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">
                            <i class="fas fa-cloud me-2 text-primary"></i>CDN (Recommended)
                        </h5>
                        <p class="card-text">Fastest setup using our CDN links. Perfect for most websites.</p>
                        <div class="code-example">
                            <pre><code class="language-html">&lt;link rel="stylesheet" href="{{ site.cdn_base }}/cookieconsent.min.css"&gt;
&lt;script src="{{ site.cdn_base }}/cookieconsent.min.js"&gt;&lt;/script&gt;</code></pre>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">
                            <i class="fab fa-github me-2 text-primary"></i>GitHub Raw
                        </h5>
                        <p class="card-text">Direct from GitHub repository. Always up-to-date.</p>
                        <div class="code-example">
                            <pre><code class="language-html">&lt;link rel="stylesheet" href="{{ site.github_raw }}/cookieconsent.min.css"&gt;
&lt;script src="{{ site.github_raw }}/cookieconsent.min.js"&gt;&lt;/script&gt;</code></pre>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">
                            <i class="fas fa-download me-2 text-primary"></i>Self-Hosted
                        </h5>
                        <p class="card-text">Download and host the files yourself for maximum control.</p>
                        <div class="mt-3">
                            <a href="{{ site.social.github | prepend: 'https://github.com/' }}/releases" 
                               class="btn btn-outline-primary" target="_blank">
                                <i class="fas fa-download me-2"></i>Download Files
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Demo Section -->
<section class="py-5 bg-primary text-white">
    <div class="container">
        <div class="row align-items-center">
            <div class="col-lg-8">
                <h2 class="h1 mb-3">🎯 Try It Now</h2>
                <p class="lead mb-0">See Extended Cookie Consent in action with our interactive demos.</p>
            </div>
            <div class="col-lg-4 text-lg-end">
                <div class="d-flex flex-wrap gap-2 justify-content-lg-end">
                    <button class="btn btn-light" onclick="showDemo('dracula')">
                        <i class="fas fa-moon me-1"></i>Dracula
                    </button>
                    <button class="btn btn-outline-light" onclick="showDemo('github')">
                        <i class="fab fa-github me-1"></i>GitHub
                    </button>
                    <button class="btn btn-outline-light" onclick="showDemo('material')">
                        <i class="fas fa-palette me-1"></i>Material
                    </button>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Call to Action -->
<section class="py-5">
    <div class="container text-center">
        <div class="row">
            <div class="col-lg-8 mx-auto">
                <h2 class="display-5 fw-bold mb-4">Ready to Get Started?</h2>
                <p class="lead mb-4">
                    Join thousands of websites using Extended Cookie Consent for GDPR compliance 
                    and better user experience.
                </p>
                <div class="d-flex flex-wrap justify-content-center gap-3">
                    <a href="{{ site.baseurl }}/docs/quick-start" class="btn btn-cta btn-lg">
                        <i class="fas fa-rocket me-2"></i>Get Started Now
                    </a>
                    <a href="{{ site.baseurl }}/docs/api" class="btn btn-outline-primary btn-lg">
                        <i class="fas fa-book me-2"></i>View Documentation
                    </a>
                    <a href="{{ site.social.github | prepend: 'https://github.com/' }}" 
                       class="btn btn-outline-secondary btn-lg" target="_blank">
                        <i class="fab fa-github me-2"></i>Star on GitHub
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>