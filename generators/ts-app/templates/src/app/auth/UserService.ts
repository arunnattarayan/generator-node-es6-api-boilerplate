import jwt from 'jsonwebtoken';
import Environment from '../../config/environments';
import User from './UserModel';

const config = Environment;

class UserService {
  public user: any;
  public async find(q) {
    const result = await User.find(q);
    return result;
  }

  public async findOne(q) {
    const result = await User.findOne(q);
    return result;
  }

  public async create(q) {
    const user = new User(q);
    user.passwordHash = user.createPasswordHash(q.password);
    this.user = await user.save();
    return this.generateJwt();
  }

  public async isValidUser(q) {
    const { userName, password } = q;
    const findQuery = { $or: [{ userName }, { email: userName }] };
    const user = await this.findOne(findQuery);
    if (user && user.validatePassword(password, user.passwordHash)) {
      this.user = user;
      return this.generateJwt();
    } else {
      throw new Error('User Not Found');
    }
  }

  public generateJwt() {
    const secrect = config.JWT_TOKEN_SECRECT;
    return jwt.sign(
      {
        _id: this.user._id,
        email: this.user.email,
        fullName: this.user.fullName,
      }, secrect);
  }
}

export default new UserService();
