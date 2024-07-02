const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const colors = require("colors");
const dotenv =  require("dotenv");
const connectDB = require("./config/db")
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middlewares/errorMiddleware");


// this is used to load the data from .env file
dotenv.config();

// rest Object
const app = express();

connectDB();

//middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(morgan("dev"))
app.use(errorHandler)



const PORT = process.env.PORT || 8080;

app.use("/api/v1/auth",authRoutes);

// listen server
app.listen(PORT,()=>{
    console.log(`server connected in ${process.env.DEV_MODE} mode on port number ${PORT}`.bgBlue.white);
})