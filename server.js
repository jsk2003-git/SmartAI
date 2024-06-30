const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const colors = require("colors");
const dotenv =  require("dotenv");

// this is used to load the data from .env file
dotenv.config();

// rest Object
const app = express();


//middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(morgan("dev"))

const PORT = process.env.PORT || 8080;
// listen server
app.listen(PORT,()=>{
    console.log(`server connected in ${process.env.DEV_MODE} mode on port number ${PORT}`.bgBlue.white);
})