import General from '../models/general.js';
import auth from '../middleware/auth.js';
import Router from 'express';

// List of all generals
const generals_list = async (req, res) => {
  const generals = await req.context.models.General.find()
    .select({ 'general_date': 1,
              'general_address' : 1,
              'general_site': 1,
              'general_email': 1,
              '_id': 1 , 
              'general_mobile': 1, 
              'general_title': 1,
              'general_instagram': 1,
              'general_facebook': 1,
              'logo': 1,
              'prices': 1,
              'notes': 1, 
              'createdAt': 1 })
    .sort([['general_date', -1]]);

  return res.send(generals);
};

// View selected general
const general_selected = async(req, res) => {
  const general = await req.context.models.General.findById(
    req.params.generalId,
  );
  return res.send(general);
};

// Create new general
const general_add = async (req, res, next) => {
  try {
    const general = new General(req.body)
    await general.save();
    res.status(201).send({ general })
  } catch (error) {
    res.status(400).send(error)
  }
};

/* Update selected general */
const general_update = async (req, res) => {
  try {
    const general = await req.context.models.General.findByIdAndUpdate(
      req.params.generalId, 
      { general_address: req.body.general_address,
        general_site: req.body.general_site,
        general_date: req.body.general_date,
        general_title: req.body.general_title,
        general_email: req.body.general_email,
        general_mobile: req.body.general_mobile,
        general_instagram: req.body.general_instagram,
        general_facebook: req.body.general_facebook,
        logo: req.body.logo,
        notes: req.body.notes,
        prices: req.body.prices }, 
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

/* Delete selected general */
const general_delete = async (req, res) => {
  const general = await req.context.models.General.findById(
    req.params.generalId,
  );
  if (general) {
    await general.remove();
  }
  return res.send(general);
};

export { 
        generals_list,
        general_selected, 
        general_add,
        general_update,
        general_delete
};