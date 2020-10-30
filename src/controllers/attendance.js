import Attendance from '../models/attendance.js';
import auth from '../middleware/auth.js';
import Router from 'express';

// List of all attendances
const attendances_list = async (req, res) => {
  const attendances = await req.context.models.Attendance.find()
    .select({ '_id': 1 , 'attend_date': 1, 'notes': 1, 'createdAt': 1, 'members': 1 })
    .populate({path: 'members', populate: { path:'client', select: 'first_name last_name picture mobile email'}});

  return res.send(attendances);
};

// View selected attendance
const attendance_selected = async(req, res) => {
  const attendance = await req.context.models.Attendance.findById(
    req.params.attendanceId,
  ).populate({path: 'members', populate: { path:'client', select: 'first_name last_name picture mobile email'}});
  return res.send(attendance);
  // res.send(req.client)
};

// Create new attendance
const attendance_add = async (req, res, next) => {
  try {
    const exists = await Attendance.findOne({attend_date: req.body.attend_date});
    if (exists) {
      return res.status(401).send({error: 'Date allready exists'})
    }
    const attendance = new Attendance(req.body)
    await attendance.save();
    res.status(201).send({ attendance })
  } catch (error) {
    res.status(400).send(error)
  }
};

/* Update selected attendance */
const attendance_update = async (req, res) => {
  try {
    const existsEmail = await Attendance.findOne({_id: { $ne: req.body._id }, attend_date: req.body.attend_date});
    if (existsEmail) {
      return res.status(401).send({error: 'Date allready exists'})
    }
    const attendance = await req.context.models.Attendance.findByIdAndUpdate(
      req.params.attendanceId, 
      { attend_date: req.body.attend_date,
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
        attendances_list,
        attendance_selected, 
        attendance_add,
        attendance_update
};