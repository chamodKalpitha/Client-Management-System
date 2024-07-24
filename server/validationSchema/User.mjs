import Joi from "joi";

export const validateRegisterUser = Joi.object({
  name: Joi.string().empty().min(3).required().messages({
    "string.empty": "Name cannot be empty.",
    "string.min": "Name must be at least 3 characters long.",
    "any.required": "Name is a required field.",
  }),
  email: Joi.string().empty().email().required().messages({
    "string.empty": "Email cannot be empty.",
    "string.email": "Email must be a valid email address.",
    "any.required": "Email is a required field.",
  }),
  empId: Joi.string().min(10).required().messages({
    "string.min": "Employee ID must be at least 10 characters long.",
    "any.required": "Employee ID is a required field.",
  }),
  address: Joi.string().optional().messages({
    "string.base": "Address must be a string.",
  }),
  role: Joi.string()
    .valid("Assistant", "Manager", "Admin")
    .default("Assistant")
    .messages({
      "any.only": "Role must be one of Assistant, Manager, or Admin.",
    }),
});
