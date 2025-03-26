import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../Redux/Slice/ThemeSlice";

const ThemeToggle = () => {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className={`px-4 py-2  fixed text-white rounded ${
        theme === "dark" ? "bg-blue-600 " : "bg-blue-900 "
      }`}
    >
      Toggle Theme (Current: {theme})
    </button>
  );
};

export default ThemeToggle;
