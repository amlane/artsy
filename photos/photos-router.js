const router = require("express").Router();

const Photos = require("./photos-model.js");
// const restricted = require("../middleware/restricted-middleware.js");


// ---------------------- /api/photos ---------------------- //


router.get("/", (req, res) => {
    Photos.getAllPhotos()
        .then(photos => {
            Promise.all(photos.map(async photo => {
                const likes = await Photos.getLikesByPhotoId(photo.id);
                photo.likes = likes
                return photo;
            })).then(photos => {
                res.status(200).json({ photos })
            })
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.get("/:id", (req, res) => {
    const id = req.params.id;

    Photos.getPhotoById(id)
        .then(photo => {
            res.status(200).json({ photo });
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.post("/", (req, res) => {
    let photo = req.body;

    Photos.addNewPhoto(photo)
        .then(newPhoto => {
            res.status(201).json({ newPhoto })
        })
})

router.put("/:id", (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    Photos.update(id, changes)
        .then(updatedPhoto => {
            res.status(201).json(updatedPhoto);
        })
        .catch(err => {
            res.status(500).json(err);
        });
}
);

router.delete("/:id", (req, res) => {
    const id = req.params.id;

    Photos.remove(id)
        .then(deleted => {
            res.status(200).json({ message: "Photo deleted." });
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.post("/:id/like", (req, res) => {
    const photo_id = req.params.id;
    const user_id = req.body.user_id;

    Photos.addLike(user_id, photo_id)
        .then(likes => {
            res.status(200).json({ likes })
        })
        .catch(err => {
            res.status(500).json(err)
        })
})


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