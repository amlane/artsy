const router = require("express").Router();
const jwt_decode = require("jwt-decode");

const Followers = require("./followers-model.js");

router.post("/:id", (req, res) => {
  const artist_id = req.params.id;
  const token = req.headers.authorization;
  const decoded = jwt_decode(token);
  const follower_id = decoded.subject;

  // console.log(artist_id, follower_id);
  Followers.followUser(artist_id, follower_id)
    .then(friends => {
      res.status(200).json({ friends });
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

router.delete("/:id", (req, res) => {
  const artist_id = req.params.id;
  const token = req.headers.authorization;
  const decoded = jwt_decode(token);
  const follower_id = decoded.subject;

  Followers.unfollowUser(artist_id, follower_id)
    .then(followers => {
      res.status(200).json({ followers });
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

module.exports = router;
