var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const PORT = 5000;
var indexRouter = require('./routes/index');
var founderRouter = require('./routes/founder');
var employeeRouter = require('./routes/employee');
var aboutRouter = require('./routes/about');
var signRouter = require('./routes/user');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(cors());
const mongoose = require('mongoose');



app.listen(PORT,()=>{
  console.log(`Server is running http://localhost:${PORT}`);
})

mongoose.connect('mongodb://127.0.0.1:27017/Teqheal').then(()=> console.log('Connected MongoDb')).catch(error => console.error("Database not connected" ,error))




app.use(express.json());
app.set('view engine', 'jade');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use('/images', express.static(path.join(__dirname, 'routes', 'images')));

app.use('/images', express.static(path.join(__dirname, 'routes', 'images')));
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);


app.use('/founder', founderRouter);
app.use('/about', aboutRouter);
app.use('/employee', employeeRouter);
app.use('/user', signRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});



app.post("/fileupload", (req, res) => {
  res.send("success");
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
