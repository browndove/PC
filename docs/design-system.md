# Quik Inspect — Premium Apple-Inspired Design System

> Authoritative style reference for all in-app forms, sheets, and screens.
> Applied to: pharmacy multi-part inspection form, OTCM form, dashboards,
> modals, and all future screens.

---

## Overall Visual Language

A premium Apple-inspired design system focused on simplicity, depth, motion,
clarity, and touch-first interaction. Every screen feels fluid, elegant, and
intentionally spacious, with strong emphasis on smooth animations, layered
surfaces, and visual hierarchy.

The UI combines:

- Minimalism
- Glassmorphism
- Soft neumorphic depth
- Native iOS motion behavior
- High-end typography
- Adaptive dark/light themes
- Smooth tactile interactions

Cinematic, immersive, responsive — comparable to modern banking, productivity,
luxury social, or advanced SaaS mobile platforms on iPhone.

Soft layered appearance: elements float above the background instead of being
hard-separated by borders. Avoids clutter entirely.

Every component has:

- breathing room
- smooth curvature
- subtle elevation
- intentional spacing
- tactile animation feedback

Heavy reliance on:

- translucency
- blur layers
- shadows
- gradients
- motion depth
- dynamic lighting

---

## Screen Structure (Three Zones)

### 1. Top Navigation Area

- Dynamic status-aware spacing
- Large bold page title
- Secondary contextual information
- Optional profile avatar / quick actions

Translucent nav bar with:

- background blur
- adaptive opacity
- smooth collapse on scroll

When scrolling: large titles shrink elegantly into compact headers, blur
intensity increases slightly, elements reposition smoothly.

Spacing respects: Dynamic Island, Face ID safe areas, notch offsets, edge-to-edge layout.

### 2. Main Content Area

- modular card-based layouts
- soft grouping
- progressive information hierarchy

Cards are vertically stacked with: generous spacing, soft shadows, subtle
glass effects, floating appearance. Content never touches screen edges.

- 16–24 px side padding
- balanced white space
- dynamic responsive alignment
- elastic, physics-driven scrolling

### 3. Bottom Navigation

Floating slightly above screen edge, translucent, softly blurred, rounded at
the top edges.

Icons animate between states using scaling, glow transitions, fluid movement.

Active tabs: slightly enlarge, gain accent color, show subtle background
highlight. Inactive: monochrome, low contrast, clean and minimal.

May include: haptic responses, floating active indicators, animated morphing
transitions.

---

## Background Design

Never flat. Uses:

- layered gradients
- ambient lighting
- translucent overlays
- noise textures
- depth blur

Typical: soft white gradients, cool gray tones, deep charcoal dark mode,
subtle blue/purple ambient lighting.

Some areas: blurred glowing orbs, frosted glass layers, dynamic lighting
movement.

Dark mode is cinematic — deep blacks, soft contrast, illuminated surfaces,
glowing accents.

---

## Card Design

Cards are central. Each feels like a floating object with realistic depth.

**Shape**

- 18–30 px corner radius
- perfectly smooth curves, no harsh edges

**Depth** — multiple shadow layers:

- subtle ambient shadow
- directional soft shadow
- inner highlight reflection

**Material**

- glassmorphism blur
- semi-transparent layers
- frosted surfaces

**Border** — extremely subtle, low-opacity white/gray, soft glow in dark mode.

**Motion** — cards respond to touch with slight compression, scale reduction,
lighting changes, shadow adjustment. Spring-based, natural, physically
realistic timing.

---

## Typography System

Apple-style San Francisco, precise weight hierarchy, strong readability,
dynamic scaling.

| Style          | Use                              | Size      | Weight |
| -------------- | -------------------------------- | --------- | ------ |
| Large Titles   | dashboards, major sections       | 32–40 px  | bold   |
| Section Header | grouping content                 | 18–24 px  | semi-bold |
| Body Text      | readable content                 | 15–17 px  | regular |
| Metadata       | timestamps, statuses, captions   | 11–13 px  | regular, gray, reduced opacity |

---

## Buttons

### Primary
- pill-shaped
- strong gradient, vibrant accent color
- elevated appearance
- press: slight scale-down, shadow intensifies, glow softens
- accent palette: iOS blue, indigo, emerald, purple gradients

### Secondary
- transparent, outlined, minimal
- used for filters, dismissals, secondary actions

### Floating Action
- elevated above content, circular, glowing slightly
- blur backgrounds, motion entrance animations, haptic feedback

---

## Input Fields

- rounded corners
- soft inset shadows
- translucent surfaces

Active state: glowing outline appears, border color animates, label shifts
smoothly.

Behaviors: auto-expanding text, live validation, animated placeholders,
inline icons. Keyboard transitions feel seamless with content shifting
naturally, sticky CTAs, safe-area awareness.

---

## Icons

SF Symbols-inspired:

- thin strokes
- geometric consistency
- smooth scaling
- minimal, elegant, balanced

Animations: morphing, bounce, subtle rotations, active-state fills.

---

## Motion & Animation System

Nothing appears instantly. Everything fades, glides, scales, springs, morphs.

- **Page transitions** — layered depth movement, opacity fades, spring timing
- **Scroll effects** — parallax, sticky transitions, blur adjustments
- **Interactive motion** — taps, drags, swipes, long-presses respond immediately

### Gestures

- swipe back
- pull to refresh
- drag-to-dismiss
- bottom sheet expansion
- interactive card swiping

Animations follow finger movement in real-time.

---

## Modal & Bottom Sheets

- heavily rounded
- translucent
- physics-driven
- snap between detents
- blur background content
- feel layered above UI

Opening: upward spring movement, opacity fade, background dimming.

---

## Dashboard UI

Analytics cards, animated graphs, progress rings, quick actions, real-time
metrics. Charts use smooth curves, gradient fills, floating tooltips, soft
animations.

---

## Dark Mode

Premium, cinematic — deep charcoal backgrounds, glowing highlights, soft
gradients, elevated glass layers. Avoids harsh pure white and aggressive
contrast. The interface glows subtly in dark environments.

---

## Notifications

Floating blur toasts, smooth slide-down banners, translucent overlays. Icon
+ short text + contextual action. Dismissal is fluid and gesture-driven.

---

## Loading States

Elegant and minimal — skeleton shimmer loaders, blur placeholders, animated
pulse effects. No harsh spinners unless necessary.

---

## One-Line Summary

> A highly polished modern iOS interface featuring layered glassmorphism
> surfaces, soft shadows, translucent floating cards, fluid spring animations,
> premium typography, adaptive dark mode, dynamic lighting, gesture-driven
> interactions, blurred navigation elements, and seamless native Apple-style
> motion throughout the experience.

---

## Pharmacy routine inspection — PDF field mapping (reference)

### Part 1 — General information

| Field | UI control |
| ----- | ---------- |
| Name of facility | Single-line text |
| Region | Single-line text (or picker from region list) |
| Is there a signboard? | Yes / No |
| Does it conform to standards? | Yes / No |
| Is the facility registered? | Yes / No |
| Is the license valid? | Yes / No |
| Is the license displayed? | Yes / No |
| Is the facility located at the licensed location? | Yes / No |
| Number of visit | 1st / 2nd / 3rd |
| Inspector’s comment / recommendation | Multi-line text |

Additional PDF fields (e.g. MMDA, facility type) belong in Part 1 only if the council form version you use includes them.

---

## Implementation Notes for This Codebase

- **Font** — omit `fontFamily` on iOS to use SF Pro automatically; use
  `fontWeight` + Apple-spec `letterSpacing` (`-0.41` @ 17 pt body, `-0.43` @
  17 pt nav title, `-0.24` @ 15 pt, `-0.08` @ 13 pt).
- **iOS system colors** — `#007AFF` blue, `#34C759` green, `#FF3B30` red,
  `#FF9500` orange, label `#000`, secondaryLabel `rgba(60,60,67,0.6)`,
  tertiaryLabel `rgba(60,60,67,0.3)`, separator `rgba(60,60,67,0.29)`,
  systemGroupedBackground `#F2F2F7`.
- **Sheets** — use `presentation: 'formSheet'` with `sheetAllowedDetents`,
  `sheetGrabberVisible`, `sheetCornerRadius` registered on the **root**
  Stack (not a nested one). See `app/_layout.tsx` for `routine/index`.
- **Cards** — radius 16–22, white bg, shadow `{offset: 0/2, opacity: 0.04,
  radius: 10}` on iOS, `elevation: 1` on Android.
- **Press feedback** — `Animated.spring` to `0.97` scale on press-in,
  back to `1` on press-out, `bounciness: 6`, `speed: 30`.
- **Multi-part forms** — render as a stack of cards or a paged sheet with
  detents and progress indicator at top. Use a sticky CTA pinned to the
  keyboard safe-area.
