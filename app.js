const express = require("express");
const app = express();
const ejs = require("ejs");
const passport = require("passport");
const expressSession = require("express-session")
const {connectMongoose, User} = require("./database.js");
const { initializingPassport } = require("./passportConfig.js");
connectMongoose();

initializingPassport(passport)

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: "secret"
}))
app.use(passport.initialize());
app.use(passport.session())


app.set("view engine", "ejs")
// console.log(connectMongoose)
app.get("/", async(req, res)=>{
    res.render("index")
})

app.get("/register", (req, res)=>{
    res.render("register")
})

app.get("/login", (req, res)=>{
    res.render("login")
})
app.post("/register", async(req, res)=>{
    const user = await User.findOne({username: req.body.username});
    if(user) return res.status(400).send(`this ${req.body.username} also exits`);
    console.log(req.body)
    const newUser = await User.create(req.body);
    res.status(200).send(newUser)
})

app.post("/login", passport.authenticate("local", {failureRedirect:"/register", successRedirect: "/"}), (req, res)=>{
 res.send("logged in")
})

app.listen(3000, ()=> {
    console.log("app is listening at port 3000")
})