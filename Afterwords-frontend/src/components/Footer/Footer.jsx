import "./Footer.scss";
import { FacebookIcon } from "../SocialIcons/SocialIcons";
import { InstagramIcon } from "../SocialIcons/SocialIcons";
import { PinterestIcon } from "../SocialIcons/SocialIcons";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer__container">
      <div className="footer__section--desktop">
        {/* <div className="footer__section footer__section--desktop-left">
          <h2 className="footer__heading">
            <Link to="/">Afterwords.</Link>
          </h2>
          <div className="footer__sections">
            <div className="footer__section footer__section-1">
              <h2 className="footer__link">
                <Link to="/">For photographers</Link>
              </h2>
              <h2 className="footer__link">
                <Link to="/">Hire talent</Link>
              </h2>
              <h2 className="footer__link">
                <Link to="/">Inspiration</Link>
              </h2>
            </div>
            <div className="footer__section footer__section-2">
              <h2 className="footer__link">
                <Link to="/">About</Link>
              </h2>
              <h2 className="footer__link">
                <Link to="/">Careers</Link>
              </h2>
              <h2 className="footer__link">
                <Link to="/">Support</Link>
              </h2>
            </div>
          </div>
        </div> */}
        <div className="footer__section footer__section--social">
          <FacebookIcon />
          <InstagramIcon />
          <PinterestIcon />
        </div>
      </div>
      <div className="footer__section footer__section--legal">
        <p className="footer__legal-item footer__legal-copyright">
          <Link to="/">© 2025 Afterwords</Link>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
