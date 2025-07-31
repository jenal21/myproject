const Expense = require('../models/expense_model');

const addExpenses = async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;

    console.log("Incoming Request Body:", req.body)
    console.log("User from token:", req.user)
    if (!title || !amount) {
      return res.status(400).json({ message: 'Title and amount are required' });
    }

    const newExpense = new Expense({
      title,
      amount,
      category,
      date,
      user: req.user._id  
    });

    await newExpense.save();

    res.status(201).json({ message: 'Expense added successfully', expense: newExpense });
  } catch (error) {
    res.status(500).json({ message: 'Error adding expense', error: error.message });
  }
};




const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching expenses', error });
  }
};



const deleteExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;
    const deleted = await Expense.findOneAndDelete({ _id: expenseId, user: req.user._id });

    if (!deleted) {
      return res.status(404).json({ message: 'Expense not found or unauthorized' });
    }

    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting expense', error });
  }
};



const getTotalExpense = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id });
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    res.status(200).json({ total });
  } catch (error) {
    res.status(500).json({ message: 'Failed to calculate total expense', error });
  }
};

const updateExpense = async (req, res) => {
  try {
    const { title, amount } = req.body;
    const updatedExpense = await Expense.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { title, amount },
      { new: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.status(200).json({ message: 'Expense updated', updatedExpense });
  } catch (error) {
    res.status(500).json({ message: 'Update failed', error });
  }
};



module.exports = { addExpenses, getExpenses, deleteExpense, getTotalExpense, updateExpense };

