const express = require("express");
const scraper = require("../misc/scraper");
const router = express.Router();

const baseUrl = "https://rule34.xxx/index.php?page=alias&s=list&search=";

router.get("/:tag", function(req, res) {
  try {
    let url = baseUrl + req.params.tag;

    scraper(
      url,
      function($) {
        let tags = $(
          'table[class="highlightable"] tr[class="even pending-tag"]'
        )
          .map(function() {
            //extract information
            let name = $(this.children[2].children[0]).text();
            let count = $(this.children[2].children[1]).text();
            count = parseInt(
              count.substring(count.indexOf("(") + 1, count.indexOf(")"))
            );

            if (name !== req.params.name)
              return {
                name: name,
                posts: count
              };
          })
          .get();

        // filter tags
        if (req.query.type) {
          tags = tags.filter(function(tag) {
            return tag.types.includes(req.query.type);
          });
        }

        if (req.query.limit && req.query.limit < tags.length) {
          tags.length = req.query.limit;
        }

        return tags;
      },
      function(tags) {
        res.json(tags);
      }
    );
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
