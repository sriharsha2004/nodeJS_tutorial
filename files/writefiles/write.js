var fs = require('fs');

// writeFile is an asynchronous function hence it returns a callback function 
// it is used to wwrite data into the specified file
// in case file path doesnt exist it will create a file and then write contents onto the file
// in case file path already exists then it will ovverride the contens which are already in
// the file with the new contens passed as an argument

// since it is asynchronous it returns a callback --> (err,data) is callback function

// disadvantage : major disadvantage of this approach is it starts reading the contents of the 
// file only after it reads the complete data from file 
// hence we use streams in which we extract the data and simultaneously we read data.
 

fs.writeFile("./towrite.txt" , "hello programming world" , (err,data)=>{
    if(err){
        console.log(err);
    }else{
        console.log("data is written");
    }
})


// fs.writeFile("./autocreatefileqwhennofile.txt" , "hello programming world" , (err,data)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log("data is written");
//     }
// })


// we also have writeStream similar to readStream

var readfile = new fs.createReadStream("./random.txt" , {encoding : "utf-8"} );
var writefile = new fs.createWriteStream("./streamwriting.txt")

readfile.on("data" , (chunk)=>{
    console.log("\n ---New Chunk DATA --- \n");
    // console.log(chunk);
    // returns buffer data
    // console.log(chunk.toString())
    // if we dont what to convert it into string we can provide encoding format as utf.

    writefile.write(chunk);
    // for this entire data iss loaded in single chunk
})

// we can also use directly below line to transfer contents
// readfile.pipe(writefile) --> other way for stream process