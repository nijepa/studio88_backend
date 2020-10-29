import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    payment_year: {
      type: Number,
      required: true
    },
    payment_month: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 35
    },
    notes: {
      type: String
    },
    members: [ 
      { client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client'},
      payment_date: Date,
      payment_amount: Number,
      note: String
      } 
    ], 
  },
  { timestamps: true },
);

/* If user deleted remove all user posts and comments */
/* clientSchema.pre('remove', function(next) {
  this.model('Post').deleteMany({ user: this._id }, next);
  this.model('Comment').deleteMany({ user: this._id }, next);
}); */

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;