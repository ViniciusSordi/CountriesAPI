import React from "react";
import "../Css/header.css";
import iconmoon from "../icons/darkmode.svg";
import { Link } from "react-router-dom";


const Header = () => {

  const theme = window.localStorage.getItem("theme");
  const [dark, setDark] = React.useState(theme === 'dark' ? true : false);

  React.useEffect(() => {
    if (dark) {
      document.body.classList.add("dark");
      window.localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      window.localStorage.setItem("theme", "light");
    }
  }, [dark])

  function toggleTheme() {
    setDark(!dark);
  }

  return (
    <header>
      <div className="header-container container">
        <Link to="/CountriesAPI">
          <h1>Where in the world?</h1>
        </Link>
        <div className="theme-container" onClick={toggleTheme}>
          <img src={iconmoon} alt="dark mode" />
          <span>Dark Mode</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
