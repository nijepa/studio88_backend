import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
    attend_date: {
      type: Date,
      unique: true,
    },
    notes: {
      type: String
    },
    members: [ 
      { client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client'},
        present: Boolean,
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

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;