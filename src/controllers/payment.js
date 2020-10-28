import Payment from '../models/payment.js';
import auth from '../middleware/auth.js';
import Router from 'express';

// List of all payments
const payments_list = async (req, res) => {
  const payments = await req.context.models.Payment.find()
    .select({ 'payment_period': 1, '_id': 1 , 'price': 1, 'notes': 1, 'createdAt': 1, 'members': 1 })
    .populate({path: 'members', populate: { path:'client', select: 'first_name last_name picture mobile email'}});

  return res.send(payments);
};

// View selected payment
const payment_selected = async(req, res) => {
  const payment = await req.context.models.Payment.findById(
    req.params.paymentId,
  ).populate({path: 'members', populate: { path:'client', select: 'first_name last_name picture mobile email'}});
  return res.send(payment);
  // res.send(req.client)
};

// Create new payment
const payment_add = async (req, res, next) => {
  try {
    const exists = await Payment.findOne({title: req.body.payment_period});
    if (exists) {
      return res.status(401).send({error: 'Period allready exists'})
    }
    const payment = new Payment(req.body)
    await payment.save();
    res.status(201).send({ payment })
  } catch (error) {
    res.status(400).send(error)
  }
};

/* Update selected payment */
const payment_update = async (req, res) => {
  try {
    const existsEmail = await Payment.findOne({_id: { $ne: req.body._id }, title: req.body.payment_period});
    if (existsEmail) {
      return res.status(401).send({error: 'Period allready exists'})
    }
    const payment = await req.context.models.Payment.findByIdAndUpdate(
      req.params.paymentId, 
      { payment_period: req.body.payment_period,
        price: req.body.price,
        notes: req.body.notes,
        members: req.body.members }, 
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

export { 
        payments_list,
        payment_selected, 
        payment_add,
        payment_update
};