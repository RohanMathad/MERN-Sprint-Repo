import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import taskRoutes from './routes/taskRoutes.js';
import projectRoutes from './routes/projectRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api/tasks', taskRoutes);
app.use('/api/projects', projectRoutes);

// NEVER USE THIS IN PROD.. as it can accidentally drop tables or corrupt data 
// sequelize.sync({alter : true})
//     .then(() => console.log('db synced withe the sequelized model'))
//     .catch((err) => console.log('sync error - ', err));

app.use((req, res) => {
    res.status(404).json({ success: false, message: 'API route not found' });
});

app.listen(PORT, () => {
    console.log(`server running on PORT http://localhost:${PORT}`);
});
