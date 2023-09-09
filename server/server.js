var compression = require('express-compression')
const express = require('express');
require('dotenv').config();
const {questionRouter, postQuestionsRoute, updateHelpful, updateAnswer, addQuestion , reportAnswer, reportQuestion} = require('./questionRoutes.js')
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const basePath = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe';
const reviewsRouter = require('./reviewsRoutes.js');
const db = require('./db.js');
const Promise = require("bluebird");
const {getProduct, getStyles} = require('./controller.js')

// Create Express app
const app = express();

// Set up headers for API requests
let params = {
  headers: { Authorization: process.env.TOKEN }
};

// Set the port for the server to listen on
const port = 3000;

// Use compression middleware to compress responses
app.use(compression());

// Set up body parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the client's 'dist' directory
app.use(express.static(path.join(__dirname, '..', '/client/dist')));

// Middleware to set authorization header
app.use((req, res, next) => {
  if (!req.headers.authorization) {
    req.headers.authorization = process.env.TOKEN;
  }
  next();
});


//Amelia's section
app.use('/reviews', reviewsRouter);


//--------------------------------------------------------------------------------------

//Victor's section
app.put("/helpful/:question_id", (req,res) => {
  updateHelpful(req)
})

app.put("/helpful/:answer_id/answer", (req,res) => {
  updateAnswer(req)
})

app.post("/questions/:question_id" , (req, res) => {
  postQuestionsRoute(req)
})

app.get("/questions/:product_id", (req,res) => {
  questionRouter(req).then((result) => {
    res.send(result)
  })
})

app.post("/addQuestion/:product_id", (req,res) => {
  addQuestion(req)
})

app.put("/reportQuestion/:question_id", (req,res) => {
  reportQuestion(req)
})

app.put("/reportAnswer/:answer_id", (req,res) => {
  reportAnswer(req)
})

// this is Ratings & Reviews section
app.use('/reviews', reviewsRouter);


//-------------------------------------------------------------------------------------
// Heith section

//View Images
app.get('/api/images', getStyles);

app.get('/api/product', getProduct);

//for load testing verification
app.get('/loaderio-99691c5b04268daffcb3c06df4d0ef4d.txt', (req, res) => {
  res.end('loaderio-99691c5b04268daffcb3c06df4d0ef4d');
});

//-------------------------------------------------------------------------------------------

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})