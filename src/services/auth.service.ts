/**
 * @author aliasgarbootwala@gmail.com
 */

import { inject, injectable } from "inversify";
import { TYPES } from "../config/types.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/token.js";
import {
  RegisterUserInput,
  LoginUserInput,
  LogoutUserInput,
  ProfileUserInput,
} from "../types/auth.types.js";
import Logger from "../utils/logger.js";
import AuthRepository from "../repositories/auth.repository.js";
import { STATUS_CODE } from "../constants/statusCode.js";
import ApiError from "../utils/apiError.js";

@injectable()
export class AuthService {
  @inject(TYPES.AuthRepository)
  authRepository!: AuthRepository;

  @inject(TYPES.Logger)
  logger!: Logger;

  @inject(TYPES.ApiError)
  apiError!: ApiError;

  async register(userData: RegisterUserInput) {
    this.logger.info("Registering user", { email: userData.email });

    const existingUser = await this.authRepository.findByEmail(userData.email);

    if (existingUser) {
      this.logger.error("User already exists", { email: userData.email });
      throw new ApiError("User already exists", STATUS_CODE.CONFLICT);
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = await this.authRepository.createUser({
      ...userData,
      password: hashedPassword,
    });

    const checknewUser = await this.authRepository.findUserById(user.id);

    if (!checknewUser) {
      throw new ApiError(
        "Something went wrong while registering",
        STATUS_CODE.INTERNAL_SERVER_ERROR,
      );
    }

    this.logger.info("User registered", { userId: user.id });

    const token = generateToken({
      userId: user.id,
    });

    return { user: checknewUser, token };
  }

  async login(userData: LoginUserInput) {
    this.logger.info("login try ", { email: userData.email });
    const user = await this.authRepository.findByEmail(userData.email);

    if (!user) {
      this.logger.error("User not found", { userId: userData.email });
      throw new ApiError("User not found", STATUS_CODE.NOT_FOUND);
    }

    const isPasswordValid = await bcrypt.compare(
      userData.password,
      user.password,
    );

    if (!isPasswordValid) {
      this.logger.error("Invalid password", { userId: userData.email });
      throw new ApiError("Invalid password", STATUS_CODE.UNAUTHORIZED);
    }

    const token = generateToken({
      userId: user.id,
    });

    return { user, token };
  }

  async profile(UserData: ProfileUserInput) {
    this.logger.info("requesting profile", { userId: UserData.userId });

    const isValid = await this.authRepository.isTokenBlacklisted(
      UserData.token,
    );

    if (isValid) {
      this.logger.error("token is not valid", { userId: UserData.userId });
      throw new ApiError("token is not valid", STATUS_CODE.UNAUTHORIZED);
    }

    const user = await this.authRepository.findUserById(UserData.userId);

    if (!user) {
      this.logger.error("User not found", { userId: UserData.userId });
      throw new ApiError("User not found", STATUS_CODE.NOT_FOUND);
    }

    return user;
  }

  async logout(token: LogoutUserInput) {
    this.logger.info("logout try for");

    const isBlacklisted = await this.authRepository.isTokenBlacklisted(token.token);

    if (isBlacklisted) {
      this.logger.error("token is already blacklisted");
      throw new ApiError("token is already blacklisted", STATUS_CODE.UNAUTHORIZED);
    }

    const result = await this.authRepository.createToken(token.token);

    return result;
  }
}

export default AuthService;
