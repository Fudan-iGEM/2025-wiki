# YeastVerse
Our Virtual Experiment Platform
## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
### Prerequisites
You need to have Node.js and npm installed on your machine. You can download them from [https://nodejs.org/](https://nodejs.org/).
### Installing
1.  Clone the repository from GitLab:
    ```sh
    git clone https://gitlab.igem.org/2025/fudan.git
    ```
2.  Navigate to the project directory:
    ```sh
    cd fudan/model/YeastVerse
    ```
3.  Install the dependencies:
    ```sh
    npm install
    ```
## Usage
### Development
To run the development server, use the following command:
```sh
npm run dev
```
This will start a development server, and you can view the application in your browser at the address provided.
### Building for Production
To create a production build of the application, run:
```sh
npm run build
```
This will create a `dist` folder with the optimized and minified files for production.
### Previewing the Production Build
To preview the production build locally, use:
```sh
npm run preview
```
This will start a local server to serve the production files.
## Dependencies
-   [@babel/parser](https://babeljs.io/docs/en/next/babel-parser.html): A JavaScript parser used by Babel.
-   [@radix-ui/react-slot](https://www.radix-ui.com/docs/primitives/components/slot): A utility component for composing React components.
-   [class-variance-authority](https://cva.style/docs): A library for creating and managing class variants.
-   [clsx](https://github.com/lukeed/clsx): A tiny utility for constructing `className` strings conditionally.
-   [react](https://reactjs.org/): A JavaScript library for building user interfaces.
-   [react-dom](https://reactjs.org/docs/react-dom.html): The entry point to the DOM and server renderers for React.
-   [recast](https://github.com/benjamn/recast): A JavaScript syntax tree transformer, conservative pretty-printer, and automatic source map generator.
-   [tailwind-merge](https://github.com/dcastil/tailwind-merge): A utility for merging Tailwind CSS classes.
-   [three](https://threejs.org/): A 3D graphics library for JavaScript.
## Dev Dependencies
-   [@types/node](https://www.npmjs.com/package/@types/node): TypeScript definitions for Node.js.
-   [@types/react](https://www.npmjs.com/package/@types/react): TypeScript definitions for React.
-   [@types/react-dom](https://www.npmjs.com/package/@types/react-dom): TypeScript definitions for React DOM.
-   [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react): The official Vite plugin for React.
-   [autoprefixer](https://github.com/postcss/autoprefixer): A PostCSS plugin to parse CSS and add vendor prefixes to CSS rules.
-   [postcss](https://postcss.org/): A tool for transforming CSS with JavaScript.
-   [tailwindcss](https://tailwindcss.com/): A utility-first CSS framework for rapidly building custom designs.
-   [vite](https://vitejs.dev/): A fast frontend build tool.