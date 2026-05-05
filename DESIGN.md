# Makeup by Nehad Imran — Design System

## Overview
Premium luxury makeup artist portfolio & booking site. Dark near-black foundation with pinkish rose-mauve accents, celebrity-grade aesthetic, 3D animations throughout.

## Visual Direction
Tone: luxury, refined, sensory, celebrity-positioned. Anti-generic: every section intentionally layered with depth, glow, and motion. Not bright/playful — sophisticated and exclusive.

## Palette (OKLCH)
| Name | Light | Dark | Purpose |
|------|-------|------|----------|
| Background | 0.97 0 0 | 0.12 0 0 | Page base, near-black luxury |
| Card | 0.98 0.01 0 | 0.18 0.01 0 | Elevated surfaces with subtle texture |
| Accent (Rose-Mauve) | 0.65 0.22 315 | 0.65 0.22 315 | Primary interactive, glow effects, buttons |
| Foreground | 0.15 0 0 | 0.95 0 0 | Text, high contrast |
| Muted | 0.92 0.02 0 | 0.25 0.02 0 | Secondary, borders, subtle |
| Border | 0.88 0.02 0 | 0.28 0.02 320 | Subtle purple-tinted dividers |

## Typography
- **Display**: Fraunces (high-fashion serif, elegant, luxury positioning)
- **Body**: GeneralSans (clean, contemporary, professional)
- **Mono**: GeistMono (code/technical text)

## Elevation & Depth
Card layering with subtle inset glow; hover lift (8px translate + perspective); section depth via drop shadows.

## Structural Zones
| Zone | Treatment | Purpose |
|------|-----------|----------|
| Header | Transparent scroll-reveal | Minimal until needed |
| Hero | 3D animated background (Three.js) + overlay text | Impression, celebrity credentials |
| Services | Grid of 3D-perspective cards, lift-hover | Browse offerings |
| Testimonials | Spotlight glow background per card | Celebrity validation |
| Contact | Embedded map + floating action buttons | Booking & engagement |
| Footer | Dark with accent border-top | Closure |

## Motion & Animation
- Scroll fade-in-up: opacity + 30px translate
- Pulse-glow: accent drop-shadow 2s loop
- Lift-hover: 3D perspective, smooth bezier
- Pulse-float: Y translate + scale loop (3s)

## Component Patterns
Buttons: accent bg with inner glow, pulse on hover. Cards: blur-glow overlay, inset accent shadow. Text: glow-text utility for headings.

## Signature Detail
Blurry glow overlays (backdrop-filter blur + inset accent shadow) on premium sections; every interactive element has pulsing inner glow; 3D animated hero with floating objects.

## Constraints
- NO bright/neon: all accent is muted rose-mauve
- NO generic animation: all motion purposeful, luxury pacing
- NO flat surfaces: every card has depth via shadow or blur-glow
- Dark-only (no light mode): cohesive night/luxury mood
- Celebrity emphasis: testimonials, credentials, work samples highlighted
