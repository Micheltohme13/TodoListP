
import express from 'express';
import authRoutes from './backend/routes/authRoutes';

import cors from 'cors';

const app = express();
const PORT = 5000;


app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Server is running!');
});


app.use('/auth', authRoutes);





app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

