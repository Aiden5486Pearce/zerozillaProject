const app = require('./app');

const dotenv = require('dotenv');

const connectDatabase = require('./config/database')

//Handling uncaught Exception

process.on('uncaughtException', (err)=>{
    console.log(`Error:${err.message}`);
    console.log('shutting down the server due to uncaught exception')
    process.exit(1);
})

dotenv.config({path:"config/config.env"});

connectDatabase();
const server = app.listen(process.env.PORT,()=>{
    console.log(`server is working on http://localhost:${process.env.PORT}`)
})

//unhandked rejection

process.on('unhandledRejection', (err)=>{
    console.log(`Error:${err.message}`);
    console.log(`shutting down the server due to unhandled promise rejection`)
    server.close(()=>{
        process.exit(1);
    });
});