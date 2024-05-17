This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
To launch this project you have to activate it's server side firstly. To do it, run: `cd back & npx nodemon app.js` (or just `node app.js`, if you don't want it to follow your code edits dynamically).
After that run `npm start` at project root directory to launch client react SPA.
Project uses mongodb as it's database, therefore you should install it, then configure .env file in the `back` directory to match your DB.

To manage users you'll have to init DB with at least 1 admin (here he has password "password"). Password change isn't supported yet, but you still can registrate yourself as a client and upgrade your role to admin via initial admin rights.
<details>
	<summary>Query<summary/>
  To simplify testing of the application, this query in addition to admin contains moder's data.
	<summary>Query</summary>
	[{
  "_id": {
    "$oid": "6647b46bc5558e2a808f8f87"
  },
  "name": "John",
  "login": "loginadmin",
  "password": "$2b$10$.Y0reNDq5t9rhgg0lQzlKe9fFafAARCTszEDxKv7PkCBye8D9AWze",
  "role": "admin",
  "cart": [],
  "favs": []
},
{
  "_id": {
    "$oid": "6647b4ecc5558e2a808f8f88"
  },
  "name": "Fedor",
  "login": "loginmoder",
  "password": "$2b$10$sq9GOBpqKX47oo09/2zevecRePC.PLkesEqWzxmGt/TtI.WCHuUw2",
  "role": "moder",
  "cart": [],
  "favs": [],
  "isBlocked": false
}]	
</details>


