var http = require("http")
var fs = require("fs")

//Creating server

// we can create a server using createserver method it is an aaynchronous funtion which
// executes a callback function (req,res) => when ever a request is made to server

// it takes two args req,res
// req contains info about req , res is used to respond back to request
var server = http.createServer((req,res)=>{
    // console.log(req.url , req.method);
    // req.url returns url after localhost:3000
    // req.method can be get or post(in case of forms)

    // setting the type of content to respond back to user
    // in this we are specifying that we respond back with text data
    // res.setHeader('Content-Type',"text/plain");

    // Note : the data can be text,JSON,HTML

    // used to wrte contents onto the page
    // res.write("heello world");

    // used to end the response given by the server
    // res.end();

    // rendering HTML page
    res.setHeader('Content-Type','text/html')

    // we can render html as follows but its difficult to render entire page of html hence to
    // render the entire page we use file system and append data of file in res.write(data)
    // res.write("<h1>Hello world</h1>")

    // Using below approch we can only render one html file  
    
    // fs.readFile('./templates/index.html',(err , data)=>{
        //     if(err){
            //         console.log(err);
            //         res.end();
            //     }
            //     else{
                //         res.write(data)
                //         res.end();
                //     }
                // })
                
    // if we change the route the page must also change
    // to get route we can use req.url method
    // Using switch statement we can achieve this

// We also need to set the status codes
// if route is specified correctly then status code must be 200
// if route is not present then set status code 404

// 200 status code means succesfully response is given
// 404 status code means page is not available hence cannnot provide necccessary responce
// for corresponding request
// 301 status code means data or page is moved to sime location
// 500 status code is internal server error

    var path = "./templates"
    switch(req.url){
        case "/":
            path+="/index.html";
            res.statusCode = 200;
            break;
        case "/about":
            path+="/about.html"
            res.statusCode = 200;
            break;
        // the below statement is used so that we navigate to /about even if we type about-me
        case "/about-us":
            res.statusCode = 301
            res.setHeader('Location',"/about")
            res.end();
            break;
        default :
            res.statusCode = 404;
            path+="/Notfound.html"
    }

    // This information about response is stored in the network tab in inspect tab
    // like status code , method (get/post)

    // As the number of links increase , interactions with server and database increase
    // switch statements and all but it becomes more messy
    // hence we use express framework to make all operations even more simple and easy

    fs.readFile(path , (err,data)=>{
        if(err){
            console.log("error occured");
            res.end();
        }else{
            res.end(data);
        }
    })
})

server.listen(3000 , 'localhost' , ()=>{
    console.log("Server is listening to port no 3000");
})

// Note: 
// localhost is the domain which when used it corresponds to the loopbackIP address
// 127.0.0.1 where the server is available
// now inorder to send a request to this server we need a gateway or door 
// hencce we use a port --> it accts as a gate to send a request to server