const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/user");
const dotenv = require("dotenv");
const fileupload = require("express-fileupload");
const bodyParser = require("body-parser");


const app = express();
dotenv.config();
app.use(bodyParser.json());
mongoose.set('strictQuery', true);

mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true, useUnifiedTopology: true },()=>{
    console.log("connected to database");
});

app.use(fileupload({useTempFiles:true}));



app.use("/",router)


app.listen(3000,()=>{
    console.log("server is running at port 3000");
})