import express from 'express';
import userRoutes from './routes/userRoutes.js';
import logger from './middleware/logger.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(logger);

app.use('/api/users', userRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`server running on port.. http://localhost:${PORT}`);
});
