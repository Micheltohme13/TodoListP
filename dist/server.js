"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoutes_1 = __importDefault(require("./backend/routes/authRoutes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 5000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Add a root route to confirm server is running
app.get('/', (req, res) => {
    res.send('Server is running!');
});
// Use auth routes
app.use('/auth', authRoutes_1.default);
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
