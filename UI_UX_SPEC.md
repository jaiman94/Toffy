# Toffy: UI/UX Enhancement Specification

**Date:** January 8, 2026
**Based on:** Synthesized SafeGoa proposals adapted for pet training context

---

## 1. Design Philosophy: "Calm Companion"

The interface must act as a stabilizing force for overwhelmed pet owners. Toffy is the digital equivalent of a calm, experienced trainer sitting beside the anxious new dog parent.

**Emotional Tone:** Reassuring, Direct, Non-Judgmental.
- Avoid alarmist red unless behavior is dangerous
- Use clear, simple language (no jargon like "operant conditioning")
- Validate at every step: "Great choice!" / "That's helpful to know"

---

## 2. Color System (OKLCH)

| Role | Name | Value | Current | Action |
|------|------|-------|---------|--------|
| Primary | Toffy Orange | `#E07B39` | ✅ Keep | - |
| Background | Cream | `#FDF6F0` | ✅ Keep | - |
| Success | Fresh Green | `#008A4B` | Update from `#2E5A4C` | Brighter for celebrations |
| Warning | Amber Alert | `#D48C24` | ➕ Add | For "needs attention" states |
| Critical | Signal Red | `#D92626` | ➕ Add | For dangerous behaviors only |
| Calm | Deep Blue | `#005084` | ➕ Add | For "calm state" indicators in matrix |
| Text Primary | Ink | `#1A2026` | ➕ Add | Replace pure black |

### Implementation in `tailwind.config.js`:
```js
colors: {
  primary: '#E07B39',
  'primary-hover': '#C86A2E',
  background: '#FDF6F0',
  success: '#008A4B',
  'success-light': '#E8F5E9',
  warning: '#D48C24',
  critical: '#D92626',
  calm: '#005084',
  ink: '#1A2026',
}
```

---

## 3. Typography Scale

**Font:** Inter (already implied by system)

| Level | Size | Weight | Use Case |
|-------|------|--------|----------|
| Display | 32px | 700 | WelcomeScreen hero |
| Heading | 24px | 600 | Screen titles, Plan day headers |
| Body Large | 18px | 400 | Chat bubbles, instructions |
| Body Medium | 16px | 400 | Form labels, descriptions |
| Label | 14px | 500 | Chips, badges, timestamps |
| Caption | 12px | 400 | Helper text, progress indicators |

---

## 4. Component Patterns

### 4.1 Buttons

| Variant | Style | Use Case |
|---------|-------|----------|
| Primary | `bg-primary text-white` | Main CTAs: "Get Started", "Continue" |
| Secondary | `border-primary text-primary bg-transparent` | Alternative actions |
| Ghost | `text-gray-600 hover:bg-gray-100` | Cancel, Skip |
| Destructive | `bg-critical text-white` | Emergency help, report issue |

### 4.2 Chat Bubbles (Current: Good)

Keep existing pattern:
- `rounded-2xl rounded-bl-none` for AI
- `rounded-2xl rounded-br-none` for user
- `shadow-sm`

**Enhancement:** Add typing indicator with micro-copy:
- "Thinking..." → "Analyzing [dog name]'s behavior..."
- "Loading..." → "Building your plan..."

### 4.3 Interactive Widgets

#### SensitivityMatrix Enhancement
Current: Color gradient only (accessibility issue)

**Add Shape System:**
| Level | Shape | Color | Meaning |
|-------|-------|-------|---------|
| Calm | Circle ● | `#005084` | No reaction |
| Alert | Triangle ▲ | `#D48C24` | Notices, curious |
| Reactive | Square ■ | `#E07B39` | Barks, pulls |
| Extreme | Hexagon ⬢ | `#D92626` | Lunges, bites |

---

## 5. Motion Specifications

### Existing (Keep)
- Spring animations via Framer Motion
- Stagger effects for lists
- Fade-in-up for chat bubbles

### Add
1. **Skeleton Loaders** for GenerationScreen
   - Replace static text with animated gray blocks
   - Micro-copy: "Analyzing {dogName}'s needs..." → "Creating Day 1..."

2. **Success Celebration**
   - Existing: confetti ✅
   - Add: haptic feedback (`navigator.vibrate(200)`)
   - Add: checkmark animation (scale up with spring)

3. **Reduced Motion Support**
   ```css
   @media (prefers-reduced-motion: reduce) {
     .animate-* { animation: none !important; }
   }
   ```

---

## 6. Accessibility Checklist

- [ ] Color contrast: Ink (#1A2026) on Cream (#FDF6F0) = 12:1 ✅
- [ ] Touch targets: Minimum 44x44px (current chips may be too small)
- [ ] Focus rings: Add `ring-2 ring-offset-2 ring-primary`
- [ ] Screen reader: Add `aria-label` to icon-only buttons
- [ ] Shape + Color for sensitivity matrix (colorblind safe)

---

## 7. Progressive Disclosure Flow (Already Implemented)

Your 17-step wizard already follows best practice. Enhancements:

### Step Grouping
Show progress as phases, not individual steps:
1. **About Your Dog** (steps 1-3)
2. **Your Goals** (steps 4-5)
3. **Assessment** (steps 6-14)
4. **Your Plan** (steps 15-17)

### Validation Micro-copy
After each section:
- "Perfect, I'm getting to know [name]!"
- "Great! Now let's understand your goals."

---

## 8. Implementation Phases

### Phase 1: Quick Wins (1-2 days)
1. Update `tailwind.config.js` with new color tokens
2. Add `aria-label` to all icon buttons
3. Update success green to `#008A4B`
4. Add warning/critical/calm colors

### Phase 2: Component Polish (3-4 days)
1. Add shape system to SensitivityMatrix
2. Implement skeleton loaders in GenerationScreen
3. Add focus ring styles globally
4. Update typography scale in `index.css`

### Phase 3: Delight (2-3 days)
1. Haptic feedback on plan completion
2. Progress bar showing phase (not step count)
3. Personalized micro-copy with dog name
4. Reduced motion media query support

---

## 9. What NOT to Do (From SafeGoa Proposal)

These concepts don't apply to Toffy:
- Three-panel cockpit layout (no admin dashboard)
- Emergency SOS patterns (not life-threatening context)
- Map integrations (not location-based)
- Severity badges for incidents (you have sensitivity, not incidents)
- Official vs citizen role distinction

---

## 10. Files to Modify

| File | Changes |
|------|---------|
| `tailwind.config.js` | Add new color tokens |
| `src/index.css` | Typography variables, focus rings, reduced motion |
| `src/components/ui/SensitivityMatrix.jsx` | Add shape indicators |
| `src/screens/GenerationScreen.jsx` | Skeleton loaders, micro-copy |
| `src/screens/ChatScreen.jsx` | Typing indicator enhancement |
| `src/screens/PlanScreen.jsx` | Phase progress indicator |
