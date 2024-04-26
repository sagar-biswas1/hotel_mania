// src/server.ts
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { createBooking, deleteBooking, getBookings,updateBooking,getBookingById } from './controllers';
import dotenv from 'dotenv';



dotenv.config();

const app = express();
const PORT = process.env.PORT || 4008;

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
	res.status(200).json({ status: 'UP' });
});

// Routes
// Routes
app.get('/booking', getBookings);
app.post('/booking', createBooking);
app.put('/booking/:id', updateBooking);
app.delete('/booking/:id', deleteBooking);
app.get('/booking/:id', getBookingById);


// 404 handler
app.use((_req, res) => {
	res.status(404).json({ message: 'Not found' });
});

// Error handler
app.use((err, _req, res, _next) => {
	console.log(_req.url)
	// console.error(err.stack);
	res.status(500).json({ message: 'Internal server error...' });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
