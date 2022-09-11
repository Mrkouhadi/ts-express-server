import {NextFunction, Router} from 'express';
import {Request, Response} from 'express';

interface RequestWithBody extends Request {
    body: {[key:string]:string | undefined}
}
// create a middleware
const requireAuth=(req:Request,res:Response, next:NextFunction)=>{
    if(req.session && req.session.loggedIn){
        next();
        return;
    }
}

// create our custom login router
const loginRouter = Router();

// show the login form
loginRouter.get("/login", (request:Request, response:Response)=>{
    response.send(`
        <form method="POST">
            <div>
                <label>Email</label>
                <input name="email" type="email" placeholder="type your Email" required />
            </div>
            <div>
                <label>Password</label>
                <input name="password" type="password" placeholder="type your password" required/>
            </div>
            <button>submit</button>
        </form>
    `)
});

// get details from users when they POST their login details
loginRouter.post("/login", (request:RequestWithBody, response:Response)=>{
    const {email, password} = request.body
    
    if(email && password && email==='admin@brifel.com' && password === "admin" ) {
        request.session = {loggedIn : true};
        response.redirect('/')
    } else{
        response.send("Invalid Email/password !")
    }
});

// logout
loginRouter.get("/logout", (req:Request,res:Response)=>{
    req.session = undefined
    res.redirect('/')
})
// protected route
loginRouter.get("/protected", requireAuth,(req:Request,res:Response)=>{
    res.send("Welcome to our protected router; only for logged in users !")
})
// index
loginRouter.get('/', (req:Request,res:Response)=>{
    if(req.session && req.session.loggedIn){
        res.send(`
            <div>
                <h1>You are logged in as Admin</h1>
                <a href="/logout">Logout</a>
            </div>
        `)
    }else{
        res.send(`
        <div>
            <h1>You are logged in as Admin</h1>
            <a href="/login">login</a>
        </div>
    `)
    }
})


export {loginRouter}