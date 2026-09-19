import { injectable, inject } from "inversify";
import { TYPES } from "../config/types.js";
import AnalyticsRepository from "../repositories/analytics.repository.js";
import Logger from "../utils/logger.js";

@injectable()
export class AnalyticsService {
  @inject(TYPES.AnalyticsRepository)
  analyticsRepository!: AnalyticsRepository;

  @inject(TYPES.Logger)
  logger!: Logger;

  async getUsers(city?: string, name?: string, search?: string , age?: number , minAge?: number, maxAge?: number , sortBy?: string, order?: "asc" | "desc") {
    const users = await this.analyticsRepository.getUsers();
    
    if (users.length === 0) {
      throw new Error(`No users found`);
    }
    
    const result = users.filter((user) => {
      return (
        city ? user.city.toLowerCase() === city.toLowerCase() : true)
        &&
        (name ? user.name.toLowerCase() === name.toLowerCase() : true)
        &&
        (search ? user.city.toLowerCase().includes(search.toLowerCase()) || user.name.toLowerCase().includes(search.toLowerCase()) : true)
        &&
        (age ? user.age === age : true)
        &&
        (minAge ? user.age >= minAge : true)
        &&
        (maxAge ? user.age <= maxAge : true);
    });

    if (result.length === 0) {
      throw new Error(`No users found`);
    }

    if (sortBy) {
      result.sort((a, b) => {
        if (sortBy === 'age') {
          return order === "desc"
            ? b.age - a.age
            : a.age - b.age;
        }

        if (sortBy === 'name') {
          return order === "desc"
            ? b.name.localeCompare(a.name)
            : a.name.localeCompare(b.name);
        }

        return 0;
      });
    }
    
    return result;
  }

  async getUserById(id: number) {
    const user = await this.analyticsRepository.getUserById(id);
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return user;
  }
  
}
