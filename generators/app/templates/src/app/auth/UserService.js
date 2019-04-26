import User from './UserModel';
import jwt from 'jsonwebtoken';
import Environment from '../../config/environments';

const config = Environment.config;

class UserService {
  async find (q) {
    const result = await User.find(q);
    return result;
  }

  async findOne (q) {
    const result = await User.findOne(q);
    return result;
  }

  async create (q) {
    let user = new User(q);
    user.passwordHash = user.createPasswordHash(q.password);
    this.user = await user.save();
    return this.generateJwt();
  }

  async isValidUser (q) {
    let { userName, password } = q;
    let findQuery = { $or: [{ userName: userName }, { email: userName }] };
    let user = await this.findOne(findQuery);
    if (user && user.validatePassword(password, user.passwordHash)) {
      this.user = user;
      return this.generateJwt();
    } else {
      throw new Error('User Not Found');
    }
  }

  generateJwt () {
    let secrect = config.JWT_TOKEN_SECRECT;
    return jwt.sign(
      {
        email: this.user.email,
        fullName: this.user.fullName,
        _id: this.user._id
      }, secrect);
  }
}

export default new UserService();
