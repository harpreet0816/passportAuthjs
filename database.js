const mongoose = require("mongoose")
exports.connectMongoose = ()=>{
    mongoose.connect("mongodb://127.0.0.1:27017/passport")
    .then(() => {
       console.log("Database connected");
    })
    .catch((error) => {
       console.error("Error connecting to the database:", error);
    });}
    const userSchema = mongoose.Schema({
        name: {
            type: String,
        },
        username: {
            type: String, 
            unique: true, 
            required: true
        }, 
        password: String
    })
    exports.User = mongoose.model("User", userSchema);