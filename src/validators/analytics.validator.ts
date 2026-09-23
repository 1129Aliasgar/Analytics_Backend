import { optional } from "inversify";
import Joi from "joi";

export const userQuerySchema = Joi.object({
  city: Joi.string().optional(),
  name: Joi.string().optional(),
  search: Joi.string().optional(),
  age: Joi.number().optional().integer().min(1),
  minAge: Joi.number().optional().integer().min(1),
  maxAge: Joi.number().optional().integer().min(1),
  sortBy: Joi.string().optional().valid("age", "name"),
  order: Joi.string().optional().valid("asc", "desc"),
  page: Joi.number().optional().integer().min(1),
  limit: Joi.number().optional().integer().min(1).max(100),
});
