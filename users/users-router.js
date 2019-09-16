const router = require("express").Router();

const Users = require("./users-model.js");
const Photos = require("../photos/photos-model");
// const restricted = require("../middleware/restricted-middleware.js");

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

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Users.getUserById(id);
    user.photos = await Users.getPhotosByUserId(id);
    user.favorites = await Photos.getLikedPhotosByUserId(id);
    delete user.password;

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// ---------------------- Custom Middleware ---------------------- //

// function verifyUserId(req, res, next) {
//   const id = req.params.id;

//   Users.findById(id)
//     .then(item => {
//       if (item) {
//         req.item = item;
//         next();
//       } else {
//         res.status(404).json({ message: "User Not Found." });
//       }
//     })
//     .catch(err => {
//       res.status(500).json(err);
//     });
// }

module.exports = router;
