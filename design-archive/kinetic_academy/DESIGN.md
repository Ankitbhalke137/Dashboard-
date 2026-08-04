---
name: Kinetic Academy
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#b9cacb'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#849495'
  outline-variant: '#3b494b'
  surface-tint: '#00dbe9'
  primary: '#dbfcff'
  on-primary: '#00363a'
  primary-container: '#00f0ff'
  on-primary-container: '#006970'
  inverse-primary: '#006970'
  secondary: '#ffffff'
  on-secondary: '#283500'
  secondary-container: '#c3f400'
  on-secondary-container: '#556d00'
  tertiary: '#fdf3ff'
  on-tertiary: '#480081'
  tertiary-container: '#e9d0ff'
  on-tertiary-container: '#8523dd'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#7df4ff'
  primary-fixed-dim: '#00dbe9'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f54'
  secondary-fixed: '#c3f400'
  secondary-fixed-dim: '#abd600'
  on-secondary-fixed: '#161e00'
  on-secondary-fixed-variant: '#3c4d00'
  tertiary-fixed: '#efdbff'
  tertiary-fixed-dim: '#dcb8ff'
  on-tertiary-fixed: '#2c0051'
  on-tertiary-fixed-variant: '#6700b5'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  headline-xl:
    fontFamily: JetBrains Mono
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: JetBrains Mono
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: JetBrains Mono
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: JetBrains Mono
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.2'
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  container-max: 1440px
---

## Brand & Style
The brand personality is a fusion of academic rigor and cutting-edge technological innovation. This design system targets high-achieving students and developers, evoking a sense of "intellectual momentum." 

The visual style is **Cyber-Academic Minimalism**—a hybrid of high-tech Glassmorphism and structured Corporate Modernism. It utilizes deep, dark backgrounds to reduce eye strain during long study or coding sessions, punctuated by vibrant neon accents that represent "energy" and "focus points." The interface should feel like a high-end IDE crossed with a premium editorial journal.

## Colors
The palette is rooted in a "Deep Space" neutral base, using `#020617` for primary backgrounds to create infinite depth. 

*   **Electric Blue (#00F0FF):** Primary action color and primary brand identity.
*   **Cyber Lime (#CCFF00):** Success states, "Leapx" status indicators, and highlight accents.
*   **Royal Purple (#8A2BE2):** Used for advanced technical features, research categories, and secondary navigational paths.
*   **Neutral Palette:** Utilizes varying shades of slate and charcoal to define hierarchy without harsh contrast.

## Typography
The typography system prioritizes technical precision. **JetBrains Mono** is utilized for all headings and labels to instill a "code-first" developer aesthetic. Its ligatures and distinct character shapes reinforce the academic-tech vibe.

**Geist** serves as the body typeface, chosen for its exceptional legibility in dark mode and its neutral, systematic rhythm. 

*   **Headings:** Always use Mono. Larger sizes should use tighter letter spacing.
*   **Technical Labels:** Use Mono in uppercase with subtle letter spacing for "Leapx" statuses and metadata.
*   **Body Content:** Use Geist for long-form reading, course descriptions, and documentation.

## Layout & Spacing
This design system employs a **structured dashboard grid** for functional pages and a **responsive masonry grid** for discovery and gallery sections.

*   **Dashboard Grid:** A 12-column system with a 24px gutter. Content is organized into modular "widgets" or cards.
*   **Masonry Flow:** For portfolios and student projects, cards stack vertically with consistent 24px gaps, allowing for varying content heights.
*   **Adaptive Rules:** 
    *   **Desktop:** 12 columns, 48px side margins.
    *   **Tablet:** 8 columns, 32px side margins.
    *   **Mobile:** 4 columns, 16px side margins. Cards usually stack to full width.

## Elevation & Depth
Depth is achieved through **Glassmorphism** and **Tonal Layering** rather than traditional shadows.

*   **Surface 0 (Background):** `#020617` - The base layer.
*   **Surface 1 (Cards):** Semi-transparent `#1E293B` (70% opacity) with a 16px backdrop blur.
*   **Borders:** Subtle 1px solid borders using `rgba(255, 255, 255, 0.1)`.
*   **Interactive Elevation:** On hover, cards should gain a "Neon Glow"—a soft, 15px outer spread using the primary or secondary accent color at 20% opacity.
*   **Overlay Layer:** Modals and menus use 90% opacity with a 32px backdrop blur to isolate from the background dashboard.

## Shapes
The shape language is modern and calculated. A consistent **8px (Base)** to **12px (Large)** corner radius is used for all UI containers to balance the "tech" sharpness with "academic" approachability.

*   **Inputs & Small Buttons:** 8px radius.
*   **Main Dashboard Cards:** 12px radius.
*   **Status Badges:** Use a "technical pill" shape (rounded-full) but keep the font monospaced.

## Components
*   **Buttons:** Primary action buttons use a solid Electric Blue fill with black text (JetBrains Mono). Secondary buttons use a ghost style with a Cyber Lime border.
*   **Glass Cards:** The signature component. Must include a 1px top-light border to simulate a glass edge and a 16px backdrop-blur.
*   **Monospace Badges:** Used for "Leapx" status or course tags. These should have a slight background tint of the accent color (10% opacity) and a high-contrast text color.
*   **Input Fields:** Dark charcoal backgrounds (`#0F172A`) with a subtle 1px border that turns Electric Blue on focus. Labels must be monospaced and positioned above the field.
*   **Data Visualizations:** Use neon accent colors for line charts and progress bars against the dark background for maximum "glow" effect.
*   **Progress Indicators:** Thin, 2px high neon bars at the top of cards or containers to indicate course completion or project status.