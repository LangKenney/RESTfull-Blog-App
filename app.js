var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require('mongoose');
    
mongoose.connect('mongodb://localhost/restfull_blog_app');
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));


app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Running the node/express server..")
});

// title
// image
// body
// created
    

    