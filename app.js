var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose') ;
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// var expressHbs = require('express-hbs');
const expressHbs = require('express-handlebars') ;


var app = express();

const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs' , expressHbs({defaultLayout : 'layout' , extname : '.hbs' , handlebars: allowInsecurePrototypeAccess(Handlebars)}));



//  const hbs = exphbs.create({
//   defaultLayout: 'layout', 
//   extname: '.hbs',
//   handlebars: allowInsecurePrototypeAccess(Handlebars)
// });
 
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



/****/

mongoose.connect('mongodb://localhost/Shopping-cart' ,{useNewUrlParser : true  , useCreateIndex : true,  useUnifiedTopology: true  } ,(error)=>{
  if(error){
    console.log(error)
   
  }
  console.log('Connecting to DB .....');
})
/*****/
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


var port=3000;
app.listen(port,function(){
console.log('server started on port '+port);
})
;
module.exports = app;






