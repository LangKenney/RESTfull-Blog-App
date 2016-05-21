var express = require("express"),
    methodOverride = require("method-override"),
    app = express(),
    bodyParser = require("body-parser"),
    expressSanitizer = require("express-sanitizer"),
    mongoose = require('mongoose');
    
mongoose.connect('mongodb://localhost/restfull_blog_app');
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

//MONGOOSE/MODEL config
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog",blogSchema);

/*g.create({
    title:"Test blog",
    image:"https://github.com/LangKenney/CodeCampCode/blob/master/Bio%20Pictures/02415_intothefog_1600x900.jpg?raw=true",
    body: "Hello this is a blog post",
    
});
*/

// RESTFULL ROUTES

//redirect from "/" to "/blogs" page
app.get("/",function(req,res){
    res.redirect("/blogs");
});

//finds the list of blogs and sends them to the index page
app.get("/blogs",function(req,res){
       Blog.find({},function(err,blogs){
        if(err){
            console.log("ERROR!");
        }
        else {
            res.render("index",{blogs:blogs});
        }
    });
});

//Sends user to the "new page"
app.get("/blogs/new",function(req, res) {
    res.render("new");
});

//CREATE ROUTE
app.post("/blogs",function(req,res) {
    //creat blog
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog,function(err, newBlog){
        if(err){
            res.render("new");
        }
        else {
            //redirect to the index
            res.redirect("/blogs");
        }
    });
});


//SHOW ROUTE
app.get("/blogs/:id", function(req, res) {
   Blog.findById(req.params.id, function(err, foundBlog){
       if(err){
           res.redirect("/blogs");
       } else {
           res.render("show",{blog:foundBlog});
       }
   })
});

//EDIT ROUTE
app.get("/blogs/:id/edit",function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog) {
        if(err){
            res.redirect("/blogs")
        } else {
            res.render("edit", {blog:foundBlog});
        }
    })
})

//UPDATE ROUTE
app.put("/blogs/:id",function(req,res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/"+ req.params.id);
        }
    })
});

//DELETE ROUTE
app.delete("/blogs/:id",function(req,res){
    //Destroy blog
        Blog.findByIdAndRemove(req.params.id,function(err){
            if(err){
                res.redirect("/blogs/");
            } else {
                res.redirect("/blogs/");
            }
        })
    
    //Redirect
})

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Running the node/express server..")
});

// title
// image
// body
// created
    

    