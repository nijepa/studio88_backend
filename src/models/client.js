import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const clientSchema = new mongoose.Schema({
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: value => {
        if (!validator.isEmail(value)) {
          throw new Error({error: 'Invalid Email address'})
        }
      }
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    notes: {
      type: String
    },
    picture: {
      type: String
    },
    phone: {
      type: String
    },
    mobile: {
      type: String
    },
    address: {
      type: String
    },
    date_started: {
      type: Date
    },
/*     friends: [ 
      { user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        status: Number,
        enums: [
          0,    //'add friend',
          1,    //'friends',
          2,    //'requested',
        ] 
      } 
    ],
    likes: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Post'} ], */
  },
  { timestamps: true },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }}
);

clientSchema.set('toObject', { virtuals: true })
clientSchema.set('toJSON', { virtuals: true })

clientSchema
  .virtual('name')
  .get(function () {
    let fullname = '';
    if (this.first_name && this.last_name) {
      fullname = this.last_name + ', ' + this.first_name
    }
    if (!this.first_name || !this.last_name) {
      fullname = '';
    }
    return fullname;
});

/* If user deleted remove all user posts and comments */
clientSchema.pre('remove', function(next) {
  this.model('Post').deleteMany({ user: this._id }, next);
  this.model('Comment').deleteMany({ user: this._id }, next);
});

const Client = mongoose.model('Client', clientSchema);

export default Client;