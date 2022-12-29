const cookieParser = require('cookie-parser')
const RouteWork = require('./routes/RoutesWork')
const mongoose = require("mongoose");
const express = require("express");
const app = express();
require("dotenv").config();


mongoose.set('strictQuery',false)

mongoose.connect(process.env.MONOGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});



app.use(express.json());
express.urlencoded({ extended: true });
app.use(cookieParser());

app.use(RouteWork);


const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log("SERVER is Active");
})

