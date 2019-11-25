const router = require("express").Router();
const jwt_decode = require("jwt-decode");

const Comments = require("./comments-model");

// ---------------------- GET comment by ID ---------------------- //

router.get("/:id", (req, res) => {
  const id = req.params.id;

  Comments.getCommentById(id)
    .then(comment => {
      res.status(200).json({ comment });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// ------------------ GET Comments by Photo ID ------------------- //

router.get("/photo/:id", (req, res) => {
  const id = req.params.id;

  Comments.getCommentsByPhotoId(id)
    .then(comments => {
      res.status(200).json({ comments });
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

// ------------------ GET Comments by User ID ------------------- //

router.get("/user/:id", (req, res) => {
  const id = req.params.id;

  Comments.getCommentByUserId(id)
    .then(comments => {
      res.status(200).json({ comments });
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

// ------------------ POST comment by photo ID ------------------ //

router.post("/:id", (req, res) => {
  let comment = req.body;
  const token = req.headers.authorization;
  const decoded = jwt_decode(token);
  comment.photo_id = req.params.id;
  comment.user_id = decoded.subject;

  Comments.addComment(comment)
    .then(newComment => {
      res.status(201).json({ newComment });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
});

// ------------------ EDIT comment by ID ------------------ //

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  Comments.update(id, changes)
    .then(updatedComment => {
      res.status(201).json({ updatedComment });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// ------------------ DELETE comment by ID ------------------ //

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  Comments.remove(id)
    .then(deleted => {
      res.status(200).json({ message: "Comment deleted." });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
