# AI Development Rules

This document outlines the tech stack and coding conventions for this project to ensure consistency and maintainability.

## Tech Stack

*   **Framework:** React with TypeScript for building the user interface with type safety.
*   **Build Tool:** Vite is used for a fast and modern development experience and optimized production builds.
*   **Styling:** Tailwind CSS is the primary utility-first CSS framework. Custom global styles, CSS variables, and complex `clip-path` utilities are defined directly in `index.html`.
*   **State Management:** Application state is managed locally within components using React's built-in hooks (`useState`, `useCallback`, `useEffect`).
*   **Data Visualization:** Charts are rendered using `Chart.js` with the `react-chartjs-2` wrapper library for seamless integration with React.
*   **Architecture:** The project is a single-page application (SPA) with a clear separation of concerns. Core logic resides in `App.tsx`, with reusable UI elements broken into components in the `src/components` directory.

## Library Usage Rules

*   **Styling:**
    *   **ALWAYS** use Tailwind CSS for styling components.
    *   For theme colors, borders, and backgrounds, **ALWAYS** use the CSS variables defined in `index.html` (e.g., `var(--dark-bg)`, `var(--primary-yellow)`).
    *   Do not add new `.css` files. Any new global styles should be added to the `<style>` tag in `index.html`.

*   **Charts & Data Visualization:**
    *   For any new charts or modifications, **ONLY** use the `react-chartjs-2` library.
    *   Follow the existing implementation in `components/ElongationChart.tsx` as a template for chart options and styling to maintain visual consistency.

*   **State Management:**
    *   Continue using React hooks for state management. Avoid introducing complex state management libraries like Redux or MobX.
    *   Lift state up to the nearest common ancestor component when state needs to be shared.

*   **Dependencies:**
    *   Keep the project lightweight. Do not add new third-party dependencies unless there is a clear and significant benefit.