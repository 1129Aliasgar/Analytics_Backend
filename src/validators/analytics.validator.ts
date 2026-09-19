import { Agent } from "https";
import Joi from "joi";

export const userQuerySchema = Joi.object({
  city: Joi.string().optional(),
  name: Joi.string().optional(),
  search: Joi.string().optional(),
  age: Joi.number().optional(),
  minAge: Joi.number().optional(),
  maxAge: Joi.number().optional(),
});
