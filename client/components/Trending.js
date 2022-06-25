import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";
import { styled } from "@mui/material/styles";

const Trending = () => {
  const { businesses: restaurants } = useSelector(
    ({ restaurants }) => restaurants
  );
  const auth = useSelector(({ auth }) => auth);
  const Label = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(0.5),
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  }));

  if (!restaurants) {
    return null;
  }
  return (
    <>
      <h1 className="title111">BEST Restaurants </h1>

      <section className="hero-section">
        <div className="card-grid">
          {restaurants.map((restaurant, index) => (
            <Link
              to={`/trending/${restaurant.alias}`}
              className="card"
              key={index}
            >
              <div
                className="card__background"
                style={{
                  backgroundImage: `url(${restaurant.image_url})`,
                }}
              />
              <div className="card__content">
                <p className="card__category">{restaurant.name}</p>
                <h3 className="card__heading">{restaurant.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default Trending;
