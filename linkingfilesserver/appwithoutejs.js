// express is a framework present in npm which is used to perform routing,interaction with 
// server and database easily
// Also it provides an alteranative for server.js
// We can remove server.js if we use app.js but for understanding purpose i am not
// removing server.js file as we also need to know how to handle requests using
// server.js withot using express

const express = require("express")
// importing express module

const app = express();

// this line is similar to server.listen in server.js file
app.listen(3000);
// see how simple app.listen is compared to server.listen

// handling requests
//below line we can use insteard of reading file and rendering file
// The main advantage is we need not set an header which we did n server.js
// using res.setHeader() and also we need not set the status code it will automatically
// set the status code based on the kind of request to sever

// get indicates we are handling a get request
app.get("/",(req,res)=>{
    // used to render index.html
    // res.send is similar to res.write() in server.js file

    // res.sendFile("./templates/index.html")
    // when we use the above path express app is going to search for the directory from 
    // root directory of computer.
    // hence we need to specify root from where the path needs to be specified
    // we use root : __dirname which refers that we are taking root as present directory

    // so we use below statemtent to respond back to request

    res.sendFile("./templates/index.html",{ root:__dirname });
})

// we repeate the same for other type of requests

app.get("/about",(req,res)=>{
    res.sendFile("./templates/about.html" , { root : __dirname})
})

app.get("/about-us",(req,res)=>{
    // we will redirect again to /about
    res.redirect("/about");
})

// This is used for rendering notfound page just like default in switch in server.js
app.use((req,res)=>{
    // here we need to set the status code as 404
    res.status(404).sendFile("./templates/Notfound.html",{root : __dirname});
})