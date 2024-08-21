import Joi from "joi";

export const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Please enter your email address.",
      "string.email": "Please enter a valid email address.",
    }),

  password: Joi.string().min(8).required().messages({
    "string.empty": "Please enter your password.",
    "string.min": "Password must be at least 8 characters long.",
  }),

  rememberMe: Joi.boolean().required().messages({
    "any.required": "Remember me can't be empty",
    "boolean.base": "Remember me Invalid Input",
  }),
});
