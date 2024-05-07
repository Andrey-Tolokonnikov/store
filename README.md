This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
To launch this project you have to activate it's server side firstly. To do it, run: `cd back & npx nodemon app.js` (or just `node app.js`, if you don't want it to follow your code edits dynamically).
After that run `npm start` at project root directory to launch client react SPA.
Project uses mongodb as it's database, therefore you should install it, then configure .env file in the `back` directory to match your DB.

For now some features not implemented yet (such as users registration). Because of it you'll have to make initial query to DB
<details>
	<summary>Query<summary/>
	[{
  "_id": {
    "$oid": "660dc2504d8b3e545e9b4f9d"
  },
  "login": "login1",
  "password": "password1",
  "name": "John",
  "cart": [
    {
      "_id": {
        "$oid": "65f9d90aa00f8e2cb985798e"
      },
      "num": 7
    },
    {
      "_id": {
        "$oid": "65f9df13a00f8e2cb9857992"
      },
      "num": 4
    }
  ],
  "favorites": [
    {
      "$oid": "65f9d90aa00f8e2cb985798e"
    }
  ],
  "role": "admin",
  "isBlocked": false
},
{
  "_id": {
    "$oid": "6627679968e53919d644594b"
  },
  "cart": [
    {
      "_id": {
        "$oid": "65f9d90aa00f8e2cb985798e"
      },
      "num": 3
    },
    {
      "_id": {
        "$oid": "65f9df13a00f8e2cb9857992"
      },
      "num": 1
    }
  ],
  "favorites": [],
  "login": "login2",
  "name": "Peter",
  "password": "password2",
  "role": "moder",
  "isBlocked": false
}]	
</details>
Password are stored directly, but later i will replace it with hashes


