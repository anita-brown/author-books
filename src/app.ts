import  createError, { HttpError } from 'http-errors';
import express, { NextFunction, Request, Response }  from 'express';

import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import authorRouter from './routes/authorRoute'
import bookRouter from './routes/bookRoute'
// import postRouter from './routes/post';
import mongoConnection from "./config/mongoConnection";
import usersRouter from './routes/users';
import cors from 'cors';

const corsOptions = {
  origin: ["http://localhost:3000","http://localhost:5500"],
  optionsSuccessStatus: 200
}

// const mongoURL = process.env.DATABASE as string,

var app = express();
// view engine setup
app.set('views', path.join(__dirname, '../../views'));
app.set('view engine', 'jade');

app.use((req, res, next) => {
  // allow different IP address
  res.setHeader('Access-Control-Allow-Origin', '*');
  // allow different header field 
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, OPTIONS');

  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(cors(corsOptions));




//Mongo Connection


// app.use('/posts', postRouter);
app.use('/book', bookRouter);
app.use('/users', usersRouter);
app.use('/author', authorRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err:HttpError, req:Request, res:Response, next:NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




export default app;


