// r34-json-api

// require packages
const express = require("express");
const cors = require("cors");
const compression = require("compression");

// setup
const app = express();
process.env.PORT = process.env.PORT || 8080;
process.env.HOST = process.env.HOST || "http://localhost:" + process.env.PORT;
app.use(cors());
app.use(compression());

// require routers
const defaultRouter = require("./routing/default");
const commentRouter = require("./routing/comments");
const postRouter = require("./routing/posts");
const tagRouter = require("./routing/tags");
const imageRouter = require("./routing/images");
const artistRouter = require("./routing/artists");
const aliasRouter = require("./routing/alias");

// assign routers
app.use("/", defaultRouter);
app.use("/comments", commentRouter);
app.use("/posts", postRouter);
app.use("/tags", tagRouter);
app.use("/images", imageRouter);
app.use("/artists", artistRouter);
app.use("/alias", aliasRouter);

app.use("/c", commentRouter);
app.use("/p", postRouter);
app.use("/t", tagRouter);
app.use("/i", imageRouter);
app.use("/a", artistRouter);

// start server
app.listen(process.env.PORT, function() {
  console.log("App listening on port " + process.env.PORT + ".");
});
