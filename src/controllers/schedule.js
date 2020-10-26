import Schedule from '../models/schedule.js';
import auth from '../middleware/auth.js';
import Router from 'express';

// List of all schedules
const schedules_list = async (req, res) => {
  const schedules = await req.context.models.Schedule.find()
    .select({ 'title': 1, '_id': 1 , 'weekday': 1, 'duration': 1,  
              'startTime': 1, 'notes': 1, 'createdAt': 1, 'members': 1 })
    .populate('client', 'first_name last_name picture mobile email');

  return res.send(schedules);
};

// Create new schedule
const schedule_add = async (req, res, next) => {
  try {
    const exists = await Schedule.findOne({title: req.body.title});
    if (exists) {
      return res.status(401).send({error: 'Title allready exists'})
    }
    const schedule = new Schedule(req.body)
    await schedule.save();
    res.status(201).send({ schedule })
  } catch (error) {
    res.status(400).send(error)
  }
};

// View selected schedule
const schedule_selected = async(req, res) => {
  const schedule = await req.context.models.Schedule.findById(
    req.params.scheduleId,
  );
  return res.send(schedule);
  // res.send(req.client)
};

/* Update selected schedule */
const schedule_update = async (req, res) => {
  try {
    const existsEmail = await Schedule.findOne({_id: { $ne: req.body._id }, title: req.body.title});
    if (existsEmail) {
      return res.status(401).send({error: 'Title allready exists'})
    }
    const schedule = await req.context.models.Schedule.findByIdAndUpdate(
      req.params.scheduleId, 
      { title: req.body.title,
        weekday: req.body.weekday,
        startTime: req.body.startTime,
        duration: req.body.duration,
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

export { 
        schedules_list,
        schedule_add, 
        schedule_selected, 
        schedule_update
};