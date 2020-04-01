# Who's That Pokemon?

This is a Node/Express/MongoDB project for creating shareable memes based on the popular "Who's That Pokemon" commercial break outro/intro from the original Pokemon TV series.

[Live Demo](https://whos-that-pokemon-271421.appspot.com/)

### Features

* Login and registration using passport
* Pick from a standard list of Pokemon image sprites using PokeAPI
* Jquery for scaling and placing custom text and images inside your custom meme
* All memes created by the user are public, but are obfuscated with a random UUID string inside the URL

### Usage

```sh
$ npm install
```

```sh
# start up MongoDB

$ npm start

# Visit http://localhost:8000 inside your web browser
```

### MongoDB

Open "config/keys.js" and add your MongoDB URI, local or Atlas connection strings
