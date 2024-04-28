import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import { createUser, getUserById, updateUser,getUsers,deleteUser } from './controllers';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/health', (_req, res) => {
	res.status(200).json({ status: 'UP' });
});

app.use((req, res, next) => {
	const ALLOWED_ORIGINS_STR = process.env.ALLOWED_ORIGINS;
  
	const allowedOrigins = ALLOWED_ORIGINS_STR
	  ? ALLOWED_ORIGINS_STR.split(",").map(url=>url.trim())
	  : [];
  
	const origin = req.headers.origin || "";
	console.log(req.headers)
	console.log(allowedOrigins, {origin});
	if (allowedOrigins.includes(origin)) {
	  res.setHeader("Access-Control-Allow-Origin", origin);
	  next();
	} else {
	  res.status(403).json({ message: "Forbidden" });
	}
  });

// routes
app.get('/users/:id', getUserById);
app.post('/users', createUser);
app.put('/users/:id', updateUser);
app.delete('/users/:id', deleteUser);
app.get('/users', getUsers);

// 404 handler
app.use((_req, res) => {
	res.status(404).json({ message: 'Not found' });
});

// Error handler
app.use((err, _req, res, _next) => {
	console.error(err.stack);
	res.status(500).json({ message: 'Internal server error' });
});

const port = process.env.PORT || 4000;
const serviceName = process.env.SERVICE_NAME || 'User-Service';

app.listen(port, () => {
	console.log(`${serviceName} is running on port ${port}`);
});
