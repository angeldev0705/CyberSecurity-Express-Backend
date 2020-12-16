const mongoose = require('mongoose');
require('dotenv').config();

//const URI ="";
const URI = process.env.DBURL;
var connectionTry=0;
const connectDB = async () => {
  await mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }, 
  function(err, db) {
    if (err) {
        console.log('Unable to connect to the server. Please start the server. Error : ', err);
        if (connectionTry < 4){
          setTimeout(connectDB, 5000);
          console.log('Intento: ' + connectionTry);
        }        
        connectionTry++;
    } else {
        console.log('Db connected..!');
    }
});
  
};

module.exports = connectDB;




/* const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://delpersfiltrer:UrlFilter1987@cluster0.h0qtu.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect()
.then(()=> console.log("db connecte"))
.catch(()=> console.log("error")); */