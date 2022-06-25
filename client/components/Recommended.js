import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Recommended = () => {
  return (
    <>
      <div id="slider">
        <div className="slides">
          <div className="slider">
            <div className="legend" />
            <div className="content">
              <div className="content-txt">
                <a href="https://ny.eater.com/maps/best-bagels-nyc">
                  <h1>21 Iconic Bagels in NYC</h1>
                  <h2>
                    Where to find exemplary versions of NYC’s unofficial
                    favorite food
                  </h2>
                </a>
              </div>
            </div>
            <div className="image">
              <img src="https://images.pexels.com/photos/3957499/pexels-photo-3957499.jpeg?auto=compress&cs=tinysrgb&w=1600" />
            </div>
          </div>
          <div className="slider">
            <div className="legend" />
            <div className="content">
              <div className="content-txt">
                <a href="https://ny.eater.com/maps/best-rooftops-restaurants-bars-nyc">
                  <h1>13 Sun-Soaked Rooftops for Eating and Drinking in NYC</h1>
                  <h2>The best spots for making the most of rooftop season</h2>
                </a>
              </div>
            </div>
            <div className="image">
              <img src="https://i2.wp.com/www.architect-us.com/blog/wp-content/uploads/2018/05/banner2.jpg?fit=1680%2C1050&ssl=1" />
            </div>
          </div>
          <div className="slider">
            <div className="legend" />
            <div className="content">
              <div className="content-txt">
                <a href="https://ny.eater.com/maps/best-new-ice-cream-shops-new-york-city">
                  <h1>18 Essential Ice Cream Shops in NYC</h1>
                  <h2>Here’s where to go to find the city’s top scoops</h2>{" "}
                </a>
              </div>
            </div>
            <div className="image">
              <img src="https://images.pexels.com/photos/10175400/pexels-photo-10175400.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
            </div>
          </div>
          <div className="slider">
            <div className="legend" />
            <div className="content">
              <div className="content-txt">
                <a href="https://ny.eater.com/maps/best-breakfast-nyc">
                  <h1>24 Great Breakfast Options in Manhattan</h1>
                  <h2>
                    Settle in with fluffy pancakes and Japanese breakfast sets
                    or grab breakfast burritos and egg sandwiches to go
                  </h2>
                </a>
              </div>
            </div>
            <div className="image">
              <img src="https://images.pexels.com/photos/3850925/pexels-photo-3850925.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
            </div>
          </div>
        </div>
        <div className="switch">
          <ul>
            <li>
              <div className="on" />
            </li>
            <li />
            <li />
            <li />
          </ul>
        </div>
      </div>
    </>
  );
};

export default Recommended;
