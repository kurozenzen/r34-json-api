async function track(req) {
  if (req.baseUrl === "/posts") trackPosts(req);
}

async function trackPosts(req) {
  const visitor = req.visitor;
  const tags = req.query.tags;

  if (tags === undefined) {
    visitor.event("Tag", "Search", "None").send();
  } else {
    tags
      .replace(" ", "+")
      .split("+")
      .forEach(tag => {
        visitor.event("Tag", "Search", tag).send();
      });
  }
}

module.exports.track = track;
