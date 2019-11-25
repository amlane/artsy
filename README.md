# Artsy API Documentation

BaseURL: https://artsy-be.herokuapp.com/api

A REST API using Node.js, Express, knex.js, and PostgresQL.
</br>Authentication implemented with bcrypt and JSON web token.

# Endpoints

### Authentication

<!------------- Register a new User ------------->

<details>
<summary><b>POST - Register a new user</b></summary>

<b>Endpoint:</b> `/auth/register`
</br>
Requires an object with an email, password and username:

```json
{
  "email": "admin@email.com",
  "password": "password",
  "username": "amanda"
}
```

When successful will return status code of 201 (CREATED), the new user object and a token (example):

```json
{
  "newUser": {
    "id": 2,
    "username": "amanda",
    "email": "admin@email.com",
    "created_at": "2019-11-24 22:30:29",
    "avatar_url": "https://static.wixstat...",
    "location": null,
    "about": "Share your story about your art."
  },
  "token": "eyJhbGciOiJ..."
}
```

</details>

<!------------- Login an existing user ------------->

<details>
<summary><b>POST - Login an existing user</b></summary>

<b>Endpoint:</b> `/auth/login`
</br>
Requires an object with a valid email and password:

```json
{
  "email": "admin@email.com",
  "password": "password"
}
```

When successful will return status code of 201 (CREATED), the new user object and a token (example):

```json
{
  "user": {
    "id": 2,
    "username": "amanda",
    "email": "admin@email.com",
    "created_at": "2019-11-24 22:30:29",
    "avatar_url": "https://static.wixstat...",
    "location": null,
    "about": "Share your story about your art."
  },
  "token": "eyJhbGciOiJ..."
}
```

</details>

### User

<!------------- Get all users ------------->

<details>
<summary><b>GET - Get all users</b></summary>

<b>Endpoint:</b> `/users`
</br>No token or request body required.

When successful will return status code of 200 (OK) and an array of users.

```json
[
  {
    "id": 1,
    "username": "testuser",
    "email": "testuser1@email.com",
    "created_at": "2019-11-24 22:02:30",
    "avatar_url": "https://static.wixs...",
    "location": null,
    "about": "Share your story about your art."
  },
  {
    "id": 2,
    "username": "amanda",
    "email": "admin@email.com",
    "created_at": "2019-11-24 22:30:29",
    "avatar_url": "https://static.wixs...",
    "location": null,
    "about": "Share your story about your art."
  }
]
```

</details>

<!------------- Get a single user by ID ------------->

<details>
<summary><b>GET - Get a single user by ID</b></summary>

<b>Endpoint:</b> `/users/:id` <i>(Example: "BaseURL/users/2")</i>
</br>No token or request body required.

When successful will return status code of 200 (OK) and a the user in an object.
The user by id endpoint includes the user's bio info, as well as their array of photos, favorites, and followers.

```json
{
  "user": {
    "id": 1,
    "username": "testuser",
    "email": "testuser1@email.com",
    "created_at": "2019-11-24 22:02:30",
    "avatar_url": "https://static.wixs...",
    "location": null,
    "about": "Share your story about your art.",
    "photos": [
      {
        "id": 1,
        "photo_url": "www.coolphoto.com",
        "title": "cool title",
        "description": null,
        "created_at": "2019-11-24 22:04:00",
        "user_id": 1,
        "likes": 0
      }
    ],
    "favorites": [],
    "followers": []
  }
}
```

</details>

<!------------- Edit User Bio ------------->

<details>
<summary><b>PUT - Edit User Bio</b></summary>

<b>Endpoint:</b> `/users/:id` <i>(Example: "BaseURL/users/2")</i>
</br>Authorization token required in headers. Only the user is authorized to update their own bio.
</br>
Requires a request body with the updated changes. Please see Data model portion of this documentation for required fields. Here is an example:

```json
{
  "location": "Como",
  "about": "Share your story about your art.",
  "username": "Amanda"
}
```

When successful will return status code of 201 (CREATED) and the updated user object:

```json
{
  "id": 1,
  "username": "Amanda",
  "email": "testuser1@email.com",
  "created_at": "2019-11-24 22:02:30",
  "avatar_url": "https://static.wixs...",
  "location": "Como",
  "about": "Share your story about your art."
}
```

</details>

<!------------- Delete User by ID ------------->

<details>
<summary><b>DELETE - Delete User by ID</b></summary>

<b>Endpoint:</b> `/users/:id` <i>(Example: "BaseURL/users/2")</i>
</br>Authorization token required in headers. Only the user can delete their own account.
</br>No request body required.

When successful will return status code of 200 (OK) and a success message.

```json
{
  "message": "1 record deleted"
}
```

</details>

### Photos

<!------------- Get all photos ------------->

<details>
<summary><b>GET - Get all photos</b></summary>

<b>Endpoint:</b> `/photos`
</br>No token or request body required.

When successful will return status code of 200 (OK) and a the photos array.
The user by id endpoint includes the photos details, as well as the count for likes and comments.

```json
{
  "photos": [
    {
      "id": 2,
      "photo_url": "www.phyoto.com",
      "title": "cool yolo photo",
      "description": "I forgot the details...",
      "created_at": "2019-11-24 23:27:55",
      "user_id": 8,
      "username": "Amanda",
      "avatar_url": "https://static.wixs...",
      "likes": 0,
      "comments": 0
    },
    {
      "id": 5,
      "photo_url": "www.phyoto.com",
      "title": "this is the coolest photo everrrrr",
      "description": "Here is an updated description?",
      "created_at": "2019-11-24 23:52:14",
      "user_id": 9,
      "username": "amandalane",
      "avatar_url": "https://static.wixs...",
      "likes": 0,
      "comments": 0
    }
  ]
}
```

</details>

<!------------- Get a photo by photo id------------->

<details>
<summary><b>GET - Get a single photo by ID</b></summary>

<b>Endpoint:</b> `/photos/:id` <i>(Example: "BaseURL/photos/27")</i>
</br>No token or request body required.

When successful will return status code of 200 (OK) and the photo object.
The photo by id endpoint includes the photo details as well as the likes (count and list of users), and array of comments.

```json
{
  "photo": {
    "id": 2,
    "photo_url": "www.phyoto.com",
    "title": "cool yolo photo",
    "description": "I forgot the details...",
    "created_at": "2019-11-24 23:27:55",
    "user_id": 8,
    "username": "Amanda",
    "avatar_url": "https://static.wixs...",
    "likes": {
      "count": 0,
      "list": []
    },
    "comments": []
  }
}
```

</details>

<!------------- Add a new photo post ------------->

<details>
<summary><b>POST - Add a new photo post</b></summary>

<b>Endpoint:</b> `/photos`
</br>Authorization token required in headers. This is how the user's id is assigned to their post.
</br>
Requires a request body with the post info. Please see Data model portion of this documentation for required fields. Here is an example:

```json
{
  "photo_url": "www.phyoto.com",
  "title": "cool yolo photo"
}
```

When successful will return status code of 201 (CREATED) and the new photo object:

```json
{
  "newPhoto": {
    "id": 2,
    "photo_url": "www.phyoto.com",
    "title": "cool yolo photo",
    "description": null,
    "created_at": "2019-11-24 23:27:55",
    "user_id": 8,
    "username": "Amanda",
    "avatar_url": "https://static.wixs...",
    "likes": {
      "count": 0,
      "list": []
    }
  }
}
```

</details>

<!------------- Edit Photo by ID ------------->

<details>
<summary><b>PUT - Edit Photo by ID</b></summary>

<b>Endpoint:</b> `/photos/:id` <i>(Example: "BaseURL/photos/2")</i>
</br>Authorization token required in headers. Only the user is authorized to edit their own posts.
</br>
Requires a request body with the updated changes. Please see Data model portion of this documentation for required fields. Here is an example:

```json
{
  "description": "Here is an updated description"
}
```

When successful will return status code of 201 (CREATED) and the updated user object:

```json
{
  "id": 3,
  "photo_url": "www.phyoto.com",
  "title": "cool yolo photo",
  "description": "Here is an updated description",
  "created_at": "2019-11-24 23:38:30",
  "user_id": 9,
  "username": "amandalane",
  "avatar_url": "https://static.wixs...",
  "likes": {
    "count": 0,
    "list": []
  }
}
```

</details>

<!------------- Delete photo by id ------------->

<details>
<summary><b>DELETE - Delete Photo by ID</b></summary>

<b>Endpoint:</b> `/photos/:id` <i>(Example: "BaseURL/photos/2")</i>
</br>Authorization token required in headers. Only the user is authorized to delete their own posts.
</br>
No request body required.

When successful will return status code of 200 (OK) and a success message:

```json
{
  "message": "Photo deleted."
}
```

</details>

# Data Model

#### USERS

---

```
{
  id: INT, primary key
  username: STRING, non-nullable
  email: STRING, non-nullable
  password: STRING, non-nullable
  created_at: TIMESTAMP
  avatar_url: STRING, defaults
  location: STRING
  about: STRING, defaults
}
```

#### PHOTOS

---

```
{
  id: INT, primary key
  photo_url: STRING, non-nullable
  title: STRING, non-nullable
  description: STRING
  created_at: TIMESTAMP
  user_id: INT, foreign key for user table
}
```

#### LIKES

---

```
{
  user_id: INT, foreign key for user table,
  photo_id: INT, foreign key for photo table
}
```

#### FOLLOWERS

---

```
{
  artist_id: INT, foreign key for user table,
  follower_id: INT, foreign key for user table
}
```

#### COMMENTS

---

```
{
  id: INT, primary key
  content: STRING, non-nullable
  created_at: TIMESTAMP
  photo_id: INT, foreign key for photo table
  user_id: INT, foreign key for user table
}
```
