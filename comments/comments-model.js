const db = require("../data/dbConfig.js");

module.exports = {
  getCommentById,
  addComment,
  getCommentsByPhotoId,
  getCommentByUserId,
  update,
  remove
};

function getCommentsByPhotoId(id) {
  return db("comments")
    .where({ photo_id: id })
    .join("users", "comments.user_id", "users.id")
    .select(
      "comments.id",
      "comments.content",
      "comments.created_at",
      "users.id as user_id",
      "users.username",
      "users.avatar_url"
    );
}

function getCommentByUserId(id) {
  return db("comments").where({ user_id: id });
}

function getCommentById(id) {
  return db("comments")
    .where({ id })
    .first();
}

async function addComment(comment) {
  const [id] = await db("comments").insert(comment, "id");

  return getCommentById(id);
}

function update(id, changes) {
  return db("comments")
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db("comments")
    .where({ id })
    .del();
}
