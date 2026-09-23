/**
 * @author aliasgarbootwala@gmail.com
 */

import { injectable, inject } from "inversify";
import { User } from "../models/user.model.js";
import { RegisterUserInput } from "../types/auth.types.js";
import { BlacklistToken } from "../models/blacklistToken.model.js";

@injectable()
export class AuthRepository {
  async createUser(userData: RegisterUserInput) {
    return await User.create(userData);
  }

  async findByEmail(email: string) {
    return await User.findOne({ email }).select("+password");
  }

  async findUserById(id: string) {
    return await User.findById(id);
  }

  async isTokenBlacklisted(token: string) {
    return await BlacklistToken.findOne({ token });
  }

  async createToken(token: string) {
    return await BlacklistToken.create({ token });
  }
}
export default AuthRepository;
