const express = require("express")
const morgan = require("morgan")
const mongoose = require("mongoose")
const model = require("./modelsforconnectingtodb/model");
// const blog = require("./modelsforconnectingtodb/model");
// we need not include it because as we are not using blog in it
// we have taken out the requests of users and placed them in controllers
const blogcontroller = require("./controllers/blogcontoller")

const app = express();

// additional line to be included to tell server we are using view engine for dynamic templating
app.set('view engine','ejs')

//below statement should be used in case all the ejs files are present inside myviews folder
app.set('views','myviews')

// if all ejs files are present in views folder itself we need not specify explicitly like below
// as by default it checks for ejs files in views folder itself
// app.set('views,'views')

// mongoose is used for connecting to Database
// use npm install mangoose
// go to atlas and then to cluster , click on connect and then gives us the connections
// string copy and replace the password , username (these are found in security section 
// inside database access ) and also replace database name 
// see below for reference 

// netninjanodejs is the username
// 2000 is the pasword
// NetNinJaNode is the name of the database which we created in mongo atlas

// mongo atlas is the database which includes cloud 
// i.e data is stored in either aws , gcp , azure based on our selefction during creation
// of database

// basic of mongoDb : it consists of database(NetNinJaNode) inside that it has collections
// and these collecctions have documents
// In this the collections name is blogs (use plural always)

// var dbURI = "mongodb+srv://netninjanodejs:2000@NetNinJaNode.eiu197s.mongodb.net/"
var dbURI = "mongodb+srv://netninjanodejs:2000@cluster.eiu197s.mongodb.net/NetNinJaNode"
// var dbURI = "mongodb+srv:/netninjanodejs:2000@<cluster-address>/NetNinJaNode?retryWrites=true&w=majority"


// connect to database
// it returns a promise hence use .then() and after connecting it returns a callback function


// mongoose.connect(dbURI)
// .then((res)=>{
//     console.log("Connected to db");
// })
// .catch((err)=>{
//     console.log(err);
// })

// app.listen(3000);

// when we use above format to connect to db then since mongoose.connect is an asynchronous
// function and also it takes some time to connect , by the time it gets connected
// it continous its execction with the code after it

// hence when we use above code their is a chance that we start listening to requests(app.listen)
// from users even before we connect to DB

// eg : if we listen to requests from user before connecting to DB , then if user requests
// to all blogs then since Db is not connected it will give the response only after
// conneciting to db 
// hence we start listening to requests from the user only after connecting to Db
// for that purpose we can include the app.listen inside .then()
// it signifies that we will listen to requests of user only after it successffully 
// connects to the DB

// Connecting to DB

mongoose.connect(dbURI)
.then((res)=>{
    console.log("Connected to db");    
    app.listen(3000);
})
.catch((err)=>{
    console.log(err);
})


// note : app.get,app.use all these are the middlewares
// middlewares are the ones which are executed between request and response
// app.use is middleware common to all routes independent of either get or post request
// app.get is a middleware applicable only for specified path or route which is different
// for either get or post request
// when ever any middleware is executed all other middlewares after that will not 
// get execcuted hence we always make use of app.use middle ware at the end 
// to include all the other cases not present in the cases of app.get or app.post

// but if what to use a middleware which needs to be executed for all the routes
// we can use app.use 
// eg: if we want to print data of requesst done by user we can use app.use middleware
// whihc extracts the data irrespective of request made to which route
// but we also want to execute the other set of statemtns along with contents of 
// app.use we should use an additional parameter known as next
// This next parameter is used to prevent the stop of execution even if a middle ware is
// executed 
// See below

// app.use((req,res,next)=>{
    //     console.log(req.url);
    //     console.log(req.hostname);
    //     console.log(req.method);
    //     next();
    //     // continues with next middlewares even if this middleware gets executed
// })

//  Insteard of above statements to get the data about the request we can also use morgan

// Their are also third party middlewares which are present in npm can be used using 
// npm install
// To print data about the request we can use a third party middleware known as morgan
// 

app.use(express.static('public'))
app.use(morgan("dev"))

// middle ware which parses data in post request in the form of object
app.use(express.urlencoded({extended : true}))

// This specifies that all the files present inside the public folder are made static 
// i.e avaible for all pages

// we can create a nerw document in the collection which has structure of schems defined in
//  model.js , Hence to create a new document we define an instance of schema in model.js

// below are some sandbox (testing routes)

// a sandroute to add new blog
// app.get("/add_blog",(req,res)=>{
//     const blog = new model({
//         title : "my netninja 2",
//         snippet : "this is a practice project",
//         body : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore qu"
//     })
// // since blog.save takes certain time to save and returns promise we have used .then and .catch
//     blog.save()
//     .then((data)=>{
//         res.send(data);
//     })
//     .catch((err)=>{
//         console.log(err)
//     })
// })

// a sandroute to find all the blogs in db
// app.get("/get_allblogs",(req,res)=>{

// // since blog.find takes certain time to save and returns promise we have used .then and .catch
//     // blog.find()
//     // .then((data)=>{
//     //     res.send(data)
//     // })
//     // .catch((err)=>{
//     //     console.log(err)
//     // })

//     // we can also get data in sorted order based on updatedAt(time which is given by mongoose
//     // 1 specifies in ascending order)
//     // blog.find().sort({updatedAt : 1})
//     // we can also sort based on updated At
//     // blog.find().sort({createdAt : 1})

//     // we can also sort based on any factor we have in schema like title,snnippet,body 
//     // we can also sort in descending order
//     // for that use 
//     // blog.find().sort({createdAt : -1})
//     // for each case we have to use .then(),.catch()

//     // blog.find().sort({title : -1})
//     blog.find().sort({createdAt : -1})
//     .then((data)=>{
//         res.send(data)
//     })
//     .catch((err)=>{
//         console.log(err)
//     })
// })

// sandroute to find any document in collection
// app.get("/find",(req,res)=>{
//     // blog.findOne({title : "my netninja"})
//     // blog.findOneAndDelete({title : "my netninja 2"})
//     blog.findById("6573fb048ca567b8741e910b")
//     .then((data)=>{
//         res.send(data)
//     })
//     .catch((err)=>{
//         console.log(err)
//     })
// })



// app.get("/",(req,res)=>{
    // we need not specify the extension while using ejs
    // res.render("index");

    // sending data to index.ejs from the server
    // we need to pass second argument which is an object , in which we need to include
    //  the data  which we wanna send from server to corresping ejs file which we are 
    // specifying

    // these blogs will be later come from database here we wanna use MongoDB
    // const blogs = [
    //     {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //   ];

    // Since we have now connected to our Db we shoulld not hardcode data
    // we should extract data from Db and show them in frontend

    // above are the blogs which are sent from server to index.ejs file just like we did
    // for title
    // res.render("index" , {title : "Home Page" , blogs : blogs})
    // if the key and value are same we need not give both key and value just like we did 
    // below

    // blog.find()
    //     .then((data)=>{
    //         res.render("index" , {title : "Home Page" , blogs : data})
    //     })
    //     .catch((err)=>{
    //         console.log(err)
    //     })

    // insterd of definening the response to uesr which will make this file more large and 
    // messy , so we include them in seperate folder known as controllers.

// })

// so we can hndle above request as below

app.get('/',blogcontroller.blogindex);
// repeat the same for all the requests


// app.post("/createnewblog",(req,res)=>{
    // console.log(req.body);
    // when we directly try to acces the data sent frmo form using post request like above 
    // it gives undefined
    // so we need to include an additional middleware urlencoded 
    // this middleware is used to take the data and parses the data in the form of object
    // which can be used

    // after includeing url_encoded middleware we can now use req.body
    // console.log(req.body);
    // after printing req.body we observer that its in the form of object
    // hence we can directly create an instance of blog and pass req.body parameter


    // const newblog = new blog(req.body);
    // newblog.save()
    // .then((data)=>{
    //     res.redirect("/")
    // })
    // .catch((err)=>{
    //     console.log(err);
    // })
// })

app.post("/createnewblog",blogcontroller.blogpost)

// in the bellow middleware we used ':' symbol which corresponds to the routing (dynamic url)
// in this url we caan give any name for id 
// like /display/:tobedeleted , here object contains the tobedeleted 

// display blog on click of the blog
// app.get("/display/:id",(req,res)=>{
    // req.params contains the parameters 
    // inside which we need to select id

    // when we print we get an object containg the id
    // console.log(req.params);

//     const id = req.params.id;
//     blog.findById(id)
//     .then((data)=>{
//         res.render("display",{ data : data , title : "Blog details"});
//     })
//     .catch((err)=>{
//         console.log(err);
//     })
// })

app.get("/display/:id" , blogcontroller.blogdisplay);

// delete blog when clicked on delete button
// app.get("/deleteblog/:id" , (req,res)=>{
//     blog.findByIdAndDelete(req.params.id)
//     .then(()=>{
//         res.redirect("/");
//     })
//     .catch((err)=>{
//         console.log(err);
//     })
// })

app.get("/deleteblog/:id" , blogcontroller.blogdelete);

// app.get("/updateblog/:id",(req,res)=>{
//     blog.findByIdAndUpdate(req.params.id)
//     .then((data)=>{
//         res.render("update" , { blogdata : data , title : "Update form"});
//     })
//     .catch((err)=>{
//         console.log(err);
//     })
// })

// app.get("/about",(req,res)=>{
//     res.render("about" , {title : "About Page"});
// })

app.get("/about",blogcontroller.aboutblog);

// app.get("/about-us",(req,res)=>{
//     res.redirect("/about");
// })

app.get("/about-us",blogcontroller.aboutUSblog);

// app.get("/blogs/create",(req,res)=>{
//     res.render("newblog" , {title : "Create a new Blog"});
// })

app.get("/blogs/create",blogcontroller.blogcreater);

app.use((req,res)=>{
    res.status(404).render("Notfound" , { title : "404"});
})

