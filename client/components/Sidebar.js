import React from "react";
import { logout } from "../store";
import { Link } from "react-router-dom";

export default function ClippedDrawer() {
  return (
    <div className="navigation">
      <ul>
        <li className="list active">
          <Link to="/">
            <span className="icon">
              <ion-icon name="home-outline" />
            </span>
            <span className="title">Home</span>
          </Link>
        </li>
        <li className="list">
          <Link to="/profile">
            <span className="icon">
              <ion-icon name="lock-closed-outline" />
            </span>
            <span className="title">Profile</span>
          </Link>
        </li>
        <li className="list">
          <Link to="/map">
            <span className="icon">
              <ion-icon name="lock-closed-outline" />
            </span>
            <span className="title">Map</span>
          </Link>
        </li>
        <li className="list">
          <Link to="/streamchat">
            <span className="icon">
              <ion-icon name="call-outline" />
            </span>
            <span className="title">Chat</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
