import Users from '../database/models/Users';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs/promises';
import * as bcrypt from 'bcryptjs';

const secret = fs.readFile('jwt.evaluation.key', 'utf-8');

export default class AuthService {
  private users = Users;

  public async findByName(email: string) {
    const user = await this.users.findOne({ where: { email } });
    if (!user) {
      return null;
    }

    return user;
  }

  public async compare(password: string, passwordUser: string) {
   return await bcrypt.compare(password, passwordUser);
  }

  public async tokenGenerator(email: string, username: string, role: string) {
    const token = jwt.sign({ email, username, role }, await secret, { expiresIn: '7d', algorithm: 'HS256' });
  
    return token;
  }
}