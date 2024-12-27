import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { SongProvider } from "./context/Song.jsx";
import { UserProvider } from "./context/User.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <SongProvider>
        <App />
      </SongProvider>
    </UserProvider>
  </StrictMode>
);
