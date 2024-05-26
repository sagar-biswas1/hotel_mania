// src/server.ts
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
const { URL } = require('url');
import {
	getRooms,
	getRoomById,
	createRoom,
	updateRoomById,
	deleteRoom,
	patchRoomAvailability,
  } from './controllers';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 4010;

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL || '')
.then(() => {
  console.log("MongoDB connected successfully");
})
.catch((error: Error) => {
  console.error("MongoDB connection error:", error.message);
});

// Middleware
app.use(bodyParser.json());

//health
app.get('/health', (_req, res) => {
	res.status(200).json({ status: 'UP....' });
});

app.use((req, res, next) => {
	const ALLOWED_ORIGINS_STR = process.env.ALLOWED_ORIGINS;
  
	const allowedOrigins = ALLOWED_ORIGINS_STR
	  ? ALLOWED_ORIGINS_STR.split(",").map(url=>url.trim())
	  : [];
  
	const origin = req.headers.origin || "";
  
	if (allowedOrigins.includes(origin)) {
	  res.setHeader("Access-Control-Allow-Origin", origin);
	  next();
	} else {
	  res.status(403).json({ message: "Forbidden to access room service." });
	}
  });


// app.use((req, res, next) => {
//   const ALLOWED_ORIGINS_STR = process.env.ALLOWED_ORIGINS;

//   const allowedOrigins = ALLOWED_ORIGINS_STR
//     ? ALLOWED_ORIGINS_STR.split(",").map(url => url.trim())
//     : [];

//   const origin = req.headers.origin || "";
  
//   // Extract the base URL from the origin
//   const baseUrl = origin ? new URL(origin).origin : "";

//   if (allowedOrigins.includes(baseUrl)) {
//     res.setHeader("Access-Control-Allow-Origin", baseUrl);
//     next();
//   } else {
//     res.status(403).json({ message: "Forbidden to access room..." });
//   }
// });


// Routes
app.get('/rooms', getRooms);
app.post('/room', createRoom);
app.put('/room/:id', updateRoomById);
app.delete('/room/:id', deleteRoom);
app.get('/room/:id', getRoomById);
app.patch('/room-availability/:id', patchRoomAvailability);


// 404 handler
app.use((_req, res) => {
	res.status(404).json({ message: 'Not found' });
});

// Error handler
app.use((err, _req, res, _next) => {
	console.error(err.stack);
	res.status(500).json({ message: 'Internal server error...' });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Room Server is running on port ${PORT}`);
});
