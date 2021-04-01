// express is basically used to minimize number of lines
const express = require("express");
const app = express();
const { urlencoded } = express;
const port = 80;

// consolidate and mustache is used to render html files
const engine = require("consolidate");
const path = require("path");

const cors = require("cors");

//cors libarary is for handling security messages from browser(while using xhttp requests)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

// database setup
const mysql = require("mysql");
const { error } = require("console");
const { createConnection } = mysql;

var con = createConnection({
  host: "localhost",
  user: "root",
  password: "philanthropist",
});

con.query("USE blog_website");

app.use("/static", express.static("static")); //for serving static files
app.use(express.static(path.join(__dirname, "public")));
app.use(urlencoded());

app.set("views", path.join(path.dirname(""), "/views")); //for serving templates of html
app.engine("html", engine.mustache);
app.set("view engine", "html");

// when home page is called this call_back function is triggered
app.get("/", (req, res) => {
  res.status(200).render("home.html");
});
app.get("/sign_up", (req, res) => {
  res.status(200).render("sign_up.html");
});

var check = { correct: "" };
app.get("/login", (req, res) => {
  res.status(200).render("index.html");
  check.correct = "";
});
app.get("/posting", (req,res)=>{
  res.status(200).render("posting.html")
})

app.get("/display",(req,res)=>{
  res.status(200).render("display.html")
})

// checking login credentails
app.post("/login_credentials", (req, res) => {
  var Body = req.body;
  console.log(Body);
  email = Body.email;
  pswd = Body.password;

  con.query(
    `select Password from user_database where Email="${email}"`,
    function (err, result) {
      if (err) throw error;
      if (result[0] == undefined) {
        check.correct = "wrong";
        res.send(check);
      } else {
        if (result[0].Password == pswd) {
          check.correct = "correct";
          res.send(check);
        } else {
          check.correct = "wrong";
          res.send(check);
        }
      }
    }
  );
});

// sign credentials
app.post("/sign_up_credentials", (req, res) => {
  var body = req.body;
  console.log(body);
  con.query(
    `insert into user_database values("${body.f_name}", "${body.l_name}", "${body.email}","${body.password}")`,
    function (err, result) {
      if (err) throw err;
      res.send("Done");
    }
  );
});
var car=""
app.post("/publish_credentials",(req,res)=>{
  console.log("working")
  var Body=req.body
  car=Body
  console.log(Body)
})
app.post("/blog_display",(req,res)=>{
  res.send(car)
})

// This function listen to every activity when called
app.listen(port, () => console.log("The application has started successfully"));
