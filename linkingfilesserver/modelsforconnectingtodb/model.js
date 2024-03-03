const mongoose  = require("mongoose")
const Schema = mongoose.Schema;

var blogschema = new Schema({
    // title : String,
    // snippet : String,
    // body : String

    // the above statements manily defines the main structure of data which needs to be stored
    // in Db
    // by using above approach we can only specify the key along with one value only
    // to specify other we use below approch
    
    title : {
        type : String,
        required : true
    },
    snippet : {
        type : String,
        required : true
    },
    body : {
        type : String,
        required : true
    }

} , {timestamps : true} )

// we can also pass second argument for Schema constructor
// i.e timestamps = true
// it specifies that mongoose will automatically add timestamps when corresponds to 
// when a specific document is created inside the collection of the database

// creating a model which is having the above schema

const blog = mongoose.model('blog',blogschema)
// the first argument specifies the name of the model and second specifies the schema 
// that the model should have

module.exports = blog;
