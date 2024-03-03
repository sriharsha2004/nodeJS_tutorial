// define the set of functions to handle each type of request
// then export those functions and use them in appwithejs.js
const blog = require("../modelsforconnectingtodb/model")

var blogindex = (req,res) =>{
    blog.find()
        .then((data)=>{
            res.render("index" , {title : "Home Page" , blogs : data})
        })
        .catch((err)=>{
            console.log(err)
        })
}

var blogpost = (req,res) => {
    const newblog = new blog(req.body);
    newblog.save()
    .then((data)=>{
        res.redirect("/")
    })
    .catch((err)=>{
        console.log(err);
    })
}

var blogdisplay=(req,res)=>{
    const id = req.params.id;
    blog.findById(id)
    .then((data)=>{
        res.render("display",{ data : data , title : "Blog details"});
    })
    .catch((err)=>{
        res.render("Notfound",{title : "Blog not found"});
    })
}

var blogdelete = (req,res)=>{
    blog.findByIdAndDelete(req.params.id)
    .then(()=>{
        res.redirect("/");
    })
    .catch((err)=>{
        console.log(err);
    })
}

var aboutblog =(req,res)=>{
    res.render("about" , {title : "About Page"});
}

var blogcreater = (req,res)=>{
    res.render("newblog" , {title : "Create a new Blog"});
}

var aboutUSblog = (req,res)=>{
    res.redirect("/about");
}

module.exports = {
    blogindex,
    blogpost,
    blogdisplay,
    blogdelete,
    aboutblog,
    blogcreater,
    aboutUSblog
}