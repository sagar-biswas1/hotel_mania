import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();
import { Request, Response, NextFunction } from "express";



const auth = async (req: Request, res: Response, next: NextFunction) => {
	if (!req.headers['authorization']) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	try {
		const token = req.headers['authorization']?.split(' ')[1];
	
		const { data } = await axios.post(
			`${process.env.AUTH_ENDPOINT}/auth/verify-token`, // Endpoint for the POST request
			{
			  accessToken: token, // Data sent in the request body
			},
			{
			  headers: {
				ip: req.ip,
				'user-agent': req.headers['user-agent'],
				origin: process.env.API_GATEWAY_URL, 
			  },
			}
		  );
		  

		req.headers['x-user-id'] = data.user.id;
		req.headers['x-user-email'] = data.user.email;
		req.headers['x-user-name'] = data.user.name;
		req.headers['x-user-role'] = data.user.role;

		next();
	} catch (error) {
		console.log('[auth middleware]', error);
		return res.status(401).json({ message: 'Unauthorized' });
	}
};

 const varifyAdmin =(req: Request, res: Response, next: NextFunction)=>{
   if(req.headers["x-user-role"]!=="user"){
        return res.status(401).json({
            message:"Unauthorized...."
        })
    }
    next()
}

const middlewares = { auth, varifyAdmin };

export default middlewares;