const express = require("express");
const defaultRouter = express.Router();

defaultRouter.get("/", function(req, res) {
  res.json({
    message:
      "This is a wrapper for the rule34 api. For more info see https://github.com/kurozenzen/r34-json-api#readme",
    posts: process.env.HOST + "/posts",
    comments: process.env.HOST + "/comments",
    tags: process.env.HOST + "/tags",
    images: process.env.HOST + "/images"
  });
});

module.exports = defaultRouter;
