# Technology Display Components

Beautiful, categorized technology badges and stacks with icons for your portfolio.

## Features

- **🎨 Smart Categorization**: Automatically categorizes technologies into frameworks, languages, CMS/databases, and tools
- **🎯 Icon Mapping**: 80+ pre-configured technology icons using lucide-react
- **🌈 Color Coding**: Professional color schemes with WCAG AA compliance for light/dark modes
- **⚡ Animated**: Beautiful hover effects and stagger animations with Framer Motion
- **📱 Responsive**: Works perfectly on all screen sizes
- **♿ Accessible**: ARIA labels and semantic HTML
- **🎛️ Flexible**: Multiple variants and customization options

## Components

### TechBadge

Individual technology badge with icon and smart color coding.

```tsx
import { TechBadge } from "@/components/TechBadge";

// Basic usage
<TechBadge technology="React" />

// Compact variant
<TechBadge technology="TypeScript" variant="compact" />

// Without icon
<TechBadge technology="Next.js" showIcon={false} />

// Custom styling
<TechBadge technology="Docker" className="custom-class" />
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `technology` | `string` | required | Technology name (e.g., "React", "TypeScript") |
| `variant` | `"default" \| "compact" \| "minimal"` | `"default"` | Badge size variant |
| `showIcon` | `boolean` | `true` | Show technology icon |
| `className` | `string` | `undefined` | Additional CSS classes |
| `animated` | `boolean` | `true` | Enable hover animation |

### TechStack

Container component for displaying multiple technology badges.

```tsx
import { TechStack } from "@/components/TechStack";

const technologies = ["React", "Next.js", "TypeScript", "Tailwind CSS"];

// Basic usage
<TechStack technologies={technologies} />

// With limit and "show more" button
<TechStack technologies={technologies} limit={3} />

// Grouped by category
<TechStack technologies={technologies} grouped />

// Compact variant
<TechStack
  technologies={technologies}
  variant="compact"
  badgeVariant="compact"
/>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `technologies` | `string[]` | required | Array of technology names |
| `variant` | `"full" \| "compact" \| "minimal"` | `"full"` | Layout spacing variant |
| `limit` | `number` | `undefined` | Max badges to show (adds "+X more" button) |
| `grouped` | `boolean` | `false` | Group technologies by category |
| `className` | `string` | `undefined` | Additional CSS classes |
| `badgeVariant` | `"default" \| "compact" \| "minimal"` | `"default"` | Size of individual badges |
| `showIcons` | `boolean` | `true` | Show icons on badges |
| `animated` | `boolean` | `true` | Enable stagger animation |

## Technology Categories

Technologies are automatically categorized with unique color schemes:

### 🔷 Frameworks (Blue-Gray)
- Frontend: React, Next.js, Vue, Angular, Svelte, Nuxt, Gatsby, Remix, Astro, SolidJS
- Backend: Express, FastAPI, Django, Flask, Spring Boot, Laravel, NestJS, Hono

### 🟨 Languages (Amber)
- TypeScript, JavaScript, Python, Java, Go, Rust, C++, C#, PHP, Ruby, Swift, Kotlin

### 🟢 CMS & Databases (Teal)
- CMS: Sanity, Contentful, Strapi, WordPress
- Databases: PostgreSQL, MongoDB, MySQL, Redis, Firebase, Supabase
- Query: GraphQL, Prisma, GROQ

### ⚪ Tools & Services (Gray)
- DevOps: Docker, Kubernetes, AWS, Azure, GCP, Vercel, Netlify, Cloudflare
- Version Control: Git, GitHub, GitLab, GitHub Actions
- Styling: Tailwind CSS, Sass, CSS
- Build Tools: Vite, Webpack, Turbopack, Bun, pnpm, Yarn, npm
- Animation: Framer Motion, GSAP, Three.js
- Testing: Jest, Vitest, Cypress, Playwright, Testing Library
- Other: Stripe, PayPal, Storybook

## Utility Functions

### getTechnologyCategory

Get the category for a technology name.

```tsx
import { getTechnologyCategory } from "@/lib/technologyColors";

const category = getTechnologyCategory("React"); // "framework"
```

### getTechnologyClassName

Get the complete className string for a technology.

```tsx
import { getTechnologyClassName } from "@/lib/technologyColors";

const className = getTechnologyClassName("TypeScript");
// "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700"
```

### getTechnologyIcon

Get the lucide-react icon component for a technology.

```tsx
import { getTechnologyIcon } from "@/lib/technologyIcons";

const Icon = getTechnologyIcon("Docker"); // Container icon
```

### groupTechnologiesByCategory

Group an array of technologies by their categories.

```tsx
import { groupTechnologiesByCategory } from "@/lib/technologyColors";

const techs = ["React", "TypeScript", "PostgreSQL", "Docker"];
const grouped = groupTechnologiesByCategory(techs);
// {
//   framework: ["React"],
//   language: ["TypeScript"],
//   "cms-database": ["PostgreSQL"],
//   "tool-service": ["Docker"]
// }
```

## Usage Examples

### Project Card

```tsx
function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <TechStack
        technologies={project.technologies}
        limit={5}
        badgeVariant="compact"
      />
    </div>
  );
}
```

### Article Meta

```tsx
function ArticleMeta({ article }) {
  return (
    <div className="article-meta">
      <span>{article.readTime} min read</span>
      <TechStack
        technologies={article.tags}
        variant="minimal"
        badgeVariant="minimal"
        limit={3}
      />
    </div>
  );
}
```

### Skills Section

```tsx
function SkillsSection({ skills }) {
  return (
    <div className="skills-section">
      <h2>Technical Skills</h2>
      <TechStack
        technologies={skills}
        grouped
        badgeVariant="default"
      />
    </div>
  );
}
```

### Inline Badge

```tsx
function InlineTechMention() {
  return (
    <p>
      I built this with <TechBadge technology="Next.js" variant="compact" />
      and <TechBadge technology="TypeScript" variant="compact" />
    </p>
  );
}
```

## Adding New Technologies

### 1. Add to Category List

Edit `/lib/technologyColors.ts`:

```tsx
const TECHNOLOGY_CATEGORIES: Record<TechnologyCategory, string[]> = {
  framework: [
    // ... existing frameworks
    "your-framework",
  ],
  // ...
};
```

### 2. Add Icon Mapping

Edit `/lib/technologyIcons.tsx`:

```tsx
import { YourIcon } from "lucide-react";

export const TECHNOLOGY_ICONS: TechnologyIconMap = {
  // ... existing icons
  "your-framework": YourIcon,
};
```

### 3. Test It

```tsx
<TechBadge technology="your-framework" />
```

## Customization

### Custom Colors

Override the default color scheme by passing `className`:

```tsx
<TechBadge
  technology="React"
  className="bg-blue-500 text-white border-blue-600"
/>
```

### Custom Icons

Replace the default icon with your own:

```tsx
import { CustomIcon } from "lucide-react";

// In your component
<div className="flex items-center gap-2">
  <CustomIcon className="w-4 h-4" />
  <span>React</span>
</div>
```

### Static Variants

For SSR or contexts where animations aren't needed:

```tsx
import { StaticTechBadge, StaticTechStack } from "@/components/tech-display";

<StaticTechBadge technology="React" />
<StaticTechStack technologies={techs} />
```

## Dark Mode

All components automatically adapt to dark mode using Tailwind's `dark:` variants. The color schemes are WCAG AA compliant in both light and dark modes.

## Performance

- Icons are tree-shakeable from lucide-react
- Animations use Framer Motion with hardware acceleration
- No runtime overhead for color categorization
- Optimized bundle size

## Accessibility

- Semantic HTML elements
- ARIA labels with technology name and category
- Keyboard navigation support
- High contrast colors (WCAG AA)
- Screen reader friendly

## License

MIT - Feel free to use in your projects!
