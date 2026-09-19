/**
 * @author aliasgarbootwala@gmail.com
*/

import { injectable, inject } from "inversify";
import { UserModel } from "../models/user.model.js";
import { RegisterUserInput } from "../types/auth.types.js";

@injectable()
export class AuthRepository {
  
  async createUser(userData:RegisterUserInput) {
    return await UserModel.create(userData);
  }
  
  async findByEmail(email: string) {
    return await UserModel.findOne({ email }).select("+password");
  }

  async findUserById(id: string) {
    return await UserModel.findById(id);
  }
  
}
export default AuthRepository;
