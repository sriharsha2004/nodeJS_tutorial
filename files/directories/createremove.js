var fs = require("fs");

// aim:
// check whether the specified directoruy is present or not 
// if not create dir ele remove dir
// while rem we need to check if it exits or not then only we can remove otherwise it returns
// exception

// using exitsSync method check whether the direcctory exits or not if not create else remobe

if(!fs.existsSync("./assets")){
    // mkdir --> asynchronous --> returns callback --> (err)
    fs.mkdir("./assets",(err)=>{
        if(err){
            console.log(err);
        }
    })
    console.log("created successfully");
}else{
    fs.rmdir("./assets" , (err)=>{
        if(err){
            console.log(err);
        }
    });
    console.log("removes directory succesfully");
}
