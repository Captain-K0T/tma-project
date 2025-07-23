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
├── metrika-loader.js # Yandex Metrica initialization script
├── tma-1/           # AI Таролог - Dark mystical theme (Cinzel + Roboto fonts)
├── tma-2/           # Foody Scan - Light healthy theme (Inter + Roboto fonts)
├── tma-3/           # Crypto App - Dark premium theme (Space Grotesk fonts)
├── tma-4/           # Stickerface AI - Sticker generation app (Nunito fonts, creative gradients)
├── tma-5/           # BuddyFit - Work in progress
└── update-standalone.sh # Script for safely updating standalone branches
```

### Each TMA Directory Contains:
- `index.html` - Main landing page
- `onboarding-1.html`, `onboarding-2.html`, `onboarding-3.html` - Onboarding flow
- `paywall.html` - Subscription/payment page
- `error.html` - Error page
- `script.js` - JavaScript logic and analytics
- `style-v2.css` - Styling (with cache-busting versioning via `?v=N` query params)
- `images/` - TMA-specific SVG assets (each TMA has its own themed images)
- `metrika-loader.js` - Local copy of analytics script for TMA independence

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

### Standalone Branch Management
**IMPORTANT**: Use the automated script for updating standalone branches:
```bash
# Update single branch
./update-standalone.sh 4

# Update all branches
./update-standalone.sh all
```

**NEVER manually switch to standalone branches for editing - this will cause local file confusion!**

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

### CSS Variables and Theming
- Uses Telegram viewport variables: `--tg-viewport-stable-height`
- Each TMA has distinct visual themes:
  - **TMA-1**: Dark mystical purple with radial gradients, Cinzel + Roboto fonts
  - **TMA-2**: Light healthy green with linear gradients, Inter + Roboto fonts  
  - **TMA-3**: Dark premium theme with golden accents, Space Grotesk font
  - **TMA-4/5**: Currently using TMA-1 styling as placeholder

### Key CSS Classes
- `.main-button` - Primary action buttons (fixed positioning)
- `.disabled` - Inactive button state
- `.selected` - Selected tariff highlighting
- `.start-aligned` - Top-aligned content for onboarding screens

## TMA Differences

Each TMA is functionally identical but represents different products:
- **TMA-1**: "AI Таролог" - Tarot reading app with mystical theming
- **TMA-2**: "Foody Scan" - Food scanning app with healthy lifestyle theming  
- **TMA-3**: "Crypto App" - Cryptocurrency/fintech app with premium theming
- **TMA-4**: "Stickerface AI" - Sticker creation app (development in progress)
- **TMA-5**: "BuddyFit" - Fitness support app (development in progress)

Technical differences:
- Unique analytics goal prefixes (TMA-2 uses "2-", TMA-3 uses "3-", etc.)
- Separate button IDs matching the prefix pattern
- Independent tracking for conversion analysis
- Distinct visual themes and branding per app concept

## Git Workflow and Branch Management

### Safe Development Workflow
1. **Always work in the `main` branch** for development and changes
2. **Never manually switch to standalone branches** - they are deployment-only branches
3. **Use the automated script** to update standalone branches after changes

### Standalone Branches
Each TMA has a corresponding standalone branch (`tma-1-standalone`, `tma-2-standalone`, etc.) that contains:
- Only files for that specific TMA in the root directory
- Shared files (metrika-loader.js, .gitignore, .htaccess) 
- The update script for reference

These branches are used for individual deployment of each TMA.

### Branch Update Process
```bash
# After making changes in main:
git add .
git commit -m "Your changes"
git push origin main

# Update standalone branches:
./update-standalone.sh all  # Updates all 5 branches
# OR
./update-standalone.sh 3    # Updates only tma-3-standalone
```

**⚠️ CRITICAL WARNING**: 
- Do NOT use `git checkout` to switch to standalone branches manually
- Do NOT edit files while on standalone branches
- Do NOT use `git rm -rf .` or similar destructive commands
- The script handles all branch management safely

## Common Patterns

When working with this codebase:
- Maintain the pure HTML/CSS/JS approach - avoid introducing frameworks
- Keep each TMA completely isolated
- Use the existing goal mapping pattern for analytics
- Follow the established naming conventions for button IDs and goals
- Preserve the fixed button positioning and responsive design
- **Always use the main branch for development work**