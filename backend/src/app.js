import express from 'express';
import { createServer } from 'node:http';//used while making a server using http module of node js mainly used for socket io and real time applications
// import { Server } from 'socket.io'; write in socketManager.js and import it here to keep the code clean and organized
import mongoose from 'mongoose';
import { connectToSocket } from './controllers/socketManager.js';//node:http is a built in module of node js which is used to create a server and handle http requests and responses and createServer is a method of http module which is used to create a server and it takes a callback function as an argument which is called when a request is made to the server and it takes two arguments req and res which are the request and response objects respectively 

import UserRouter from './routes/users.routes.js'
import cors from 'cors';
const app = express();
const server = createServer(app);//createServer used to connect the express instance i.e app to the socket.io server also we added the app in server so that we can use the express routes and socket io together
const io = connectToSocket(server)
//using above when we run server app and io are there in the same server and we can use both of them together
app.set("port",process.env.PORT || 8000);//setting the port for the server to listen on either from environment variable or default to 8000

app.use(cors());//using cors middleware to allow cross origin requests from frontend to backend and also to allow socket io connections from frontend to backend
app.use(express.json({limit:"40kb"}));//using express json middleware to parse the json data sent from frontend to backend in the request body and also to send json data from backend to frontend in the response body json data is in string format and we need to parse it to javascript object to use it in our code and also to send json data from backend to frontend we need to stringify it to send it in the response body and also we set the limit of json data to 40kb to prevent the server from crashing due to large json data being sent from frontend to backend 
app.use(express.urlencoded({limit:"40kb", extended:true}));//parse data coming from html form and also to send data from backend to frontend in the response body in urlencoded format and also we set the limit of urlencoded data to 40kb to prevent the server from crashing due to large urlencoded data being sent from frontend to backend or vice versa and also we set extended to true to allow nested objects in urlencoded data


app.use("/api/v1/users",UserRouter)


const start =async () => {
    const connection =await mongoose.connect("mongodb+srv://rushikeshbhoyar1567_VideoConference:5hqgv7nQIdQY9G4Z@cluster0.blcfgbw.mongodb.net/?appName=Cluster0")
    console.log(`Connected to MongoDB Host : ${connection.connection.host}`);
// app.listen(8000,()=>{
//     console.log("Listening on port 8000");
// })//we are not using this because  express app is not used to listen on the port when we are using socket io because socket io needs to use the server created by http module to listen on the port and handle the socket io connections and events
server.listen(app.get("port"),()=>{
   console.log("Listening on port 8000");
 } );

}

start();