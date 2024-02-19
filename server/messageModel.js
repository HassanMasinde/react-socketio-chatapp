/* messageModel.js

const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  readStatus: { type: Boolean, default: false }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
*/
const mongoose = require('mongoose');
//const  Message  = require('./messageModel'); // Import the getDb function

// Define the schema for the message model
const messageSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  readStatus: { type: Boolean, default: false }
});

// Define the message model using the schema
const Message = mongoose.model('Message', messageSchema);

Message.ensureIndexes().then(()=>{
console.log("collectionis ready")
}).catch((err)=>{
console.log("collection not ready",err)})

module.exports = Message;

