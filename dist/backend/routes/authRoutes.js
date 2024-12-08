"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.Router)();
const users = []; // Temporary in-memory user store
const SECRET_KEY = 'your-secret-key';
// Register route
router.post('/register', async (req, res) => {
    const { email, password, confirmPassword } = req.body;
    // Check if passwords match
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }
    // Check if user already exists
    const userExists = users.some((user) => user.email === email);
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }
    // Hash the password and save the user
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    users.push({ email, password: hashedPassword });
    return res.status(201).json({ message: 'User registered successfully' });
});
// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    // Find the user by email
    const user = users.find((u) => u.email === email);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    // Validate the password
    const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    // Generate a JWT token
    const token = jsonwebtoken_1.default.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });
    return res.status(200).json({ message: 'Login successful', token });
});
exports.default = router; // Export the router for use in server.ts
