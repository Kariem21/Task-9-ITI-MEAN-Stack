// console.log("hello from node js");

// const { log } = require('console');
const { log } = require('console');
const express = require('express');
const mongoose = require('mongoose');
var server = express();
const mongoURI = 'mongodb+srv://katef4421:Wg5marNX-STqt5u@cluster0.b1hqu90.mongodb.net/social'; // Replace with your database URL
var Product =  require('./models/product');
// Create a connection to the MongoDB database
// server.use(express.urlencoded({ extended: true }));

// server.use(express.json());

mongoose.connect(mongoURI)
.then(() => { log('db connected') })
.catch(() => { log('db disconnect') });

server.listen('3005', function () {
    console.log('server connected')
});

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
  server.get("/product/:id", function (req, res) {
    let prodId = +req.params.id;
    console.log(prodId);
    Product.findOne({ id: prodId })
      .then((singleProduct) => {
        res.send(singleProduct);
        console.log(singleProduct);

      })
      .catch((err) => {
        console.log(err);
      });
  });
  
// server.get('/product/:id', async (req, res) => {
//     const productId = +req.params.id;
  
//    console.log(productId);
//    Product.findOne({ id: productId })
//    .then((singleProduct) => {
//      res.send(singleProduct);
//    })
//    .catch((err) => {
//      console.log(err);
//    });
//     // try {
//     //   const product = await Product.findOne({ id: productId })
//     //    .then((singleProduct) => {
//     //   res.send(singleProduct);
//     // })
//     // .catch((err) => {
//     //   console.log(err);
//     // });;
  
//     //   if (!product) {
//     //     res.status(404).json({ error: 'Product not found' });
//     //   } else {
//     //     res.json(product);
//     //   }
//     // } catch (error) {
//     //   console.error('Error retrieving product:', error);
//     //   res.status(500).json({ error: 'Internal Server Error' });
//     // }
//   });
  

server.get('/home', (req, res) => {
    res.send('<strong>Welcome to our APIs</strong>');
  });
  server.get('/', (req, res) => {
    res.redirect('/home');
  });
  server.use((req, res) => {
    res.sendStatus(404).json({ error: 'Not Found' });
  });
  // Handle 404 Not Found for all other routes
//   server.use((req, res) => {
//     res.sendStatus(404).json({ error: 'Not Found' });
//   });


//   async function getProducts() {
//     const db = client.db(); // Get a reference to your database
  
//     const productsCollection = db.collection('products'); // Replace 'products' with your collection name
  
//     try {
//       const products = await productsCollection.find({}).toArray();
//       return products;
//     } catch (error) {
//       console.error('Error retrieving products:', error);
//       return [];
//     }
//   }
  
//   // Usage example
//   async function main() {
//     const products = await getProducts();
//     console.log('Products:', products);
//   }
  
//   // Call the main function to retrieve products
//   main()