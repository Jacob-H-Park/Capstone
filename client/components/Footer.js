import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer style={{ marginTop: "100px" }}>
      <div>
        <div className="grid">
          <div className="column-xs-12">
            <ul className="social">
              <li>
                <Link to="/about">About us</Link>
              </li>
            </ul>
            <p className="copyright">
              © Copyright 2022 Fullstack Academy - LoopedIn
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
