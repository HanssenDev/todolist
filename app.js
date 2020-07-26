const express = require("express");
const bodyParser = require("body-parser");
const app = express();
let items = [];
let workItems = [];

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

    res.render("list", {listTitle: day, newListItems: items})
})


app.post("/", function(req, res) {
    let item = req.body.newItem;

    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
});

app.get("/work", function(req, res) {
    res.render("list", {listTitle: "Work List", newListItems: workItems});
})

app.listen(3000, function() {
    console.log("Server started on port 3000");
})