import mongoose from 'mongoose';

const generalSchema = new mongoose.Schema({
    general_title: {
      type: String,
      required: true
    }, 
    general_address: {
      type: String,
      required: true
    },
    general_site: {
      type: String,
      required: true,
    }, 
    general_email: {
      type: String,
      required: true,
    },
    general_date: {
      type: Date,
      required: true
    },
    general_mobile: {
      type: String,
      required: true,
    },
    general_instagram: {
      type: String
    },
    general_facebook: {
      type: String
    },
    logo: {
      type: String
    },
    prices: [ 
      { 
      price_date: Date,
      price_amount: Number,
      note: String
      } 
    ],
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

const General = mongoose.model('General', generalSchema);

export default General;