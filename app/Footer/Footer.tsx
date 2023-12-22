import React from 'react'
import "./footer.css";
function Footer() {
  return (
    <div>
      <footer>
        <div className="row footer__row">
            <a href="#" id="footer__anchor">
                <figure className="footer__logo">
                    M2L
                </figure>
                <span className="footer__logo--popper">
                    Top
                    <i className="fas fa-arrow-up"></i>
                </span>
            </a>
            <div className="footer__copyright">Copyright © 2023 All rights reserved </div>
        </div>
    </footer>
    </div>
  );
};

export default Footer;
