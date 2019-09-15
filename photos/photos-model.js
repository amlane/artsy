const db = require("../data/dbConfig.js");

module.exports = {
    addNewPhoto,
    getAllPhotos,
    findBy,
    getPhotoById,
    update,
    remove,
    addLike,
    removeLike,
    getLikesByPhotoId
};

function getAllPhotos() {
    return db("photos")
}

async function getPhotoById(id) {
    const photo = await db("photos")
        .where({ id })
        .first();

    photo.likes = await getLikesByPhotoId(photo.id)
    return photo;
}

function findBy(filter) {
    return db("photos").where(filter);
}

async function addNewPhoto(photo) {
    const [id] = await db("photos").insert(photo, "id");

    return getPhotoById(id);
}

function update(id, changes) {
    return db("photos")
        .where({ id })
        .update(changes);
}

function remove(id) {
    return db("photos")
        .where({ id })
        .del();
}

async function addLike(user_id, photo_id) {
    await db("likes").insert({ user_id, photo_id })

    return getLikesByPhotoId(photo_id)
}

function removeLike(user_id, photo_id) {
    return db("likes")
        .where({ user_id, photo_id })
        .del();
}

async function getLikesByPhotoId(photo_id) {
    const list = await db("likes").where({ photo_id })

    let count = list.length;
    return { list, count }
}


