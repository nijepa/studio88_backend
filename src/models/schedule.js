import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
    title: {
      type: String,
      unique: true,
    },
    weekday: {
      type: Array,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
      default: 60
    },
    notes: {
      type: String
    },
    members: [ 
      { client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client'},
        start_date: Date,
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

const Schedule = mongoose.model('Schedule', scheduleSchema);

export default Schedule;