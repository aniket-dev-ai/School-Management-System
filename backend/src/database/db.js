const mongoose = require('mongoose');
const config = require('../config/config');


const dbConnection = async()=>{
    mongoose.connect(config.MONGO_URI).then(()=>{
        console.log("Database connected successfully ");
    }).catch((err)=>{
        console.log(err.message);
    })
}

module.exports = dbConnection;