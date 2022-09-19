const express  = require('express')
const app = express()
const router = require('./routes/index')

const mongoose = require('mongoose')

const port = 3001
const uri = "mongodb://localhost:27017"


app.use(express.json())

app.use("/",router)

mongoose.connect(uri,{useNewUrlParser:true})

const conn = mongoose.connection

conn.on("open",()=>{
    console.log(`server is connected with db`);
})



app.listen(port,()=>{
    console.log(`server is started at ${port}`);
})
