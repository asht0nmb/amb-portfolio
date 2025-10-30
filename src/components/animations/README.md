# Fluid Scroll Transitions

This directory contains components and hooks for implementing fluid scroll transitions as part of the glass/fluid theme.

## Components

### SectionReveal
Provides smooth reveal animations for sections as they enter the viewport.

**Props:**
- `delay`: Animation delay in milliseconds
- `threshold`: Intersection observer threshold (0-1)
- `enableParallax`: Enable parallax effect
- `parallaxSpeed`: Parallax movement speed

### WaveTransition
Creates animated wave effects between sections using HTML5 Canvas.

**Props:**
- `intensity`: Wave amplitude (0-1)
- `speed`: Animation speed multiplier
- `color`: Wave color (rgba format)

### ParallaxContainer
Wraps elements to provide parallax scrolling effects.

**Props:**
- `speed`: Parallax speed (-1 to 1, negative for reverse)
- `enableFloat`: Enable floating animation
- `floatIntensity`: Float movement intensity

### StaggeredReveal
Animates multiple child elements with staggered timing.

**Props:**
- `staggerDelay`: Delay between each child animation (ms)

## Hooks

### useScrollAnimations
Core hook providing scroll-based animation utilities.

### useReducedMotion
Detects user's reduced motion preference and disables animations accordingly.

## Performance Considerations

- All animations respect `prefers-reduced-motion`
- Intersection Observer used to only animate visible elements
- Canvas animations pause when not visible
- Parallax effects use `transform` for GPU acceleration

## Usage Example

```tsx
import SectionReveal from '@/components/animations/SectionReveal';
import WaveTransition from '@/components/animations/WaveTransition';

function MyPage() {
  return (
    <div>
      <SectionReveal delay={200}>
        <h1>My Content</h1>
      </SectionReveal>
      
      <WaveTransition intensity={0.2} speed={1.5} />
      
      <SectionReveal delay={400}>
        <p>More content...</p>
      </SectionReveal>
    </div>
  );
}
```