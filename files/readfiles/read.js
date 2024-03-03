var fs = require("fs")

// readFile is an asynchronous function hence it returns a callback function 
// ones the data from the specified file is read

// since it is asynchronous it returns a callback --> (err,data) is callback function

// disadvantage : major disadvantage of this approach is it starts reading the contents of the 
// file only after it reads the complete data from file 
// hence we use streams in which we extract the data and simultaneously we read data.
 
fs.readFile("./random.txt",(err,data)=>{
    if(err){
        console.log(err);
    }else{
        // console.log(data);
        // it returns buffer as ones data is read it is tranferred onto a buffer

        console.log(data.toString());
    }
})
// the below statements executes first as readFile method is asynchronous in nature
console.log("hello");

// using streams ffor faster reading
// in which we load and simultaneously read data just like movie
// in movie complete movie is not loaded firstly load some data and then display it 
// this same procedure is repeates for streams where a buffer is maintained and 
// soon the buffer is filled it will print data . And data in each buffer is called as chunk

// i.e shuncks of data will be read

// createReadStream method used to implement this stream concept 
// This method is synchronous hence it does not return any call back function

var readfile = new fs.createReadStream("./random.txt");

// 'on' is an event just like events in JS 
// "data" corresponds to the entire data and chunk refers to small part of data

// it is asynchronous hence returns the call back function
readfile.on("data" , (chunk)=>{
    console.log("\n ---New Chunk DATA --- \n");
    // console.log(chunk);
    // returns buffer data
    console.log(chunk.toString())
    // for this entire data iss loaded in single chunk
})
console.log("heelo");
// it gets printede before because of asynchronous nature of above method