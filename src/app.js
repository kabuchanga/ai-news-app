import React, {useState, useEffect} from "react";
import { Typography } from "@material-ui/core";
import wordsToNumbers from "words-to-numbers";
import alanBtn from "@alan-ai/alan-sdk-web";
import logo from "./images/logo.png";
import NewsCards from "./components/NewsCards/NewsCards";

import useStyles from "./styles";

const alanKey = "43232dab2a0a92afeb98bda287d03acf2e956eca572e1d8b807a3e2338fdd0dc/stage"
const App = () =>{
    const [newsArticles, setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticle] = useState(-1);
    //const [newsArticles, setNewsArticles] = useState([]);
    //const [isOpen, setIsOpen] = useState(false);

    const classes = useStyles();
    useEffect(()=>{
        alanBtn({
          key: alanKey,
          onCommand: ({ command, articles, number }) => {
            if (command === "newsHeadlines") {
              setNewsArticles(articles.articles);
              setActiveArticle(-1);
            } else if (command === "instructions") {
              //setIsOpen(true);
            } else if (command === "highlight") {
              setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
            } else if (command === "open") {
              const parsedNumber = number.length > 2 ? wordsToNumbers(number, { fuzzy: true }) : number;
              
              const article = articles[parsedNumber - 1];
              
              if (parsedNumber > articles.length) {
                console.log(articles.length);
                //alanBtn().playText("Please try that again...");
              }
              else if (article) {
                window.open(article.url, "_blank");
                //alanBtn().playText("Opening...");
              }
            } else {
              //alanBtn().playText("Please try that again...");
            }
          },
        });

    },[] )

    return(
        <div>
      <div className={classes.logoContainer}>
        {newsArticles.length ? (
          <div className={classes.infoContainer}>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Open article number [4]</Typography></div>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Go back</Typography></div>
          </div>
        ) : null}
        <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTYwcHgiIGhlaWdodD0iMTYwcHgiIHZpZXdCb3g9IjAgMCAxNjAgMTYwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA1Mi41ICg2NzQ2OSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+QWxhbiBMb2FkZXIgLyBEYXJrIC8gQmlnIC8gbG9hZGVyLWJpZy1zdGF0ZS1kYXJrLTEwPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9IkFsYW4tTG9hZGVyLS8tRGFyay0vLUJpZy0vLWxvYWRlci1iaWctc3RhdGUtZGFyay0xMCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGNpcmNsZSBpZD0iYmciIGZpbGwtb3BhY2l0eT0iMC4xIiBmaWxsPSIjMDA3OUU4IiBjeD0iODAiIGN5PSI4MCIgcj0iNzIiPjwvY2lyY2xlPgogICAgICAgIDxnIGlkPSJsb2dvIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzMi4wMDAwMDAsIDQyLjAwMDAwMCkiIGZpbGw9IiMwMDc5RTgiPgogICAgICAgICAgICA8cGF0aCBkPSJNMzkuMjgwMDAxOSwyLjk5MDkzNzAxIEw0OCwxOS43MzMzMzMzIEwzNi41NDIzODQ4LDQyIEwxMi45NTQ3ODkzLDQyIEMxMS40MDI2MjIsNDIuMDAwMjEyNyA5Ljk3OTIzNTUzLDQyLjU5OTg2NzggOS4yNjEyNTU2OSw0My45NzgzODkxIEwzMC45OTgzMzE5LDIuMjQzMjAyNzUgQzMxLjY5MjE1NjMsMC45MTEwNTk5MjggMzMuMDQ0NzExMSwwLjA1ODk3NjY2NyAzNC41MzU2MjIsMC4wMDI5NDQzNjIzMSBDMzYuNTM0NTU0MiwwLjA2Nzk4ODU3ODMgMzguMzUwNTYyMiwxLjIwNjQxMjg0IDM5LjI4MDAwMTksMi45OTA5MzcwMSBaIiBpZD0ic2hhcGUiIGZpbGwtb3BhY2l0eT0iMC41Ij48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0zNi41NDE2OTM4LDQyLjAwMTMwOSBMNDcuOTEyOTE2NCw0MiBDNDkuNDYxOTEyMyw0MS45OTk3OTA0IDUwLjg4MzE3MzUsNDIuODQ5OTU3IDUxLjYwMjk2OTIsNDQuMjA3MzA3IEw1OS45NjM4MDI5LDU5Ljk3MzY5NTEgQzYwLjY3NjY4OCw2MS4zMTgwMTM0IDYwLjE1MzM3MDMsNjIuOTc5NzAyOCA1OC43OTQ5NDAyLDYzLjY4NTE4MjIgQzU4LjM5Njc2NzUsNjMuODkxOTY3IDU3Ljk1MzgxODYsNjQgNTcuNTA0MTQ3Nyw2NCBMMy40MTU3Mjk5LDY0IEMxLjg4MTYwNTU5LDY0IDAuNjM3OTUyMTE5LDYyLjc1NDE4MzcgMC42Mzc5NTIxMTksNjEuMjE3MzkxMyBDMC42Mzc5NTIxMTksNjAuNzY5MTg5NSAwLjc0NjAzMTIzNyw2MC4zMjc2MiAwLjk1Mjk5NDIxMyw1OS45MzAyNTExIEw5LjI2MTI1NTY5LDQzLjk3ODM4OTEgQzkuOTc5MjM1NTMsNDIuNTk5ODY3OCAxMS40MDI2MjIsNDIuMDAwMjEyNyAxMi45NTQ3ODkzLDQyIEwzNi41NDIzODQ4LDQyIEwzNi41NDE2OTM4LDQyLjAwMTMwOSBaIiBpZD0iUGF0aCIgZmlsbC1vcGFjaXR5PSIwLjMiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTU2LjcxOTk5ODEsMi45OTA5MzcwMSBDNTcuNjQ5NDM3OCwxLjIwNjQxMjg0IDU5LjQ2NTQ0NTgsMC4wNjc5ODg1NzgzIDYxLjQ2NDM3OCwwLjAwMjk0NDM2MjMxIEM2MS40MTIyNjg0LDAuMDAwOTg1OTUxMzgzIDYxLjM1OTk4OTksLTEuMDQ5NDAyODFlLTE0IDYxLjMwNzU2NDYsLTEuMDUwMzY3NTJlLTE0IEw2MS44ODg4ODg5LC0xLjQyMTA4NTQ3ZS0xNCBMNjEuNjQ1NDY5NSwtMS4wNTM5MzgxOWUtMTQgQzYxLjU4NDk1MjUsLTEuMDQyMDg4MzllLTE0IDYxLjUyNDU4MjMsMC4wMDA5ODUzNDUyNzEgNjEuNDY0Mzc4LDAuMDAyOTQ0MzYyMzEgQzYyLjk1NTI4ODksMC4wNTg5NzY2NjcgNjQuMzA3ODQzNywwLjkxMTA1OTkyOCA2NS4wMDE2NjgxLDIuMjQzMjAyNzUgTDk1LjA0NzAwNTgsNTkuOTMwMjUxMSBDOTUuMjUzOTY4OCw2MC4zMjc2MiA5NS4zNjIwNDc5LDYwLjc2OTE4OTUgOTUuMzYyMDQ3OSw2MS4yMTczOTEzIEM5NS4zNjIwNDc5LDYyLjc1NDE4MzcgOTQuMTE4Mzk0NCw2NCA5Mi41ODQyNzAxLDY0IEw3My41ODEzMjQzLDY0IEM3Mi4wMjg5NTIyLDY0IDcwLjYwNTI5NTQsNjMuMTM1NTAwNCA2OS44ODcyMjA4LDYxLjc1Njc5NzIgTDQ4LDE5LjczMzMzMzMgTDU2LjcxOTk5ODEsMi45OTA5MzcwMSBaIiBpZD0ic2hhcGUiIGZpbGwtb3BhY2l0eT0iMC41Ij48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik02MS4zMDc1NjQ2LC0xLjA1MDM2NzUyZS0xNCBDNjEuMzU5OTg5OSwtMS4wNDk0MDI4MWUtMTQgNjEuNDEyMjY4NCwwLjAwMDk4NTk1MTM4MyA2MS40NjQzNzgsMC4wMDI5NDQzNjIzMSBDNTkuNDY1NDQ1OCwwLjA2Nzk4ODU3ODMgNTcuNjQ5NDM3OCwxLjIwNjQxMjg0IDU2LjcxOTk5ODEsMi45OTA5MzcwMSBMNDgsMTkuNzMzMzMzMyBMMzkuMjgwMDAxOSwyLjk5MDkzNzAxIEMzOC4zMjI1NjkyLDEuMTUyNjY2MTIgMzYuNDI0MzYsLTEuMDE0NjgyMTllLTE0IDM0LjM1NDUzMDUsLTEuNDIxMDg1NDdlLTE0IEw2MS4zMDc1NjQ2LC0xLjA1MDM2NzUyZS0xNCBaIiBpZD0ic2hhcGUiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==" className={classes.alanLogo} alt="logo" />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
      {/*<Modal isOpen={isOpen} setIsOpen={setIsOpen} /> --> */}
      {!newsArticles.length ? (
        <div className={classes.footer}>
          <Typography variant="body1" component="h2">
            Created by
            <a className={classes.link} href="https://www.linkedin.com/in/kabuchanga-eric-2916ba1b/"> Eric Kabuchanga</a> -
            <a className={classes.link} href="https://www.youtube.com/channel/UCSyRHZdl9WKdrq-YQIs5nkw"> Geospatial Data Scientist</a>
          </Typography>
          <img className={classes.image} src={logo} height="100px" alt="KEGeoS Solutions Ltd" />
        </div>
      ) : null}
    </div>
    )
}

export default App