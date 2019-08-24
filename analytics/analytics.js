async function track(req, data) {
  if (req.baseUrl === "/posts") trackPosts(req, data);
}

async function trackPosts(req, posts) {
  const visitor = req.visitor;
  const tags = req.query.tags;

  if (tags === undefined) {
    visitor.event("Tag", "None").send();
  } else {
    tags.split(" ").forEach(tag => {
      visitor.event("Tag", tag).send();
    });
  }
}

module.exports.track = track;
