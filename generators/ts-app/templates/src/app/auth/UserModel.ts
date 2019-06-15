import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { isEmail } from 'validator';
import { UserMiddlerware } from './UserMiddlerware';

class User extends mongoose.Schema {
  public user: mongoose.Schema;
  constructor() {
    const UserSchema = {
      email: {
        required: [true, 'required email'],
        trim: true,
        type: String,
        unique: true,
        validate: [isEmail, 'invalid email'],
      },
      firstName: { type: String, lowercase: true, trim: true },
      lastName: { type: String, lowercase: true, trim: true },
      passwordHash: {
        required: [true, 'required password'],
        trim: true,
        type: String,
      },
      userName: {
        required: [true, 'required username'],
        trim: true,
        type: String,
        unique: true,
      },
    };
    const user = super(UserSchema, {
      timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      },
    });
    this.user = user;
    this.user.plugin(UserMiddlerware);
    const validatePassword = (password, passwordHash) => {
      return bcrypt.compareSync(password, passwordHash);
    };
    const createPasswordHash = (password) => {
      console.log(password);
      return bcrypt.hashSync(password, 10);
    };
    this.user.methods.validatePassword = validatePassword;
    this.user.methods.createPasswordHash = createPasswordHash;
    return this.user;
  }
}
export default mongoose.model('User', new User());
