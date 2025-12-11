const express = require('express');
const router = express.Router();
const { addExpenses, bulkAddExpenses, getExpenses, deleteExpense, getTotalExpense, updateExpense, getExpenseReport } = require('../controllers/expense_controller');
const verifyToken = require('../middleware/auth');

router.post('/add', verifyToken, addExpenses);

router.get('/all', verifyToken, getExpenses);
router.delete('/:id', verifyToken, deleteExpense);
router.get('/total', verifyToken, getTotalExpense);
router.put('/:id', verifyToken, updateExpense);
router.get('/report', verifyToken, getExpenseReport);



module.exports = router;
