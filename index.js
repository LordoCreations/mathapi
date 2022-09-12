const cheerio = require("cheerio");
const got = require("got");

const express = require("express");
const app = express();
const port = 3000;

app.get("/", async (reque, qres) => {
  console.log("Request recieved");
  const reqstr = `
https://cemc2.math.uwaterloo.ca/contest/PSG/school/print.php?f=web&h=y&t=&ids=p${Math.floor(
    Math.random() * 2100
  )}`;

  const response = await got(reqstr, { json: false });
  const $ = cheerio.load(response.body);

  console.log($("head").html()+$(".problem").html());
  qres.send($("head").html()+$(".problem").html())
  // qres.send($(".problem").html())
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
