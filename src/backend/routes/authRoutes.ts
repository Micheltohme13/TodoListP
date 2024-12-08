

import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

const router = Router();
const SECRET_KEY = 'your-secret-key'; 


const usersFilePath = path.join(__dirname, 'users.json'); 


const readUsersFromFile = (): { email: string; password: string }[] => {
  if (!fs.existsSync(usersFilePath)) {
    fs.writeFileSync(usersFilePath, JSON.stringify([])); 
  }
  const fileData = fs.readFileSync(usersFilePath, 'utf8');
  return JSON.parse(fileData || '[]');
};


const writeUsersToFile = (users: { email: string; password: string }[]) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2)); 
};


router.post('/register', async (req: Request, res: Response): Promise<Response> => {
  const { email, password, confirmPassword } = req.body;

  
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  
  const users = readUsersFromFile();

  
  const userExists = users.some((user) => user.email === email);
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ email, password: hashedPassword });

 
  writeUsersToFile(users);

  return res.status(201).json({ message: 'User registered successfully' });
});


router.post('/login', async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

 
  const users = readUsersFromFile();

 
  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  
  const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });

  return res.status(200).json({ message: 'Login successful', token });
});

export default router; 
