# Professional Registration Form

This is a modern, minimal React application for a professional registration form, built with Vite, TypeScript, and Tailwind CSS.

## Features

- **React 18 + TypeScript**: Fast, type-safe, and modern frontend stack.
- **Tailwind CSS**: Utility-first CSS for rapid UI development.
- **Form Validation**: Real-time validation for all fields (name, email, phone, location, date, and time slot).
- **Responsive Design**: Works well on both desktop and mobile devices.
- **Lucide Icons**: Clean, open-source icon set for a professional look.
- **No Backend**: All logic is client-side; form submission is simulated.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. **Clone the repository:**

   ```sh
   git clone <your-repo-url>
   cd <project-directory>
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Start the development server:**

   ```sh
   npm run dev
   ```

4. **Open your browser and visit:**
   ```
   http://localhost:5173
   ```

## Project Structure

.
├── src/
│ ├── App.tsx # Main registration form component
│ ├── main.tsx # App entry point
│ └── index.css # Tailwind and custom styles
├── index.html # HTML template
├── package.json # Project metadata and scripts
├── tailwind.config.js # Tailwind CSS config
├── postcss.config.js # PostCSS config
├── vite.config.ts # Vite config
└── tsconfig\*.json # TypeScript configs

## Customization

- **Styling:** Modify `src/index.css` or Tailwind config for custom styles.
- **Form Fields:** Edit `src/App.tsx` to add or remove fields as needed.

## License

This project is open source and available under the [MIT License](LICENSE).

---

_Built with ❤️ using React, Vite, and Tailwind CSS._
