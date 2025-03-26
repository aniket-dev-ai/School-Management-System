const env = require('dotenv').config();
const app = require('./src/app');
const config = require('./src/config/config');
const dbConnection = require('./src/database/db');


dbConnection()

app.listen(config.PORT , ()=>{
    console.log("Server is running on port " + config.PORT);
})