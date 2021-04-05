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

// login-session setup
var session = require("express-session");
app.use(
  session({
    name: "Session_Id",
    saveUninitialized: false,
    resave: false,
    resave: false,
    secret: "auth",
    Cookie: {
      sameSite: true,
      secure: false,
    },
  })
);

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


var redirecthome = (req, res, next) => {
  if (req.session.userId) {
    res.redirect("/");
  } else {
    next();
  }
};
var redirectlogin = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect("/login");
  } else {
    next();
  }
};

app.get("/my_blogs", redirectlogin,(req, res) => {
  res.status(200).render("about_user.html");
});
app.get("/sign_up", redirecthome, (req, res) => {
  res.status(200).render("sign_up.html");
});

var check = { correct: "" };
app.get("/login", redirecthome, (req, res) => {
  res.status(200).render("index.html");
  check.correct = "";
});
app.get("/posting", redirectlogin,(req, res) => {
  res.status(200).render("posting.html");
});

app.get("/display",(req, res) => {
  res.status(200).render("display.html");
});
app.get("/categories",(req,res)=>{
  res.status(200).render("categories.html")
})


// xml requests
// checking login credentails
app.post("/login_credentials", (req, res) => {
  var Body = req.body;
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
          req.session.userId = email;
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
var car = "";
app.post("/publish_credentials", (req, res) => {
  console.log("working");
  var Body = req.body;
  con.query(
    `insert into user_blog_database values("${req.session.userId}",'${JSON.stringify(Body.content)}')`,
    function (err, result) {
      if (err) throw err;
      car = Body;
    }
  );
  console.log(Body);
});
app.post("/view_myblog", (req, res) => {
  console.log("working");
  var Body = req.body;
  car=Body
})
app.post("/blog_display", redirectlogin,(req, res) => {
  res.send(car);
});
var user_credentials = {};
app.post("/user_information", (req, res) => {
  if (!req.session.userId) {
    res.send(user_credentials);
  } else {
    con.query(
      `select Name, Last_Name from user_database where Email="${req.session.userId}"`,
      function (err, result) {
        if (err) throw error;
        console.log(result);
        user_credentials.Email = req.session.userId;
        user_credentials.Name = result[0].Name;
        user_credentials.Last_Name = result[0].Last_Name;
        console.log(user_credentials);
        res.send(user_credentials);
      }
    );
  }
});
app.post("/blogs_information",(req,res)=>{
  con.query(`select content from user_blog_database where Email_Id="${req.session.userId}"`,function(err,result){
    if(err) throw error;
    res.send(result)
  })
})

// This function listen to every activity when called
app.listen(port, () => console.log("The application has started successfully"));
