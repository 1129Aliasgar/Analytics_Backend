import { injectable } from "inversify";
import { User } from "../types/analytics.types.js";

@injectable()
export class AnalyticsRepository {
  private users: User[] = [
    {
      id: 1,
      name: "John",
      city: "Mumbai",
      age: 30,
    },
    {
      id: 2,
      name: "Ali",
      city: "Pune",
      age: 25,
    },
    {
      id: 3,
      name: "Sarah",
      city: "Mumbai",
      age: 35,
    },
    {
      id: 4,
      name: "David",
      city: "Delhi",
      age: 40,
    },
    {
      id: 5,
      name: "Alice",
      city: "Hydrabad",
      age: 22,
    },
  ];

  async getUsers(): Promise<User[]> {
    return this.users;
  }

  async getUserById(id: number): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }
}

export default AnalyticsRepository;
