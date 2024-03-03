var fs = require("fs");

// aim:
// check whether the specified file is present or not 

// using exitsSync method check whether the file exits or not if exits remove

if(fs.existsSync("./test.txt")){
    fs.unlink("./test.txt",(err)=>{
        if(err){
            console.log(err);
        }
        console.log("file deleted");
    })
}