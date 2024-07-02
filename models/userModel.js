const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Username is mandatory"]
    },
    email:{
        type:String,
        required:[true,"email is mandatory"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"password is mandatory"],
        minlength:[6,"password should be 6 characters long"]
    },
    customerId:{
        type:String,
        default:""
    },
    subscription:{
        type:String,
        default:""
    }
});


// This line defines a pre-save middleware function for the Mongoose schema userSchema. 
// The function will run before a user document is saved to the database. It uses async to 
// handle asynchronous operations within the function.

// This checks if the password field of the document has been modified. 
// If the password hasn't been modified,
// the function calls next() to pass control to the next middleware function without rehashing the password.
// This generates a salt using bcrypt.genSalt(10), where 10 is the number of rounds to process the data for
// This hashes the password field of the document using the generated salt. The await keyword ensures that the function waits for the hashing process to complete before proceeding.
//  The hashed password is then assigned back to the password field.

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,hash);
    next();
});


userSchema.methods.matchPassword = async function (password) {
        return await bcrypt.compare(password, this.password);
};
      
      //SIGN TOKEN
userSchema.methods.getSignedToken = function (res) {
        const acccesToken = JWT.sign(
          { id: this._id },
          process.env.JWT_ACCESS_SECRET,
          { expiresIn: process.env.JWT_ACCESS_EXPIREIN }
        );
        const refreshToken = JWT.sign(
          { id: this._id },
          process.env.JWT_REFRESH_TOKEN,
          { expiresIn: process.env.JWT_REFRESH_EXIPREIN }
        );
        res.cookie("refreshToken", `${refreshToken}`, {
          maxAge: 86400 * 7000,
          httpOnly: true,
        });
};

const User = mongoose.model("User",userSchema);

module.exports=User;