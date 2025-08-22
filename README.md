# Jeff Dickerson - Personal Portfolio & Blog

This is the codebase for my personal portfolio website and blog, accessible at [jeffdickerson.me](https://jeffdickerson.me/) (replace with your actual URL if different).

It showcases my projects, case studies, and articles related to web development and technology.

## Tech Stack

This project is built with a modern, performant, and developer-friendly stack:

*   **Framework:** [React](https://reactjs.org/) (v18) with [TypeScript](https://www.typescriptlang.org/)
*   **Build Tool:** [Vite](https://vitejs.dev/)
*   **UI Components:** [shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components that you can copy and paste into your apps.
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework.
*   **Routing:** [React Router DOM](https://reactrouter.com/)
*   **State Management (for server state):** [TanStack Query (React Query)](https://tanstack.com/query/latest)
*   **Animations:** [Framer Motion](https://www.framer.com/motion/) (if used extensively, otherwise optional)
*   **Linting/Formatting:** ESLint (configuration pending standard setup)

## Project Structure

The project follows a standard structure for Vite + React applications:

```
.
├── public/             # Static assets
│   ├── components/     # Reusable UI components (both general and shadcn/ui based)
│   │   └── ui/         # shadcn/ui components
│   ├── data/           # Mock data or data fetching utilities
│   ├── hooks/          # Custom React Hooks
│   ├── lib/            # Utility functions, configurations (e.g., Tailwind)
│   ├── pages/          # Page components corresponding to routes
│   ├── App.tsx         # Main application component with routing setup
│   ├── main.tsx        # Entry point of the application
│   └── index.css       # Global styles and Tailwind base/components/utilities
├── .eslintrc.js        # ESLint configuration (if added)
├── .gitignore
├── index.html          # Main HTML entry point
├── package.json
├── postcss.config.js   # PostCSS configuration (for Tailwind)
├── tailwind.config.ts  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

## Getting Started

### Prerequisites

*   [Node.js](https://nodejs.org/) (LTS version recommended - e.g., v18 or v20)
*   [npm](https://www.npmjs.com/) (comes with Node.js) or [Yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/) or [Bun](https://bun.sh/)

This project uses `npm` in the scripts below, but you can adapt them to your preferred package manager.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <YOUR_REPOSITORY_URL>
    cd <YOUR_PROJECT_DIRECTORY>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    (Or `yarn install`, `pnpm install`, `bun install`)

### Development

To start the development server:

```bash
npm run dev
```

This will start the Vite development server, typically at `http://localhost:8080` (or another port if 8080 is busy). The server features Hot Module Replacement (HMR) for a fast development experience.

### Available Scripts

*   `npm run dev`: Starts the development server.
*   `npm run build`: Builds the application for production in the `dist/` folder.
*   `npm run build:dev`: Builds the application in development mode (less optimization, more debug info).
*   `npm run lint`: Lints the codebase using ESLint (ensure ESLint is configured).
*   `npm run preview`: Serves the production build locally from the `dist/` folder to preview it.

## Deployment

1.  **Build the project:**
    ```bash
    npm run build
    ```
2.  Deploy the contents of the `dist/` folder to your preferred hosting provider (e.g., Netlify, Vercel, GitHub Pages, AWS S3/CloudFront).

Many hosting providers can also be configured to build and deploy directly from your Git repository.

## Contributing

If you'd like to contribute or have suggestions, please feel free to open an issue or submit a pull request.

(If this is a personal project not open for public contributions, you can remove or modify this section.)

## License

This project is licensed under the MIT License (or specify your chosen license).
