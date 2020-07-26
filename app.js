const express = require("express");
const bodyParser = require("body-parser");
const app = express();
let items = [];

// Use EJS
app.set("view engine", "ejs");

// Use bodyParser
app.use(bodyParser.urlencoded({extended: true}));

// Server static files from the public folder
app.use(express.static("public"));

app.get("/", function(req, res) {
   
    let today = new Date();
    
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    let day = today.toLocaleDateString("en-UK", options);

    res.render("list", {whichDay: day, newListItems: items})
})


app.post("/", function(req, res) {
    let item = req.body.newItem;
    
    items.push(item);

    res.redirect("/");
})



app.listen(3000, function() {
    console.log("Server started on port 3000");
})