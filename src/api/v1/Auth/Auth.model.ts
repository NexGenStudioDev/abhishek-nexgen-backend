import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt-nodejs'; 
import { number, string } from 'joi';
import envConstant from 'constant/env.constant';

let AuthSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },

  email: {
    type: String,
    required: true,
    unique: [true, 'Email already exists'],
    lowercase: true, 
  },

  password: {
    type: String,
    min: [6, 'Password should have a minimum length of 6'],
    required: [true, 'Password is required'],
  },

  Technology_tools: [
    {
      name: {
        type: String,
        required: [true, 'Name is required'],
      },

      description: {
        type: String,
        required: [true, 'Description is required'],
      },

      image: {
        type: String,
        required: [true, 'Image is required'],
      },

      link: {
        type: String,
        required: [true, 'Link is required'],
      },
    },
  ],

  role: {
    type: String,
    default: 'Super Admin',
    required: [true, 'Role is required'],
  },
});



AuthSchema.statics.hashPassword = async function (password: string) {
    try {
      let salt = bcrypt.genSaltSync(10);
      let hash = bcrypt.hashSync(password, envConstant.bcryptSalt);
      return hash;
    } catch (error) {
      throw new Error('Error hashing password');
    }
}
  

  AuthSchema.methods.comparePassword = async function (candidatePassword: string) {
    try {
      let Compared_Password = bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
       




        if (err) {
          throw new Error('Error comparing passwords');
        }
    });

    return Compared_Password;
    } catch (error) {
      throw new Error('Error comparing passwords');
    }
  };
  

export default model('Auth', AuthSchema);


