import mongoose from 'mongoose';
import { isEmail } from 'validator';
import { UserMiddlerware } from './UserMiddlerware';
import bcrypt from 'bcrypt';

class User extends mongoose.Schema {
  constructor () {
    const UserSchema = {
      firstName: { type: String, lowercase: true, trim: true },
      lastName: { type: String, lowercase: true, trim: true },
      userName: {
        type: String,
        trim: true,
        required: [true, 'required username'],
        unique: true
      },
      email: {
        type: String,
        trim: true,
        required: [true, 'required email'],
        unique: true,
        validate: [isEmail, 'invalid email']
      },
      passwordHash: {
        type: String,
        required: [true, 'required password'],
        trim: true
      }
    };
    const user = super(UserSchema, {
      timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
      }
    });
    user.plugin(UserMiddlerware);
    const validatePassword = (password, passwordHash) => {
      return bcrypt.compareSync(password, passwordHash);
    };
    const createPasswordHash = (password) => {
      return bcrypt.hashSync(password, 10);
    };
    user.methods.validatePassword = validatePassword;
    user.methods.createPasswordHash = createPasswordHash;
    return user;
  }
}
export default mongoose.model('User', new User());
