const express = require('express');
const userRoutes = require('./routes/userRoutes');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(logger)



app.use('/api/users' , userRoutes);


app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`server running on port.. http://localhost:${PORT}`);
})