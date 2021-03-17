// express is basically used to minimize number of lines
const express=require("express");
const app=express();
const {urlencoded}=express;
const port=80;

// consolidate and mustache is used to render html files
const engine=require("consolidate");
const path =require("path");

// body-parser it is responsible for parsing the incoming request bodies 
const bodyparser=require("body-parser");
const cors = require('cors');

//cors libarary is for handling security messages from browser(while using xhttp requests)  
app.use(cors())

app.use('/static',express.static('static'))     //for serving static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(urlencoded())

app.set('views', path.join(path.dirname('') , '/views'))    //for serving templates of html
app.engine('html',engine.mustache)
app.set('view engine', 'html')

// when home page is called this call_back function is triggered
app.get("/",(req,res)=>{
    res.status(200).render('home.html')
})

// this function listen to every activity when called
app.listen(port,()=>
    console.log("The application has started successfully")
)
// hello