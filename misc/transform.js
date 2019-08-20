function transformPost(post) {
  return transformRating(addMediaType(transformUrls(transformTags(post))));
}

function transformTags(post) {
  post.tags = post.tags.split(" ").filter(tag => tag !== "");
  post.tags = post.tags.filter((item, pos) => {
    return post.tags.indexOf(item) == pos;
  });

  return post;
}

function transformUrls(post) {
  const host = process.env.HOST;

  post.comments_url = host + "/comments?post_id=" + post.id;
  post.file_url =
    host + "/images?url=" + post.file_url.replace("xxx/", "xxx//");
  post.preview_url =
    host + "/images?url=" + post.preview_url.replace("xxx/", "xxx//");
  post.sample_url =
    host + "/images?url=" + post.sample_url.replace("xxx/", "xxx//");
  post.creator_url =
    "https://rule34.xxx/index.php?page=account&s=profile&id=" + post.creator_id;

  return post;
}

function addMediaType(post) {
  const isVideo =
    post.file_url.endsWith(".webm") || post.file_url.endsWith(".mp4");

  post.type = isVideo ? "video" : "image";

  return post;
}

function transformRating(post) {
  switch (post.rating) {
    case "s":
      post.rating = "Safe";
      break;
    case "q":
      post.rating = "Questionable";
      break;
    case "e":
      post.rating = "Explicit";
      break;
  }
  return post;
}

module.exports = transformPost;
