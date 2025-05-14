# Trading Platform Frontend

This is a Next.js application called TradeStart. It provides a foundation for a stock trading dashboard application.

## Getting Started

1.  **Install Dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

2.  **Configure Firebase:**

    - Copy the `.env.local.example` file to a new file named `.env.local`.
    - Open `.env.local` and replace the placeholder values (`YOUR_API_KEY`, `YOUR_AUTH_DOMAIN`, etc.) with your actual Firebase project credentials. You can find these in your Firebase project settings under Project settings > General > Your apps > Web app > SDK setup and configuration > Config.
    - If you plan to use Google AI features via Genkit, also add your `GOOGLE_GENAI_API_KEY` to the `.env.local` file.

3.  **Run the Development Server:**

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

    This will start the Next.js development server, typically on `http://localhost:9002`.

4.  **Explore the Code:**
    - The main page component is located at `src/app/page.tsx`.
    - Authentication logic is handled in `src/context/auth-context.tsx`.
    - UI components leverage ShadCN UI and are located in `src/components/`.
    - Firebase configuration is in `src/lib/firebase/config.ts`.

## Features

- **Next.js App Router:** Utilizes the latest Next.js features for routing and server components.
- **TypeScript:** Enhances code quality and maintainability.
- **Tailwind CSS & ShadCN UI:** Provides a modern and customizable UI foundation.
- **Firebase Authentication:** Includes pre-built login and signup pages using Firebase Email/Password authentication.
- **Basic Dashboard Layout:** Includes Header, Footer, and main content area.
- **Protected Routes:** Middleware ensures users are authenticated to access certain pages (e.g., the main dashboard).
- **Environment Variable Setup:** Clear instructions for setting up necessary Firebase credentials.
- **(Optional) Genkit Integration:** Ready for integrating Google AI features using Genkit (requires `GOOGLE_GENAI_API_KEY`).

## Available Scripts

- `dev`: Starts the Next.js development server with Turbopack.
- `genkit:dev`: Starts the Genkit development server (for AI flows).
- `genkit:watch`: Starts the Genkit development server with file watching.
- `build`: Builds the application for production.
- `start`: Starts the production server.
- `lint`: Runs ESLint for code linting.
- `typecheck`: Runs TypeScript type checking.

## Important Notes

- **Security:** Ensure your `.env.local` file is added to your `.gitignore` to prevent committing sensitive Firebase credentials to version control.
- **Firebase Setup:** You need an active Firebase project to use the authentication features.
- **Customization:** The application is designed as a starter. Feel free to modify components, styling, and add new features as needed.
