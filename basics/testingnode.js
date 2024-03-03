var a = require("./run")
//  we can also use
// var {x,y} = require("./run")
// we can print directly x,y

// when ever we import a file using require first we execute the other file
// i.e it will execute run.js file before we execute testingnode.js file

// console.log(x); returns error because its not in this file we cant execute operations on 
// variables present in another files
// console.log(a); returns empty onject if we do not export any data from run.js
 
console.log(a); 
// returns object which are exported their
console.log(a.x);
console.log("will run after");

// var http = require("http");
// var url = require("url");
// var fs =  require("fs");

// http.createServer((req,res)=>{
//     var q = url.parse(req.url,true);
//     var filename = "." + q.pathname;
//     fs.readFile(filename, (err, data)=>{
//         if (err) {
//           res.writeHead(404, {'Content-Type': 'text/html'});
//           return res.end("404 Not Found");
//         } 
//         res.writeHead(200, {'Content-Type': 'text/html'});
//         res.write(data);
//         return res.end();
//       });
// }).listen(5051);
// console.log("server is listening to port 8081");