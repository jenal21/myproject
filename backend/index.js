const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./utilities/db');
const userRoutes = require('./routes/user_routes');
const expenseRoutes = require('./routes/expense_routes');

dotenv.config();           
connectDB();               

const app = express();

app.use(cors());          
app.use(express.json());   


app.use('/api/users', userRoutes);
app.use('/api/expenses', expenseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
