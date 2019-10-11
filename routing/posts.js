const express = require("express");
const scraper = require("../misc/scraper");
const transformPost = require("../misc/transform");
const track = require("../analytics/analytics").track;
const postRouter = express.Router();

const baseUrl = "https://rule34.xxx/index.php?page=dapi&s=post&q=index";

postRouter.get("/", function(req, res) {
  try {
    scraper(getUrl(req), toPosts, function(posts) {
      res.json(posts);
      track(req, posts);
    });
  } catch (err) {
    console.log(err);
  }
});

function toPosts($) {
  return {
    count: $("posts")
      .map(function() {
        return $(this).attr("count");
      })
      .get()[0],
    posts: $("post")
      .map(function() {
        const result = transformPost(this.attribs);
        return result;
      })
      .get()
  };
}

function getUrl(req) {
  let url = baseUrl;

  if (req.query.limit) url += "&limit=" + req.query.limit;
  if (req.query.pid) url += "&pid=" + req.query.pid;
  if (req.query.tags) url += "&tags=" + req.query.tags;
  if (req.query.cid) url += "&cid=" + req.query.cid;
  if (req.query.id) url += "&id=" + req.query.id;
  if (req.query.deleted) url += "&deleted=" + req.query.deleted;
  if (req.query.last_id) url += "&last_id=" + req.query.last_id;

  return url;
}

module.exports = postRouter;
