# artsy API documentation

BaseURL: https://artsy-be.herokuapp.com/

`/api/auth/register`
`/api/auth/login`

```
{
    "email": ""
    "password": ""
}
```

Get
`/api/users`
`/api/users/:userid`
`api/photos`
`api/photos/:photoid`

POST
`api/photos`
```
{
    "photo_url": "this-super-cool-photo.jpg",
    "title": "My starbucks",
    "description": "A latte fun",
    "user_id": 2
}
```

`api/photos/:photoid/like`

```
{
	"user_id": 2
}
```

PUT
`api/photos/:photoid`
```
{
    "photo_url": "this-super-cool-photo.jpg",
    "title": "My starbucks",
    "description": "A latte fun",
    "user_id": 2
}
```

DELETE
`api/photos/:photoid`

`api/photos/:photoid/unlike`
```
{
	"user_id": 2
}
```
