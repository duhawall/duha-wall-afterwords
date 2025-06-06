import "./Footer.scss";
import { FacebookIcon } from "../SocialIcons/SocialIcons";
import { InstagramIcon } from "../SocialIcons/SocialIcons";
import { PinterestIcon } from "../SocialIcons/SocialIcons";
import { Link } from "react-router-dom";

function Footer() {
  const optionStatus = location.pathname;

  return (
    <footer className={`footer__container ${optionStatus === "" ? "footer__container--home" : ""}`}>
      <div className="footer__section footer__section--social">
        <FacebookIcon />
        <InstagramIcon />
        <PinterestIcon />
      </div>
      <div className="footer__section footer__section--legal">
        <Link to="/">© 2025 Afterwords</Link>
      </div>
    </footer>
  );
}

export default Footer;
