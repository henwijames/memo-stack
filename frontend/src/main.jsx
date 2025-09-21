import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { Toaster } from "sonner";
import Navbar from "./components/Navbar";
import { UserProvider } from "./context/UserContext";
import { ThemeProvider } from "./components/ThemeProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <App />
        </ThemeProvider>
      </UserProvider>
      <Toaster richColors />
    </BrowserRouter>
  </StrictMode>
);
