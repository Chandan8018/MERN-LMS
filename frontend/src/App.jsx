import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import Header from "./components/Header";
import FooterComp from "./components/FooterComp";
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute ";
import UpdateBook from "./pages/UpdateBook";
import css from "./App.module.css";
import { useSelector } from "react-redux";
import AddBook from "./pages/AddBook";
import JoinGuidelines from "./pages/JoinGuidelines";
import BookView from "./pages/BookView";
import ScrollToTop from "./components/ScrollToTop";
import Search from "./pages/Search";

export default function App() {
  const themeState = useSelector((state) => state.theme);
  const { theme } = themeState ?? { theme: "light" }; // prevent null pointer exception

  return (
    <div className={theme === "light" ? css.main : css.dark}>
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/sign-in' element={<Signin />} />
          <Route path='/sign-up' element={<Signup />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/guidelines' element={<JoinGuidelines />} />
          <Route path='/search' element={<Search />} />
          <Route element={<OnlyAdminPrivateRoute />}>
            <Route path='/create-post' element={<AddBook />} />
            <Route path='/update-post/:postId' element={<UpdateBook />} />
          </Route>
          <Route path='/Books' element={<Books />} />
          <Route path='/book-post/:postSlug' element={<BookView />} />
        </Routes>
        <FooterComp />
      </BrowserRouter>
    </div>
  );
}
