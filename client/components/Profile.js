import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link, Route } from "react-router-dom";
import Posts from "./Posts";
import Card from "@mui/material/Card";
import { CardContent, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import AnimatedPage from "./AnimatedPage";

const Profile = () => {
  const auth = useSelector(({ auth }) => auth);
  const posts = useSelector(({ posts }) => {
    return posts.filter((post) => post.userId === auth.id);
  });
  const [data, setData] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${auth.city}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`;
      await axios.get(url).then((response) => {
        setData(response.data);
      });
    };
    fetchData();
  }, []);

  if (!posts) {
    return null;
  }

  let today = new Date();
  let time = today.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  let hours = today.getHours();
  let month = today.getMonth();
  let day = today.getUTCDate();
  let year = today.getFullYear();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const displayGreeting = () => {
    if (hours < 11) {
      return "Good morning";
    }
    if (hours > 17) {
      return "Good evening";
    } else {
      return "Good afternoon";
    }
  };
  return (
    <div style={{ marginTop: "90px" }}>
      <AnimatedPage>
        <main className="profile">
          <header className="profileHeader">
            <i className="fa fa-bars" aria-hidden="true" />
          </header>
          <div className="profile-bg" />
          <section className="container">
            <aside className="profile-image" style={{ marginTop: "-80px" }}>
              {auth.username === "cody" || auth.username === "murphy" ? (
                <img
                  alt={`${auth.username}`}
                  src={`./photos/${auth.username}.jpeg`}
                  sx={{ width: 150, height: 150 }}
                />
              ) : (
                <Avatar
                  sx={{ bgcolor: "#37515F", width: 150, height: 150 }}
                  alt={`${auth.username}`}
                  variant="rounded"
                />
              )}
            </aside>

            <section className="profile-info">
              <h1 className="first-name">
                <div className="glitch" data-text={auth.username.toUpperCase()}>
                  {auth.username.toUpperCase()}
                </div>
              </h1>
              <h2>ABOUT</h2>
              <p>{auth.bio}</p>
            </section>
          </section>
          <section className="statistics">
            <button className="icon arrow left" />
            <button className="icon arrow right" />
            <p>
              <strong>{auth.followers}</strong> Followers
            </p>
            <p>
              <strong>{auth.following}</strong> Following
            </p>
            <p>
              <strong>{auth.likes}</strong> Likes
            </p>
            <div className="social1111">
              <i className="fa fa-facebook-square" aria-hidden="true" />
              <i className="fa fa-twitter-square" aria-hidden="true" />
              <i className="fa fa-pinterest-square" aria-hidden="true" />
              <i className="fa fa-tumblr-square" aria-hidden="true" />
            </div>
          </section>
        </main>

        <button className="icon close" />

        <div className="gallery1">
          {posts.map((post) => {
            return (
              <div className="gallery-item1" tabIndex={0}>
                <div className="example-2 card11">
                  <div className="wrapper">
                    <div
                      className="header"
                      style={{ backgroundImage: post.imageUrl }}
                    >
                      <div className="date"></div>
                      <ul className="menu-content">
                        <li>
                          <a href="#" className="fa fa-bookmark-o" />
                        </li>
                        <li>{post.location}</li>
                      </ul>
                    </div>
                    <div className="data">
                      <div className="content1">
                        <span className="author">{auth.username}</span>
                        <h1 className="title">
                          <Link to={`/posts/${post.id}`}>{post.title} </Link>
                        </h1>
                        <h4>{post.wifi}</h4>
                        <p className="text">{post.review}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="loader" />
        </div>
      </AnimatedPage>
    </div>
  );
};

export default Profile;
