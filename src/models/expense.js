import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
    expense_title: {
      type: String,
      required: true
    }, 
    expense_year: {
      type: Number,
      required: true
    },
    expense_month: {
      type: String,
      required: true,
    }, 
    expense_date: {
      type: Date,
      required: true
    },
    expense_amount: {
      type: Number,
      required: true,
    },
    notes: {
      type: String
    }
  },
  { timestamps: true },
);

/* If user deleted remove all user posts and comments */
/* clientSchema.pre('remove', function(next) {
  this.model('Post').deleteMany({ user: this._id }, next);
  this.model('Comment').deleteMany({ user: this._id }, next);
}); */

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;