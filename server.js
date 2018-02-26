"use strict";

const express = require("express");

const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  const { method, url } = req;
  console.log({ method, url });
  next();
});
app.use(express.static("public"));

const GoogleImages = require("google-images");
const client = new GoogleImages(process.env.CSE_ID, process.env.API_KEY);

const termArr = [];
app.get("/recent", (req, res) => {
  res.json(termArr);
});

app.get("/search/:term", (req, res) => {
  const { term } = req.params;
  const pageNum = +req.query.offset;
  console.log({ term, pageNum });
  const dt = new Date();
  termArr.unshift({ "Search term": term, "Time of search": dt.toString() });
  if (termArr.length > 15) {
    termArr.pop();
  }
  client
    .search(term, { page: (pageNum - 1) * 10 + 1 })
    .then(images => {
      const cleanArr = images.map(({ url, description, parentPage }) => ({
        url,
        description,
        parentPage
      }));
      res.json(cleanArr);
    })
    .catch(error => {
      console.error(error);
      res.send(error.message);
    });
});

app.listen(port, () => {
  console.log(`Node.js listening on ${port}...`);
});
