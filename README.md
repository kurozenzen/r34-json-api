# Rule34 Json API

This is a small web-api that implements all functionalities of the original rule34 api, but instead of xml it provides json.

The app is [hosted on heroku](https://r34-json.herokuapp.com) for simple access and usage.

## Structure

- **/posts** - provides images and videos with meta-information
- **/tags** - provides meta-information about tags
- **/alias** - returns other names of ambiguous tags
- **/images** - proxy for content on r34
- **/artists** - returns artist data. _I am not actively using it so it might not._
- **/comments** - should work. _I am not actively using it so it might not._

## /posts

Posts can be accessed with `/posts` or `/p`.

### Query parameters

- **limit** - Number of posts to get, capped at 100.
- **pid** - Specifies the page number.
- **tags** - Refine your search, seperate multiple tags with `+`. For more details on tags scroll to the bottom.
- **cid** - Change id in Unix time.
- **id** - Id of the post.

All of these are optional.

### Example

[https://r34-json.herokuapp.com/posts?tags=dark_skin+female](https://custom-r34-api.herokuapp.com/posts?tags=dark_skin+female)

which will return

```json
{
    "count": "74694",
    "posts":[ {}, {}, ... ]
}
```

Posts look like this:

```json
{
  "id":"3438787",
  "parent_id":"",

  "type":"'image' or 'video'",

  "score":"1",
  "rating":"Explicit",
  "source":"either a link or just a string",
  "tags":["dark_skin","bedroom", ...],

  "file_url":"https://...",
  "width":"4776",
  "height":"3880",

  "sample_url":"https://...",
  "sample_width":"850",
  "sample_height":"691",

  "preview_url":"https://...",
  "preview_width":"150",
  "preview_height":"121",

  "change":"1571510519",
  "md5":"548cbcbe722b677836995971a969d62f",
  "creator_id":"316656",
  "has_children":"false",
  "created_at":"Sat Oct 19 18:41:51 +0000 2019",
  "status":"active",
  "has_notes":"false",
  "has_comments":"false",
  "comments_url":"https://...",
  "creator_url":"https://...",
},
```

---

## /tags

Tags can be accessed with `/tags` or `/t`.

### Query parameters

- **type** Allows you to filter tags by type. Types include: `general`, `artist`, `character`, `copyright` and `ambiguous`.
- **name** Allows you to filter tags by name.

### Example

[https://r34-json.herokuapp.com/tags?type=general](https://custom-r34-api.herokuapp.com/tags?type=general&name=cum)

Which will return

```json
[
  {
    "name":"1girl",
    "types":["general"],
    "posts":"96854"
  },
  {
    "name":"on_top",
    "types":["general"],
    "posts":"25901"
  },
  ...
]
```

---

## /alias/:tag

Aliases can be accessed with `/alias/:tag`.

### Parameters

- **:tag** The original tag

### Example

[https://r34-json.herokuapp.com/alias/female](https://custom-r34-api.herokuapp.com/tags?type=general&name=cum)

Which will return

```json
[
  {"name":"female_fox","posts":359},
  {"name":"sheila_female_fox","posts":0}
  {"name":"cfnm","posts":1627},
  {"name":"cmnf","posts":568},
    ...
]
```

---

## /comments

Comments can be accessed with `/comments` or `/c`.

### Query parameters

- **post_id** - Allows you to get all comments of a single post.

### Example

[https://r34-json.herokuapp.com/comments?post_id=2868605](https://custom-r34-api.herokuapp.com/comments?post_id=2868605)

---

## Useful information

Tags are very powerful.

- Simple tag: `female` or `dark_skin`.
- Wildcards: `*_hair` will match `blue_hair`, `red_hair` and a bunch of other tags.
- Prefixes: `score` is the most useful, others are `source`, `width`, `height`, `user`
  - `score:>100` will match post with more than 100 likes.
  - same works for the others as well

If you want to see it in action, head over to https://kurozenzen.github.io/r34-react/.
