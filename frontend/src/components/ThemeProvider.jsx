import { useSelector } from "react-redux";

export default function ThemeProvider({ children }) {
  const themeState = useSelector((state) => state.theme);
  const { theme } = themeState;

  return (
    <div className={theme}>
      <div className='bg-[#BEBFC3] text-black dark:bg-black dark:text-white  min-h-screen '>
        {children}
      </div>
    </div>
  );
}
