import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import wordsToNumbers from "words-to-numbers";
import alanBtn from "@alan-ai/alan-sdk-web";
import history from "../../history";
import NewsCards from "./components/NewsCards/NewsCards";

// import { NewsCards, Modal } from "./components";
import useStyles from "./styles";

const News = () => {
  const [activeArticle, setActiveArticle] = useState(0);
  const [newsArticles, setNewsArticles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  const classes = useStyles();

  useEffect(() => {
    alanBtn({
      key: "989a2cf1398c646eff7dd5b7d701ec872e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: ({ command, articles, number }) => {
        if (command === "homepage") {
          history.push("/landing");
        } else if (command === "map") {
          history.push("/map");
        } else if (command === "profile") {
          history.push("/profile");
        } else if (command === "night") {
          toggleTheme();
        } else if (command === "newHeadlines") {
          console.log(articles);
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === "instructions") {
          setIsOpen(true);
        } else if (command === "highlight") {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === "open") {
          const parsedNumber =
            number.length > 2
              ? wordsToNumbers(number, { fuzzy: true })
              : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > articles.length) {
            alanBtn().playText("Please try that again...");
          } else if (article) {
            window.open(article.url, "_blank");
            alanBtn().playText("Opening...");
          } else {
            alanBtn().playText("Please try that again...");
          }
        }
      },
    });
  }, []);

  return (
    <div>
      <NewsCards articles={newsArticles} />
      {/* {newsArticles.length ? (
        <div className={classes.infoContainer}>
          <div className={classes.card}>
            <Typography variant="h5" component="h2">
              Try saying: <br />
              <br />
              Open article number [4]
            </Typography>
          </div>
          <div className={classes.card}>
            <Typography variant="h5" component="h2">
              Try saying: <br />
              <br />
              Go back
            </Typography>
          </div>
        </div>
      ) : null}
      <img
        src="https://alan.app/voice/images/previews/preview.jpg"
        className={classes.alanLogo}
        alt="logo"
      />
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} /> */}
    </div>
  );
};

export default News;
