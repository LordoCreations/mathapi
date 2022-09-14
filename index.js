require("dotenv").config();

const cheerio = require("cheerio");

const got = require("got");
const cors = require("cors");

const express = require("express");
const app = express();
const port = 8000;

app.use(cors({ origin: process.env.REMOTE_CLIENT_APP, credentials: true }));

const heading = `<head><style type="text/css" media="all"> body{font-family: MathJax_MainRegular; font-size: 14px; /***font-weight: 300; color: #414141;***/ line-height: 1.3; letter-spacing: 0.5px; margin: 0 auto; width: 600px; background: white; zoom: 1;}table{page-break-after: auto}tr{page-break-inside: avoid; page-break-after: auto}td{page-break-inside: avoid; page-break-after: auto}div{page-break-inside: avoid; page-break-after: auto}.problem{page-break-inside: avoid; page-break-after: auto}</style> <script type="text/x-mathjax-config"> MathJax.Hub.Config({tex2jax:{inlineMath: [ ['$','$'], ["\\(","\\)"]], displayMath: [ ['$$','$$'], ["\\[","\\]"]], processEscapes: true}});</script> <script type="text/javascript" async src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS_SVG"></script></head>`

app.get("/", async (reque, qres) => {
  console.log("Request recieved");
  const reqstr = `
https://cemc2.math.uwaterloo.ca/contest/PSG/school/print.php?f=web&h=y&t=&ids=p${Math.floor(
    Math.random() * 2100
  )}`;

  const response = await got(reqstr, { json: false });
  const $ = cheerio.load(response.body);
  $('title').remove();
  let parsed = $(heading)+$(".problem").html()

  const $$ = cheerio.load(parsed);

        
  // console.log($$.html())
  // console.log($("head").html()+$(".problem").html());
  qres.send($$.html())
  // qres.send($(".problem").html())
});

app.get("/p", async (reque, qres) => {
  console.log("Request recieved");
  const reqstr = `
https://cemc2.math.uwaterloo.ca/contest/PSG/school/print.php?f=web&h=y&t=&ids=p${Math.floor(
    Math.random() * 2100
  )}`;

  const response = await got(reqstr, { json: false });
  const $ = cheerio.load(response.body);
  $('title').remove();
  let parsed = $(".problem").html()

  const $$ = cheerio.load(parsed);

        
  // console.log($$.html())
  // console.log($("head").html()+$(".problem").html());
  qres.send($$.html())
  // qres.send($(".problem").html())
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
