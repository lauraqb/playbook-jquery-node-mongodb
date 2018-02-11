const express = require("express");
const app = express();
let plays_obj = {};
let mongoose = require('mongoose');
let playsCollection = "plays";

mongoose.connect('mongodb://localhost/db_playbook');

//We now need to get notified if we connect successfully or if a connection error occurs:
let conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', function() {
    console.log("Connected to the Playbook Mongo Database!");
    conn.collection("plays").find({}).toArray(function(req, result) {
        plays_obj = result;
        // console.log(plays_obj);
    });
    
});


app.get('/ajaxcall', function(req, res){
	res.send(plays_obj);
});

/* Routes */
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
	res.render("index.html")
});

app.get("/login", (req, res) => {
	res.end("Esta es la página de login");
});

app.get("*", (req, res) => {
	res.end("Página no existe");
});


app.listen(8080);

