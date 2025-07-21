# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a collection of 5 Telegram Mini Apps (TMAs) for an "AI Таролог" (AI Tarot) product. Each TMA is a standalone static web application built with vanilla HTML, CSS, and JavaScript without any frameworks or build tools.

## Architecture

- **Technology Stack**: Pure HTML, CSS, JavaScript (ES6+) - no frameworks or build tools
- **Structure**: Each TMA is isolated in its own directory (`tma-1/`, `tma-2/`, etc.)
- **Analytics**: Yandex Metrica (ID: 103293805) integrated via `metrika-loader.js`
- **Telegram Integration**: Uses `telegram-web-app.js` for TMA functionality

### Directory Structure
```
tma-project/
├── images/           # Shared SVG icons (book.svg, card.svg, compas.svg, fortune.svg)
├── metrika-loader.js # Yandex Metrica initialization script
├── tma-1/           # First TMA instance
├── tma-2/           # Second TMA instance  
├── tma-3/           # Third TMA instance
├── tma-4/           # Fourth TMA instance
└── tma-5/           # Fifth TMA instance
```

### Each TMA Directory Contains:
- `index.html` - Main landing page
- `onboarding-1.html`, `onboarding-2.html`, `onboarding-3.html` - Onboarding flow
- `paywall.html` - Subscription/payment page
- `error.html` - Error page
- `script.js` - JavaScript logic and analytics
- `style-v2.css` - Styling

## Development Commands

### Local Development Server
To run any TMA locally:
```bash
cd tma-X  # Replace X with the TMA number (1-5)
npx http-server .
```
Access at: `http://localhost:8080`

### No Build Process
This project requires no build, compilation, or package management. Files are ready for deployment as-is.

## Core Functionality

### Analytics Integration
- Each TMA has unique goal identifiers in Yandex Metrica
- Goals are tracked via `sendGoal(goalId)` function in `script.js`
- TMA-1 uses goals like `CLICK_START_ONBOARDING`, TMA-2 uses `2-CLICK_START_ONBOARDING`, etc.

### Telegram Web App Integration
- All pages initialize with `window.Telegram.WebApp.ready()` and `window.Telegram.WebApp.expand()`
- Uses Telegram viewport variables for proper sizing

### Interactive Paywall Logic
- Paywall pages have dynamic tariff selection
- Submit button is disabled until user selects a tariff
- Selected tariff gets `.selected` class for visual feedback

### Button States and Navigation
- Buttons can be disabled with `.disabled` class
- Goal tracking is prevented for disabled buttons
- Navigation flows: index → onboarding-1 → onboarding-2 → onboarding-3 → paywall

## Styling Architecture

### CSS Variables
- Uses Telegram viewport variables: `--tg-viewport-stable-height`
- Dark purple theme with gradient backgrounds
- Custom fonts: Cinzel (headings) and Roboto (body text) from Google Fonts

### Key CSS Classes
- `.main-button` - Primary action buttons (fixed positioning)
- `.disabled` - Inactive button state
- `.selected` - Selected tariff highlighting
- `.start-aligned` - Top-aligned content for onboarding screens

## TMA Differences

Each TMA (1-5) is functionally identical but has:
- Unique analytics goal prefixes (TMA-2 uses "2-", TMA-3 uses "3-", etc.)
- Separate button IDs matching the prefix pattern
- Independent tracking for conversion analysis

## Common Patterns

When working with this codebase:
- Maintain the pure HTML/CSS/JS approach - avoid introducing frameworks
- Keep each TMA completely isolated
- Use the existing goal mapping pattern for analytics
- Follow the established naming conventions for button IDs and goals
- Preserve the fixed button positioning and responsive design