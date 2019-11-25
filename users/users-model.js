const db = require("../data/dbConfig.js");

module.exports = {
  addNewUser,
  getAllUsers,
  findBy,
  getUserById,
  getPhotosByUserId,
  updateUser,
  deleteUser,
  getFollowersByUserId
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

async function updateUser(id, changes) {
  await db("users")
    .where({ id })
    .update(changes);

  return getUserById(id);
}

function deleteUser(id) {
  return db("users")
    .where({ id })
    .del();
}

function getPhotosByUserId(id) {
  return db("photos").where({ user_id: id });
}

function getFollowersByUserId(id) {
  return db("followers")
    .join("users", "followers.artist_id", "users.id")
    .where("followers.follower_id", "=", id)
    .select(
      "followers.created_at",
      "users.id",
      "users.username",
      "users.email",
      "users.avatar_url",
      "users.location"
    );
}
