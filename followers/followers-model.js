const db = require("../data/dbConfig.js");

module.exports = {
  followUser,
  getAllFollowers,
  unfollowUser
};

function getAllFollowers() {
  return db("followers");
}

async function followUser(artist_id, follower_id) {
  await db("followers").insert({ artist_id, follower_id });

  return db("followers")
    .join("users", "followers.artist_id", "users.id")
    .where("followers.follower_id", "=", follower_id)
    .select(
      "followers.created_at",
      "users.id",
      "users.username",
      "users.email",
      "users.avatar_url",
      "users.location"
    );
}

async function unfollowUser(artist_id, follower_id) {
  await db("followers")
    .where({ artist_id, follower_id })
    .del();

  return db("followers")
    .join("users", "followers.artist_id", "users.id")
    .where("followers.follower_id", "=", follower_id)
    .select(
      "followers.created_at",
      "users.id",
      "users.username",
      "users.email",
      "users.avatar_url",
      "users.location"
    );
}
