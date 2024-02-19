const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId; // Import ObjectId from mongodb

// Import database functions and models
const { connectToDb, getDb } = require("./db");

// Initialize Express app
const app = express();
const server = http.createServer(app);

// Set up CORS
app.use(cors());
// Parse JSON bodies
app.use(express.json());

// Connect to the database
let db;
connectToDb((err) => {
    if (!err) {
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
        db = getDb();
    } else {
        console.error("Error connecting to the database:", err);
        process.exit(1); // Exit the application if unable to connect to the database
    }
});

// Define route handlers
app.get('/messages', (req, res) => {
    db.collection('messages')
        .find()
        .sort({ 'User ID': 1 })
        .toArray()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.error("Error fetching messages:", err);
            res.status(500).json({ error: 'Could not fetch the documents' });
        });
});

app.post('/messages', (req, res) => {
    const message = req.body;
    db.collection('messages')
        .insertOne(message)
        .then((result) => {
            res.status(201).json(result);
        })
        .catch((err) => {
            console.error("Error creating a new document:", err);
            res.status(500).json({ error: 'Could not create a new document' });
        });
});

app.delete('/messages/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) { // Fixed typo: changed 'isvalid' to 'isValid'
        db.collection('messages')
            .deleteOne({ _id: new ObjectId(req.params.id) })

            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                console.error("Error deleting message:", err);
                res.status(500).json({ error: 'Could not delete the document' });
            });
    } else {
        res.status(400).json({ error: 'Invalid message ID' }); // Return 400 for invalid message ID
    }
});


// Create Socket.IO instance
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "DELETE"], // Added DELETE method
    },
});

// Socket.IO event listeners
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});
