# CodeX - [codexmedia.io](https://codexmedia.io)

![CodeX Agency](https://imgix.cosmicjs.com/c4ae19d0-080c-11f1-8409-3bb9a408734d-photo-1542744094-3a31f272c490-1770898635595.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, fully responsive company website for CodeX digital agency — built with Next.js 16 and powered by Cosmic. Showcases services, team members, client testimonials, and in-depth case studies with a stunning dark-themed design.

## Features

- 🏠 **Dynamic Homepage** — Hero section, services overview, featured case studies, testimonials, and team section
- 🛠️ **Services Pages** — Individual service detail pages with markdown content rendering
- 🏆 **Case Studies** — Detailed project showcases with results metrics and linked services
- 👥 **Team Profiles** — Team member cards with photos, bios, and LinkedIn links
- ⭐ **Testimonials** — Star-rated client testimonials with photos and service associations
- 📱 **Fully Responsive** — Beautiful on mobile, tablet, and desktop
- 🌙 **Dark Theme** — Sleek dark design with vibrant indigo accents
- ⚡ **Server-Rendered** — All pages rendered server-side for SEO and performance
- 🔗 **Deep CMS Integration** — Connected object relationships using Cosmic depth queries

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a company website with services, team members, testimonials, and case studies. Company (agency) name is CodeX, and my name as founder is Nikola Jovanovic, and designer is Veljko Jovanovic."

### Code Generation Prompt

> "Based on the content model I created, now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [React 19](https://react.dev/) — UI library
- [TypeScript](https://www.typescriptlang.org/) — Type-safe development
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [Cosmic](https://www.cosmicjs.com/docs) — Headless CMS for content management
- [react-markdown](https://github.com/remarkjs/react-markdown) — Markdown rendering

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- A [Cosmic](https://www.cosmicjs.com) account with the CodeX content model

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd codex-agency

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Cosmic credentials

# Run development server
bun dev
```

### Environment Variables

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

## Cosmic SDK Examples

```typescript
import { createBucketClient } from '@cosmicjs/sdk'

const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Fetch all services
const { objects: services } = await cosmic.objects
  .find({ type: 'services' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Fetch a single case study by slug
const { object: caseStudy } = await cosmic.objects
  .findOne({ type: 'case-studies', slug: 'brightpath-platform-redesign' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This application uses 4 Cosmic object types:

| Object Type | Slug | Description |
|---|---|---|
| 🛠️ Services | `services` | Company service offerings with descriptions, icons, and detailed content |
| 👥 Team Members | `team-members` | Team profiles with photos, bios, and social links |
| ⭐ Testimonials | `testimonials` | Client testimonials with ratings and service associations |
| 🏆 Case Studies | `case-studies` | Detailed project showcases with results and linked services |

Content is fetched server-side using the Cosmic SDK with `depth(1)` to resolve object relationships (e.g., case studies → services, testimonials → service).

## Deployment Options

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Add environment variables in the Vercel dashboard
4. Deploy

### Netlify

1. Push your code to GitHub
2. Import in [Netlify](https://netlify.com)
3. Set build command: `bun run build`
4. Set publish directory: `.next`
5. Add environment variables
6. Deploy

<!-- README_END -->