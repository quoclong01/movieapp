import MovieFilterTwoToneIcon from "@mui/icons-material/MovieFilterTwoTone";
import { Link } from "react-router-dom";
import bg from "../../assets/images/footer-bg.jpg";
import './Footer.css'
const Footer = () => {
  return (
    <footer className="footer" style={{ backgroundImage: `url(${bg})` }}>
      <div className="container">
        <div className="footer-main">
          <div className="footer-logo">
            <MovieFilterTwoToneIcon className="footer-icon" />
            <Link to="/" className="footer-link">LMovie</Link>
          </div>
          <div className="footer-menus">
            <div className="footer-menu">
              <Link to="/">Home</Link>
              <Link to="/">Contact us</Link>
              <Link to="/">Term of services</Link>
              <Link to="/">About us</Link>
            </div>
            <div className="footer-menu">
              <Link to="/">Live</Link>
              <Link to="/">FAQ</Link>
              <Link to="/">Premium</Link>
              <Link to="/">Pravacy policy</Link>
            </div>
            <div className="footer-menu">
              <Link to="/">You must watch</Link>
              <Link to="/">Recent release</Link>
              <Link to="/">Top IMDB</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
