const express = require('express');
const cors = require('cors');
require('dotenv').config();


const taskRoutes = require('./routes/taskRoutes');
const app = express();

const PORT  = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());
app.use('/api/tasks', taskRoutes);


app.use((req, res) => {
    res.status(404).json({success : false, message : 'API route not found'});
})


app.listen(PORT, () => {
    `server running on PORT http://localhost${PORT}`;
});
