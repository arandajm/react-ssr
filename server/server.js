import express from "express";
import fs from "fs";
import path from "path";
// To render server side
import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "../src/App";

const PORT = 3000;
// create express app
const app = express();

app.use("^/$", (req, res, next) => {
  // read index.html builded
  fs.readFile(path.resolve("./build/index.html"), "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Some error happended");
    }
    // replace the mounting point and return our App into response
    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${ReactDOMServer.renderToString(<App />)}</div>`
      )
    );
  });
});
// Server static files with static express middleware
app.use(express.static(path.resolve(__dirname, "..", "build")));

// Launch our express app
app.listen(PORT, () => {
  console.log(`App launched on ${PORT}`);
});
