import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import express from 'express';
import { loginRouter } from './routes/loginRoutes';

const app = express()
// implement middlewares // should always be right after creating the app
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieSession({keys:['admin']}))

// implement cutomized routers
app.use(loginRouter)

// let the server listen to port 9000
app.listen(9000, ()=>{
    console.log("Listening on port:9000");
});