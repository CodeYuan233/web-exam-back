var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var db = require("./db/sql");

var indexRouter = require("./routes/index");
var apiRouter = require("./routes/apiRouter");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

app.use((req, res, next) => {
  //登陆拦截绕过注册请求
  if (req.headers.student) {
    next();
  } else if (req.headers.token) {
    let id = req.headers.token;
    db.queryby({
      model_name: "users",
      data: { id },
      callBack: (rst) => {
        if (!rst.result) {
          res.send({
            error_code: 403,
            reason: "账号不存在",
            result: null,
          });
        } else if (Date.now() > rst.result[0].expires) {
          console.log("123");
          res.send({
            error_code: 402,
            reason: "token已过期，请重新登录",
            result: null,
          });
        } else {
          next();
        }
      },
    });
  } else if (req.url != "/admin/login") {
    res.send({
      error_code: 401,
      reason: "您还没有登录,请先登录",
      result: null,
    });
  } else {
    next();
  }
});

app.use("/admin", apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
