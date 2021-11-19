import "./Header.css";
import MovieFilterTwoToneIcon from "@mui/icons-material/MovieFilterTwoTone";
import { Link, useLocation } from "react-router-dom";

const headerNav = [
  { display: "Trending", path: "/" },
  { display: "Movies", path: "/movies" },
  { display: "TV Series", path: "/series" },
  { display: "Search", path: "/search" },
];

const Header = () => {
  const { pathname } = useLocation();

  const active = headerNav.findIndex((e) => e.path === pathname);


  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className="nav-logo">
          {" "}
          <MovieFilterTwoToneIcon className="nav-icon" />
          LMovie
        </Link>
        <ul className="nav-menu">
          {headerNav.map((e, idx) => (
            <li className="nav-item" key={idx}>
              <Link
                to={e.path}
                className={active === idx ? `nav-active` : `nav-link`}
              >
                {e.display}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
