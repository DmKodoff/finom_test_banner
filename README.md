# Finom Test Banner

Test project for a banner modal for business loans from Finom.

## Description

React application demonstrating an interactive banner as a modal window with a business loan offer. The banner includes a service description, list of benefits, and buttons for applying and getting more information.

## Tech Stack

- **React 18** — UI library
- **TypeScript** — type safety
- **Vite** — build tool and dev server
- **TailwindCSS** — styling
- **Feature-Sliced Design** — project architecture

## Project Structure

```
src/
├── app/              # Application initialization
├── pages/            # Application pages
│   └── main/         # Main page
├── widgets/          # Widgets (composite components)
│   └── banner/       # Banner widget
├── shared/           # Reusable components and utilities
│   ├── ui/           # UI components (Button, Modal, Text, Title)
│   └── lib/          # Utilities
└── index.css         # Global styles
```

## Installation and Setup

### Requirements

- Node.js 18+
- npm

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Built files will be in the `dist/` folder

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## Deployment

The project is automatically deployed to GitHub Pages when pushing to the `main` branch via GitHub Actions.

You can also deploy manually:

```bash
npm run deploy
```

## Main Components

### Banner

Main banner component (`src/widgets/banner/ui/Banner.tsx`) displayed as a modal window with:

- Service title and description
- List of benefits with icons
- "Apply Now" button with loading state
- "More Information" button with link to Finom website
- Background image

### Modal

Reusable modal component (`src/shared/ui/Modal/Modal.tsx`) with support for:

- Open/close functionality
- Click on overlay to close
- Close on Escape key
- Focus management and accessibility

### Button

Universal button component (`src/shared/ui/Button/Button.tsx`) with variants:

- `primary` — primary button
- `ghost` — secondary button
- Support for loading and disabled states
- Support for links (href)

## Features

- ✅ Responsive design (mobile-first)
- ✅ Accessibility (a11y)
- ✅ TypeScript for type safety
- ✅ Feature-Sliced Design architecture
- ✅ TailwindCSS for styling
- ✅ SVG icons via vite-plugin-svgr
- ✅ Error Boundary for error handling
- ✅ CI/CD via GitHub Actions

## Configuration

### Path Aliases

The project uses aliases for imports:

- `@/` → `src/`
- `@/app/` → `src/app/`
- `@/widgets/` → `src/widgets/`
- `@/shared/` → `src/shared/`
- `@/pages/` → `src/pages/`

### CSS Variables

Colors are configured via CSS variables in `src/index.css`:

- `--bg-app` — application background
- `--bg-content` — content background
- `--text-default` — default text color
- `--text-light` — light text color
- `--text-success` — success color
- `--btn-primary-bg` — primary button background
- `--btn-primary-color` — primary button text color
- `--border-modal` — modal border color

## License

Private project
