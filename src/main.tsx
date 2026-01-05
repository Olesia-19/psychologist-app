import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./context/auth/AuthProvider.tsx";
import { FavoritesProvider } from "./context/favorites/FavoritesProvider.tsx";
import { ModalProvider } from "./context/modal/ModalProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ModalProvider>
        <FavoritesProvider>
          <App />
        </FavoritesProvider>
      </ModalProvider>
    </AuthProvider>
  </StrictMode>
);
