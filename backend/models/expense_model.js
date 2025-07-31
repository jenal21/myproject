const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  
  category: {
    type: String,
    default: 'General'
  },

  date: {
    type : Date,
    default : Date.now
  },

  user :{
    type: mongoose.Schema.Types.ObjectId,
    ref : 'User',
    required :true
  }
},  {timetamps: true});

module.exports = mongoose.model('Expense', expenseSchema);
