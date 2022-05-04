import * as jwt from 'jsonwebtoken';
import * as fs from 'fs/promises';
import * as bcrypt from 'bcryptjs';
import Users from '../database/models/Users';

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
}

export const compare = (password: string, passwordUser: string) => bcrypt
  .compare(password, passwordUser);

export const tokenGenerator = async (email: string, username: string, role: string) => jwt
  .sign({ email, username, role }, await secret, { expiresIn: '7d', algorithm: 'HS256' });
