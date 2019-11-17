const router = require("express").Router();
const jwt_decode = require("jwt-decode");

const Photos = require("./photos-model.js");
const restricted = require("../auth/restricted-middleware");


// ---------------------- /api/photos ---------------------- //


router.get("/", (req, res) => {
    Photos.getAllPhotos()
        .then(photos => {
            Promise.all(photos.map(async photo => {
                const likes = await Photos.getLikesCount(photo.id);
                photo.likes = likes.count;
                return photo;
            })).then(photos => {
                res.status(200).json({ photos })
            })
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.get("/:id", verifyPhotoId, (req, res) => {
    const id = req.params.id;

    Photos.getPhotoById(id)
        .then(photo => {
            res.status(200).json({ photo });
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.post("/", restricted, verifyPostContent, (req, res) => {
    let photo = req.body;
    const token = req.headers.authorization;
    const decoded = jwt_decode(token)
    photo.user_id = decoded.subject;

    Photos.addNewPhoto(photo)
        .then(newPhoto => {
            res.status(201).json({ newPhoto })
        })
})

router.put("/:id", restricted, verifyPhotoId, verifyPostContent, (req, res) => {
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

router.delete("/:id", restricted, verifyPhotoId, (req, res) => {
    const id = req.params.id;

    Photos.remove(id)
        .then(deleted => {
            res.status(200).json({ message: "Photo deleted." });
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.post("/:id/like", restricted, (req, res) => {
    const photo_id = req.params.id;
    const token = req.headers.authorization;
    const decoded = jwt_decode(token)
    const user_id = decoded.subject;

    Photos.addLike(user_id, photo_id)
        .then(results => {
            res.status(200).json({ results })
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.delete("/:id/unlike", restricted, (req, res) => {
    const photo_id = req.params.id;
    const token = req.headers.authorization;
    const decoded = jwt_decode(token)
    const user_id = decoded.subject;

    Photos.removeLike(user_id, photo_id)
        .then(results => {
            res.status(200).json({ results })
        })
        .catch(err => {
            res.status(500).json(err)
        })
})


// ---------------------- Custom Middleware ---------------------- //

function verifyPhotoId(req, res, next) {
    const id = req.params.id;

    Photos.findById(id)
        .then(item => {
            if (item) {
                req.item = item;
                next();
            } else {
                res.status(404).json({ message: "Photo Not Found." });
            }
        })
        .catch(err => {
            res.status(500).json({ err });
        });
}

function verifyPostContent(req, res, next) {
    if (req.body.photo_url === "" || req.body.photo_url === null || req.body.title === "" || req.body.title === null) {
        res.status(400).json({ message: "Photo url and title are required." })
    } else {
        next();
    }
}

module.exports = router;