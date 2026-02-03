import { ViteReactSSG } from "vite-react-ssg";
import { routes } from "./App";
import "./index.css";

/**
 * Entry point pentru SSG + GitHub Pages
 * - NU mai folosim ReactDOM.createRoot
 * - NU mai folosim BrowserRouter
 * - rutele sunt generate la build (HTML real)
 */

export const createRoot = ViteReactSSG({
  routes,
  basename: import.meta.env.BASE_URL,
});
