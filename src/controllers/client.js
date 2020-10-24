import Client from '../models/client.js';
import auth from '../middleware/auth.js';
import Router from 'express';

const router = Router();

// List of all users
const clients_list = async (req, res) => {
  const clients = await req.context.models.Client.find()
    .select({ 'name': 1, '_id': 1 , 'username':1, 'email':1, 'first_name':1, 'last_name':1, 
                'picture':1, 'isSocial':1, 'friends':1, 'likes':1, 'createdAt':1, 'user_about':1 });

  return res.send(clients);
};

// Create new client
const client_add = async (req, res, next) => {
  try {
    const exists = await Client.findOne({email: req.body.email});
    if (exists) {
      return res.status(401).send({error: 'User allready exists'})
    }
    const client = new Client(req.body)
    await client.save();
    res.status(201).send({ client })
  } catch (error) {
    res.status(400).send(error)
  }
};



// View logged in user profile
const client_profile = async(req, res) => {
  res.send(req.client)
};





/* router.get('/:userId', auth, async (req, res) => {
  const user = await req.context.models.User.findById(
    req.params.userId,
  );
  return res.send(user);
}); */

/* Update selected user */
const client_update = async (req, res) => {
  try {
    const existsEmail = await Client.findOne({_id: { $ne: req.params.userId }, email: req.body.email});
    if (existsEmail) {
      return res.status(401).send({error: 'Email allready exists'})
    }
    const existsUsername = await Client.findOne({_id: { $ne: req.params.userId }, username: req.body.username});
    if (existsUsername) {
      return res.status(401).send({error: 'Username allready exists'})
    } 
    const client = await req.context.models.Client.findByIdAndUpdate(
      req.params.userId, 
      { username: req.body.username,
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone,
        mobile: req.body.mobile,
        address: req.body.address,
        date_started:  req.body.date_started,
        notes: req.body.notes,
        picture: req.body.picture }, 
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
        clients_list,
        client_add, 
        client_profile, 
        client_update
};