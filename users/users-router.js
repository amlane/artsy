const router = require("express").Router();
const jwt_decode = require("jwt-decode");

const Users = require("./users-model.js");
const Photos = require("../photos/photos-model");
const restricted = require("../auth/restricted-middleware");

// ---------------------- /api/users ---------------------- //

router.get("/", (req, res) => {
  Users.getAllUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// ---------------------- GET User By Id ---------------------- //

router.get("/:id", verifyUserId, async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Users.getUserById(id);
    user.photos = await Users.getPhotosByUserId(id);
    user.favorites = await Photos.getLikedPhotosByUserId(id);
    user.followers = await Users.getFollowersByUserId(id);
    delete user.password;
    Promise.all(
      user.photos.map(async photo => {
        const liked = await Photos.getLikesCount(photo.id);
        // const list = await Photos.getLikesByPhotoId(photo.id);
        photo.likes = liked.count;
        // photo.likes = list;
        return photo;
      })
    ).then(photos => {
      res.status(200).json({ user });
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// ---------------- EDIT a User's Info By User Id ---------------- //

router.put(
  "/:id",
  restricted,
  verifyUserId,
  validateEditContent,
  verifyUser,
  (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    Users.updateUser(id, changes)
      .then(updatedUser => {
        res.status(201).json(updatedUser);
      })
      .catch(err => {
        res.status(500).json({ err });
      });
  }
);

// ---------------- DELETE User ---------------- //

router.delete("/:id", restricted, verifyUserId, verifyUser, (req, res) => {
  const id = req.params.id;

  Users.deleteUser(id)
    .then(deleted => {
      res.status(200).json({ message: `${deleted} record deleted` });
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

// ---------------------- Custom Middleware ---------------------- //

function verifyUserId(req, res, next) {
  const id = req.params.id;

  Users.getUserById(id)
    .then(item => {
      if (item) {
        req.item = item;
        next();
      } else {
        res.status(404).json({ message: "User Not Found." });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
}

function validateEditContent(req, res, next) {
  if (
    req.body.email === "" ||
    req.body.password === "" ||
    req.body.email === null ||
    req.body.password === null
  ) {
    res
      .status(400)
      .json({ message: "Email and password fields cannot be empty." });
  } else {
    next();
  }
}

function verifyUser(req, res, next) {
  const token = req.headers.authorization;
  const decoded = jwt_decode(token);
  const id = req.params.id;

  if (+id === decoded.subject) {
    next();
  } else {
    res.status(401).json({
      message: "You are not authorized to perform this request on another user."
    });
  }
}

module.exports = router;
