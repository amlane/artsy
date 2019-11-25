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
  getLikesByPhotoId,
  getLikedPhotosByUserId,
  getLikesCount,
  getPhotoByIdSimple,
  findById,
  search
};

function getAllPhotos() {
  return db("photos")
    .join("users", "photos.user_id", "users.id")
    .select(
      "photos.id",
      "photos.photo_url",
      "photos.title",
      "photos.description",
      "photos.created_at",
      "photos.user_id",
      "users.username",
      "users.avatar_url"
    );
}

function findById(id) {
  return db("photos")
    .where({ id })
    .first();
}

async function getPhotoById(id) {
  const photo = await db("photos")
    .where("photos.id", id)
    .first()
    .join("users", "photos.user_id", "users.id")
    .select(
      "photos.id",
      "photos.photo_url",
      "photos.title",
      "photos.description",
      "photos.created_at",
      "photos.user_id",
      "users.username",
      "users.avatar_url"
    );
  photo.likes = await getLikesByPhotoId(photo.id);
  return photo;
}

async function getPhotoByIdSimple(id) {
  const photo = await db("photos")
    .where("photos.id", id)
    .first()
    .join("users", "photos.user_id", "users.id")
    .select(
      "photos.id",
      "photos.photo_url",
      "photos.title",
      "photos.description",
      "photos.created_at",
      "photos.user_id",
      "users.username",
      "users.avatar_url"
    );
  const list = await getLikesCount(photo.id);
  photo.likes = list.count;
  return photo;
}

function findBy(filter) {
  return db("photos").where(filter);
}

function search(value) {
  return db("photos")
    .where(db.raw('LOWER("title")'), "like", `%${value.toLowerCase()}%`)
    .join("users", "photos.user_id", "users.id")
    .select(
      "photos.id",
      "photos.title",
      "photos.description",
      "photos.photo_url",
      "photos.created_at",
      "photos.user_id",
      "users.email",
      "users.username",
      "users.avatar_url"
    );
}

async function addNewPhoto(photo) {
  const [id] = await db("photos").insert(photo, "id");

  return getPhotoById(id);
}

async function update(id, changes) {
  await db("photos")
    .where({ id })
    .update(changes);

  return getPhotoById(id);
}

function remove(id) {
  return db("photos")
    .where({ id })
    .del();
}

// async function addLike(user_id, photo_id) {
//     await db("likes").insert({ user_id, photo_id })

//     return getLikesByPhotoId(photo_id)
// }

async function addLike(user_id, photo_id) {
  await db("likes").insert({ user_id, photo_id });

  return db("photos")
    .join("users", "photos.user_id", "users.id")
    .select(
      "photos.id",
      "photos.photo_url",
      "photos.title",
      "photos.description",
      "photos.created_at",
      "photos.user_id",
      "users.username",
      "users.avatar_url"
    );
}

// function removeLike(user_id, photo_id) {
//     return db("likes")
//         .where({ user_id, photo_id })
//         .del();
// }

async function removeLike(user_id, photo_id) {
  await db("likes")
    .where({ user_id, photo_id })
    .del();

  return db("photos")
    .join("users", "photos.user_id", "users.id")
    .select(
      "photos.id",
      "photos.photo_url",
      "photos.title",
      "photos.description",
      "photos.created_at",
      "photos.user_id",
      "users.username",
      "users.avatar_url"
    );
}

async function getLikesByPhotoId(photo_id) {
  const list = await db("likes")
    .where({ photo_id })
    .join("users", "likes.user_id", "users.id")
    .select(
      "likes.user_id",
      "likes.photo_id",
      "users.username",
      "users.avatar_url"
    );

  let count = list.length;
  return { count, list };
}

async function getLikedPhotosByUserId(user_id) {
  const likes = await db("likes").where({ user_id });

  return Promise.all(
    likes.map(async like => {
      return await getPhotoByIdSimple(like.photo_id);
    })
  )
    .then(likedPhotos => {
      return likedPhotos;
    })
    .catch(err => {
      console.error({ err });
    });
}

async function getLikesCount(photo_id) {
  return db("likes")
    .where("photo_id", "=", photo_id)
    .count("photo_id as count")
    .first();
}
