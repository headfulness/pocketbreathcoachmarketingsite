---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, or applications. Generates creative, polished code that avoids generic AI aesthetics.
license: Complete terms in LICENSE.txt
---

This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic details and creative choices.

The user provides frontend requirements: a component, page, application, or interface to build. They may include context about the purpose, audience, or technical constraints.

## Design Thinking

Before coding, understand the context and commit to a BOLD aesthetic direction:

- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian, etc. There are so many flavors to choose from. Use these for inspiration but design one that is true to the aesthetic direction.
- **Constraints**: Technical requirements (framework, performance, accessibility).
- **Differentiation**: What makes this UNFORGETTABLE? What's the one thing someone will remember?

## Design Philosophy

Beautiful interfaces that confuse people are failures. Striking aesthetics must serve usability. Before and during implementation, apply these principles:

### Don't Make Me Think

Every element should be self-evident. If a user has to pause and wonder "is this clickable?", "where am I?", or "what does this mean?" — the design has failed regardless of how good it looks. Every question mark in a user's mind is cognitive load that erodes trust.

### Design for Scanning, Not Reading

Users don't read — they scan for words, shapes, and patterns that match their goal. Establish a clear visual hierarchy: what matters most should be visually dominant. Cut ruthlessly — remove happy talk, redundant labels, and instructions nobody reads. Then cut again.

### Make Affordances Visible

The relationship between an element's appearance and its behavior should be obvious. Buttons should look pressable. Links should look followable. Inputs should look fillable. Use **signifiers** — visual cues like depth, color contrast, icons, and cursor changes — so users never have to guess what's interactive.

### Respect Conventions, Break Them Intentionally

Users spend most of their time on _other_ sites. They expect logos top-left, navigation top or left, search top-right, and underlined/colored text to be clickable. Use these conventions as a foundation. Only deviate when your alternative is _clearly, obviously_ better — not just different.

### Close the Gulfs

Two gaps cause friction: the **gulf of execution** (can the user figure out how to do what they want?) and the **gulf of evaluation** (can they tell what happened?). Minimize both:

- Make the correct next action obvious (clear CTAs, logical flow, smart defaults).
- Provide immediate, visible feedback for every interaction (hover states, loading indicators, success/error messages, transitions).

### Use Natural Mapping and Constraints

Controls should relate spatially and logically to what they affect. Limit available actions at any moment to prevent errors — disable invalid options, use progressive disclosure, and guide users down the right path. The best error handling is making errors impossible.

### Errors Are Design Failures

When users make mistakes, blame the design, not the user. Distinguish between slips (wrong action, right intent) and mistakes (wrong plan entirely). Prevent both through clear labeling, confirmation on destructive actions, forgiving inputs, and easy undo. Never punish users for your design's ambiguity.

### Preserve Goodwill

Users arrive with a reservoir of patience. Every frustration — hidden information, unnecessary form fields, unclear errors, slow loads, layout shifts — drains it. Thoughtful details replenish it: smart defaults, remembered preferences, helpful empty states, graceful error recovery. Once goodwill is gone, users leave permanently.

### Navigation Is Orientation

Users must always be able to answer three questions: Where am I? What's here? Where can I go? Provide persistent navigation, clear "you are here" indicators, and logical information architecture. If people get lost, they leave.

### Accessibility Is Good Design

Designing for screen readers, keyboard navigation, proper contrast, and semantic HTML doesn't just serve users with disabilities — it improves the experience for everyone. It's a design constraint that produces better, more thoughtful interfaces.

### Delight Is the Cherry on Top

Usability is the foundation. Delight is the flourish that makes an interface memorable. It comes from thoughtful details that surprise and please users — a clever animation, a witty microcopy, a satisfying sound effect, a beautiful illustration. But delight should never come at the cost of clarity or usability. It should be the cherry on top, not the whole sundae.

**CRITICAL**: Choose a clear conceptual direction and execute it with precision. Bold maximalism and refined minimalism both work - the key is intentionality, not intensity.

Then implement working code (HTML/CSS/JS, React, Vue, etc.) that is:

- Production-grade and functional
- Visually striking and memorable
- Cohesive with a clear aesthetic point-of-view
- Meticulously refined in every detail

## Frontend Aesthetics Guidelines

Focus on:

- **Typography**: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics; unexpected, characterful font choices. Pair a distinctive display font with a refined body font.
- **Color & Theme**: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes.
- **Motion**: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions. Use scroll-triggering and hover states that surprise.
- **Spatial Composition**: Unexpected layouts. Asymmetry. Overlap. Diagonal flow. Grid-breaking elements. Generous negative space OR controlled density.
- **Backgrounds & Visual Details**: Create atmosphere and depth rather than defaulting to solid colors. Add contextual effects and textures that match the overall aesthetic. Apply creative forms like gradient meshes, noise textures, geometric patterns, layered transparencies, dramatic shadows, decorative borders, custom cursors, and grain overlays.

NEVER use generic AI-generated aesthetics like overused font families (Inter, Roboto, Arial, system fonts), cliched color schemes (particularly purple gradients on white backgrounds), predictable layouts and component patterns, and cookie-cutter design that lacks context-specific character.

Interpret creatively and make unexpected choices that feel genuinely designed for the context. No design should be the same. Vary between light and dark themes, different fonts, different aesthetics. NEVER converge on common choices (Space Grotesk, for example) across generations.

**IMPORTANT**: Match implementation complexity to the aesthetic vision. Maximalist designs need elaborate code with extensive animations and effects. Minimalist or refined designs need restraint, precision, and careful attention to spacing, typography, and subtle details. Elegance comes from executing the vision well.

Remember: Claude is capable of extraordinary creative work. Don't hold back, show what can truly be created when thinking outside the box and committing fully to a distinctive vision.
