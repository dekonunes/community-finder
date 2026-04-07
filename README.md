# Community Finder

A community-focused service directory for Sydney, Australia. Helps residents discover culturally-relevant services, events, and products from professional providers who share their language and cultural background.

## Features

- **Service Directory** — Browse professionals (GPs, dentists, lawyers, psychologists, etc.) filtered by service type and cultural community. Detailed provider profiles with contact info, location, languages spoken, and bio.
- **Community Pages** — Dedicated landing pages for each cultural community with grouped services, events, and products.
- **Events** — Discover multicultural festivals, meetups, and celebrations filtered by community.
- **Products Marketplace** — Cultural products (books, music, food, art) browsable by community and category.
- **Search** — Global search across services with multi-filter support (service, community, language, suburb).

## Tech Stack

- **Next.js 16** with React 19 and App Router
- **Tailwind CSS 4** with **shadcn/ui** components
- **TypeScript**
- Static JSON data files (communities, providers, events, products, categories)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
src/
  app/          # Pages (home, search, community, events, products, providers)
  components/   # Reusable UI (cards, filters, navigation, footer)
  lib/          # Data utilities for filtering and querying
data/           # Static JSON data files
```
