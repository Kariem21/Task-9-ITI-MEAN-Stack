// const fileSystem=require('fs')

// fileSystem.readFile('mydata.txt',function(err,content){
//     console.log(content.toString());//callback
// })

// console.log('hello');

// const validator=require('validator')

// console.log(validator.isEmail('amira@gmail.com'));
const express = require("express");
var mongoose = require("mongoose");
var Product = require("./models/product");
var server = express();

//middleware
//post request ->encoding
//decode

server.use(express.urlencoded({ extended: true }));

server.use(express.json());

//connect to database

mongoose
  .connect(
    "mongodb+srv://katef4421:Wg5marNX-STqt5u@cluster0.b1hqu90.mongodb.net/social"
  )
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log("error connection to database");
  });

//  /products  ->get(),
//apis ->functions
//1
server.get("/products", function (req, res) {
  Product.find()
    .then((productsData) => {
      res.send(productsData);
    })
    .catch((err) => {
      res.send({
        error: "Error getting product",
      });
    });
});
//  /product/:id  ->get(),
//2
//url params ->req.params
server.get("/product/:id", function (req, res) {
  let prodId = +req.params.id;
  Product.findOne({ id: prodId })
    .then((singleProduct) => {
      res.send(singleProduct);
    })
    .catch((err) => {
      console.log(err);
    });
});

server.post("/addProduct", function (req, res) {
  let productData = req.body;
  let newProduct = new Product({
    id: +productData.id,
    title: productData.title,
    price: +productData.price,
    image: productData.image,
    isAvaliable: productData.isAvaliable,
  });

  newProduct
    .save()
    .then((msg) => {
      res.send({
        msg: "product added successfuly",
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

server.put("/product/:id", function (req, res) {
  let prodId = +req.params.id;
  Product.updateOne(
    { id: prodId },
    {
      title: "apple tv",
    }
  )
    .then((msg) => {
      res.send({
        msg: "product updated successfuly",
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
server.delete("/product/:id", function (req, res) {
  let prodId = +req.params.id;
  Product.deleteOne({ id: prodId })
    .then((msg) => {
      res.send({
        msg: "product deleted successfuly",
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

server.listen(3002, function () {
  console.log("server connected");
});