const express = require('express');
const router = express.Router();
const { addExpenses, getExpenses, deleteExpense, getTotalExpense, updateExpense } = require('../controllers/expense_controller');
const verifyToken = require('../middleware/auth');

router.post('/add', verifyToken, addExpenses);
router.get('/all', verifyToken, getExpenses);
router.delete('/:id', verifyToken, deleteExpense);
router.get('/total', verifyToken, getTotalExpense);
router.put('/:id', verifyToken, updateExpense);



module.exports = router;
