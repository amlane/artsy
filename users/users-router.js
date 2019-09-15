const router = require("express").Router();

const Users = require("./users-model.js");
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

router.get("/:id", (req, res) => {
    const id = req.params.id;

    Users.getUserById(id)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.get("/:id/photos", (req, res) => {
    const id = req.params.id;

    Users.getUserById(id)
        .then(user => {
            console.log(user, id)
            Users.getPhotosByUserId(id)
                .then(photos => {
                    let { id, email } = user;
                    res.status(200).json({ user: { id, email }, photos });
                })
                .catch(err => {
                    res.status(500).json(err);
                });
        })
        .catch(err => {
            res.status(500).json(err);
        });
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