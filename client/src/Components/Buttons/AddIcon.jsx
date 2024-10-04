// AddIcon Component: Renders an add icon that changes color based on dark mode state.
// 
// Key Features:
// - Uses Redux state to determine whether dark mode is active.
// - Changes the fill color of the icon based on the dark mode state.
// - Includes an onClick handler to trigger actions when the icon is clicked.

import { useSelector } from "react-redux";

const AddIcon = ({ onClick }) => {
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  return (
    <svg
      onClick={onClick}
      className="cursor-pointer w-[20px]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
    >
      <path
        fill={darkMode ? "white" : "#B81D33"}
        d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"
      />
    </svg>
  );
};

export default AddIcon;
