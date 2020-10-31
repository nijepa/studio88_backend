import Client from '../models/client.js';
import auth from '../middleware/auth.js';
import Router from 'express';

const router = Router();

// List of all clients
const clients_list = async (req, res) => {
  const clients = await req.context.models.Client.find()
    .select({ 'name': 1, '_id': 1 , 'email': 1, 'first_name': 1, 'last_name': 1, 
                'picture': 1, 'phone': 1, 'mobile': 1, 'address': 1, 'createdAt': 1, 
                'instagram': 1, 'facebook': 1, 'notes': 1, 'active': 1, 'date_started': 1 })
    .sort([['last_name', 1]]);

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

// View client profile
const client_profile = async(req, res) => {
  const client = await req.context.models.Client.findById(
    req.params.clientId,
  );
  return res.send(client);
  // res.send(req.client)
};

/* Update selected client */
const client_update = async (req, res) => {
  try {
    const existsEmail = await Client.findOne({_id: { $ne: req.body._id }, email: req.body.email});
    if (existsEmail) {
      return res.status(401).send({error: 'Email allready exists'})
    }

    const client = await req.context.models.Client.findByIdAndUpdate(
      req.params.clientId, 
      { email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone,
        mobile: req.body.mobile,
        instagram: req.body.instagram,
        facebook: req.body.facebook,
        address: req.body.address,
        date_started:  req.body.date_started,
        notes: req.body.notes,
        picture: req.body.picture,
        active: req.body.active }, 
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

/* Delete selected client */
const client_delete = async (req, res) => {
  const client = await req.context.models.Client.findById(
    req.params.clientId,
  );

  if (client) {
    await client.remove();
  }
  return res.send(client);
};

export { 
        clients_list,
        client_add, 
        client_profile, 
        client_update,
        client_delete
};