const express = require("express");
const https = require("https");
const imageRouter = express.Router();

const mediaHeaders = [
  "connection",
  "content-range",
  "accept-ranges",
  "content-length",
];

imageRouter.get("/", function (req, res) {
  if (!req.query.url) {
    res.sendStatus(404);
  }

  const request = https.get(
    req.query.url,
    {
      headers: mediaHeaders.reduce((res, headername) => {
        if (headername && req.headers[headername]) {
          res[headername] = req.headers[headername];
        }
        return res;
      }, {}),
    },
    function (response) {
      Object.entries(response.headers).forEach(function (header) {
        if (header[0] && header[1] && mediaHeaders.includes(header[0])) {
          res.setHeader(header[0], header[1]);
        }
      });

      res.setHeader("Content-Type", response.headers["content-type"]);
      res.setHeader("Cache-Control", "max-age=31557600");
      response.pipe(res);
    }
  );

  request.on("error", function (e) {
    console.error(e);
  });
});

module.exports = imageRouter;
