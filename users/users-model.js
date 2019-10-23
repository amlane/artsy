const db = require("../data/dbConfig.js");
const Photos = require("../photos/photos-model")

module.exports = {
    addNewUser,
    getAllUsers,
    findBy,
    getUserById,
    getPhotosByUserId
};

function getAllUsers() {
    return db("users");
}

function getUserById(id) {
    return db("users")
        .where({ id })
        .first();
}

function findBy(filter) {
    return db("users").where(filter);
}

async function addNewUser(user) {
    const [id] = await db("users").insert(user, "id");

    return getUserById(id);
}

function getPhotosByUserId(id) {
    return db("photos").where({ "user_id": id })
}