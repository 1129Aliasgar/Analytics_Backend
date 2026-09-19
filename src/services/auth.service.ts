/**
 * @author aliasgarbootwala@gmail.com
*/

import { inject, injectable } from "inversify";
import { TYPES } from "../config/types.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/token.js";
import { RegisterUserInput ,LoginUserInput, LogoutUserInput} from "../types/auth.types.js";
import Logger from "../utils/logger.js";
import AuthRepository from "../repositories/auth.repository.js";

@injectable()
export class AuthService {
  
  @inject(TYPES.AuthRepository)
  authRepository!: AuthRepository;

  @inject(TYPES.Logger)
  logger!: Logger;

  async register(userData: RegisterUserInput) {
    this.logger.info("Registering user", { email: userData.email });
    
    const existingUser = await this.authRepository.findByEmail(userData.email);
    
    if (existingUser) {
      throw new Error("User already exists");
    }
    
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    const user = await this.authRepository.createUser({ ...userData, password: hashedPassword });

    this.logger.info("User registered", { userId: user.id });
    

    const token = generateToken({
      userId: user.id
    })
    
    return { user, token };
  }

  async login(userData: LoginUserInput) {
    this.logger.info("login try ", {email: userData.email})
    const user = await this.authRepository.findByEmail(userData.email);
    
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(userData.password, user.password);
    
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const token = generateToken({
      userId: user.id
    })
    
    return { user, token };
  }

  async profile(userId: string) {
    this.logger.info("requesting profile", { userId });
    const user = await this.authRepository.findUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  
}

export default AuthService;