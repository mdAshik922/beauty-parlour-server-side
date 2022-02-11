const express = require('express');
const app = express();
require('dotenv').config();
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.89jki.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
      await client.connect();
      const database = client.db('face_beauty');
      const beautyCallection = database.collection('message');
      const orderCallection = database.collection('order');
      const userCallection = database.collection('users');


    
app.get('/order', async(req, res)=>{
  const email = req.query.email;
  const query = {email: email};
 const order = orderCallection.find(query);
 const result = await order.toArray();
  res.json(result)
});

app.post('/order', async(req,res) =>{
const order = req.body;
const allOrder = await orderCallection.insertOne(order);
    res.json(allOrder);
});

app.post('/message', async(req,res) =>{
const message = req.body;

const allMessage = await beautyCallection.insertOne(message);
    res.json(allMessage);
});

app.post('/users', async(req,res) =>{
const user = req.body;

const allUser = await userCallection.insertOne(user);

    res.json(allUser);
});

app.put ('/users', async(req, res)=>{
  const user = req.body;
  const filter = {email: user.email};
  const options = {upsert: true};
  const updataDocs = {$set: user};
  const result = await userCallection.updateOne(filter, options, updataDocs);
  res.json(result);
});

app.put('/user/admin', async(req, res)=>{
  const user = req.body;
  const filter = {email: user.email};
  const upDateDocs = {$set: {role: 'admin'}};
  const result = await userCallection.updateOne(filter, updataDocs);
  res.json(result);
});


    } finally {
      // Ensures that the client will close when you finish/error
    //   await client.close();
    };
  };
  run().catch(console.dir);


app.get('/', (req, res) =>{
    console.log('thank you');
    res.send('my server');
});

app.listen(port, ()=>{
    console.log('start my last server', port);
});