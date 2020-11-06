import Expense from '../models/expense.js';
import auth from '../middleware/auth.js';
import Router from 'express';

// List of all expenses
const expenses_list = async (req, res) => {
  const expenses = await req.context.models.Expense.find()
    .select({ 'expense_date': 1,
              'expense_year' : 1,
              'expense_month': 1,
              '_id': 1 , 
              'expense_amount': 1, 
              'expense_title': 1,
              'notes': 1, 
              'createdAt': 1 })
    .sort([['expense_date', -1]]);

  return res.send(expenses);
};

// View selected expense
const expense_selected = async(req, res) => {
  const expense = await req.context.models.Expense.findById(
    req.params.expenseId,
  );
  return res.send(expense);
};

// Create new expense
const expense_add = async (req, res, next) => {
  try {
    const expense = new Expense(req.body)
    await expense.save();
    res.status(201).send({ expense })
  } catch (error) {
    res.status(400).send(error)
  }
};

/* Update selected expense */
const expense_update = async (req, res) => {
  try {
    const expense = await req.context.models.Expense.findByIdAndUpdate(
      req.params.expenseId, 
      { expense_year: req.body.expense_year,
        expense_month: req.body.expense_month,
        expense_date: req.body.expense_date,
        expense_title: req.body.expense_title,
        expense_amount: req.body.expense_amount,
        notes: req.body.notes }, 
      function (err, docs) { 
        if (err){ 
          res.status(500).send(err)
        } 
        else{ 
          return res.send(docs);
        } 
    });
  } catch(error) {
    res.status(500).send(error)
  }
}; 

/* Delete selected expense */
const expense_delete = async (req, res) => {
  const expense = await req.context.models.Expense.findById(
    req.params.expenseId,
  );

  if (expense) {
    await expense.remove();
  }
  return res.send(expense);
};

export { 
        expenses_list,
        expense_selected, 
        expense_add,
        expense_update,
        expense_delete
};