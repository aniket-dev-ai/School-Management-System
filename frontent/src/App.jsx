import React from "react";
import ThemeToggle from "./Component/ThemeToggle";
import { useSelector } from "react-redux";
import Auth from "./Pages/Auth/Auth";

function App() {
  const theme = useSelector((state) => state.theme.theme);
  return (
    <div>
      <ThemeToggle />
      <Auth />
    </div>
  );
}

export default App;
