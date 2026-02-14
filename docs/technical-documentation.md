# Technical Documentation

## Portfolio Website - Assignment 1

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [File Structure](#file-structure)
4. [Features Implementation](#features-implementation)
5. [Responsive Design](#responsive-design)
6. [Performance Considerations](#performance-considerations)
7. [Browser Compatibility](#browser-compatibility)
8. [Future Improvements](#future-improvements)

---

## 1. Project Overview

This portfolio website showcases Abdullah Baleid's professional profile, including education, work experience, projects, and certifications. The site features a modern dark theme with coral accent colors, smooth animations, and full responsiveness across devices.

### Key Features
- Responsive single-page design
- Animated hero section with typing effect
- Interactive experience and project modals
- Contact form with validation
- GSAP-powered scroll animations
- Custom cursor (desktop only)
- Mobile navigation menu

---

## 2. Technology Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| HTML5 | Semantic structure |
| CSS3 | Styling with custom properties, Grid, Flexbox |
| JavaScript (ES6+) | Interactivity and animations |
| GSAP 3.12 | Animation library |
| ScrollTrigger | Scroll-based animations |

### External Resources
| Resource | CDN Source |
|----------|------------|
| GSAP | cdnjs.cloudflare.com |
| Google Fonts | fonts.googleapis.com |
| Custom Arabic Font | Local (Palestine-Regular.ttf) |

---

## 3. File Structure

```
assignment-1/
├── index.html              # Main HTML file
├── css/
│   └── styles.css          # All styles (3000+ lines)
├── js/
│   └── main.js             # All JavaScript (2100+ lines)
├── assets/
│   └── images/             # Project images (12 files)
├── docs/
│   ├── ai-usage-report.md  # AI documentation
│   └── technical-documentation.md
├── alfont_com_Palestine-Regular.ttf  # Arabic font
├── Abdullah_Baleid's_CV.pdf
├── README.md
└── .gitignore
```

---

## 4. Features Implementation

### 4.1 Navigation
- **Desktop:** Fixed navigation bar with scroll-triggered background blur
- **Mobile:** Hamburger menu with full-screen overlay
- **Active link highlighting:** Based on scroll position

```javascript
// Scroll detection for nav styling
window.addEventListener('scroll', () => {
    if (currentScroll > 50) {
        nav.classList.add('nav--scrolled');
    }
});
```

### 4.2 Hero Section
- **Typing Effect:** Cycles through job titles
- **Animated Orbs:** CSS animations with GSAP enhancement
- **Arabic Background Text:** Decorative text with scroll fade

### 4.3 Experience Timeline
- **4-column grid layout** on desktop
- **Modal popups** with detailed information
- **Dynamic image loading** from JavaScript data objects

### 4.4 Projects Section
- **3-column grid** with hover effects
- **Modal details** with technology tags
- **Click-to-expand** for full descriptions

### 4.5 Contact Form
- **Client-side validation** for required fields
- **Email format validation** using regex
- **Visual feedback** with animations
- **Success message** after submission

```javascript
// Email validation pattern
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
```

### 4.6 Animations
All animations use GSAP with ScrollTrigger:
- **Reveal animations:** Elements fade in on scroll
- **Counter animations:** Numbers count up when visible
- **Parallax effects:** Background elements move at different speeds

---

## 5. Responsive Design

### Breakpoints
| Breakpoint | Target Devices |
|------------|----------------|
| > 1280px | Large desktop |
| 1024px - 1280px | Desktop |
| 768px - 1024px | Tablet |
| 640px - 768px | Large mobile |
| < 640px | Mobile |

### Key Responsive Features
1. **Navigation:** Switches to hamburger menu below 1024px
2. **Hero:** Single column layout on tablet/mobile
3. **Projects:** 3 → 2 → 1 columns
4. **Experience Grid:** 4 → 2 → 1 columns
5. **Contact:** Full-width form on mobile
6. **Custom Cursor:** Disabled on touch devices

### CSS Variables for Responsive Typography
```css
@media (max-width: 640px) {
    :root {
        --fs-6xl: 2.5rem;
        --fs-5xl: 2rem;
    }
}
```

---

## 6. Performance Considerations

### Optimizations Applied
1. **Image Optimization:** WebP format where supported
2. **Lazy Loading:** Images load when in viewport
3. **Font Display:** `font-display: swap` for custom fonts
4. **Reduced Animations:** Simplified on mobile for performance
5. **CSS Contains:** Used for complex layouts
6. **GSAP Efficiency:** Disabled tilt effects for performance

### Accessibility
- Semantic HTML5 elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Reduced motion support via `prefers-reduced-motion`

```css
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
    }
}
```

---

## 7. Browser Compatibility

### Tested Browsers
| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 120+ | Full Support |
| Firefox | 121+ | Full Support |
| Safari | 17+ | Full Support |
| Edge | 120+ | Full Support |

### Polyfills/Fallbacks
- CSS custom properties with fallback values
- Backdrop-filter fallback for older browsers
- Touch detection for cursor functionality

---

## 8. Future Improvements

### Planned Enhancements
1. **Backend Integration:** Connect contact form to email service
2. **Dark/Light Theme Toggle:** User preference support
3. **Blog Section:** Add article/blog functionality
4. **Project Filtering:** Category-based filtering
5. **Internationalization:** Arabic language support
6. **Analytics:** Add tracking for portfolio views

### Performance Goals
- Lighthouse score > 90 for all metrics
- First Contentful Paint < 1.5s
- Time to Interactive < 3s

---

## Development Notes

### Local Development
```bash
# Clone repository
git clone [repository-url]

# Navigate to project
cd assignment-1

# Open in browser (or use Live Server)
open index.html
```

### Code Style
- BEM naming convention for CSS classes
- Modular JavaScript with separate init functions
- Consistent 4-space indentation
- Comments for complex logic sections

---

*Last Updated: February 2026*
