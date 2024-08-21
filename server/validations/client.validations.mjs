import Joi from "joi";

export const createClientSchema = Joi.object({
  name: Joi.string().empty().min(3).required().messages({
    "string.empty": "Name cannot be empty",
    "string.min": "Name must be at least 3 characters long",
    "any.required": "Name is a required field",
  }),
  email: Joi.string().empty().email().required().messages({
    "string.empty": "Email cannot be empty",
    "string.email": "Email must be a valid email address",
    "any.required": "Email is a required field",
  }),
  mobileNumber: Joi.string().empty().required().messages({
    "string.empty": "Mobile number cannot be empty",
    "any.required": "Mobile number is a required field",
  }),
  hasWhatsapp: Joi.boolean().empty().required().messages({
    "boolean.base": "Has Whatsapp must be a boolean",
    "any.required": "Has Whatsapp is a required field",
  }),
  address: Joi.string().empty().required().messages({
    "string.empty": "Address cannot be empty",
    "any.required": "Address is a required field",
  }),
}).options({
  abortEarly: false,
});

export const editClientSchema = Joi.object({
  id: Joi.string().hex().length(24).messages({
    "string.hex": "Invalid Id",
    "string.length": "Invalid Id",
  }),
  name: Joi.string().empty().min(3).optional().messages({
    "string.empty": "Name cannot be empty",
    "string.min": "Name must be at least 3 characters long",
    "any.required": "Name is a required field",
  }),
  email: Joi.string().empty().email().optional().messages({
    "string.empty": "Email cannot be empty",
    "string.email": "Email must be a valid email address",
    "any.required": "Email is a required field",
  }),
  mobileNumber: Joi.string().empty().optional().messages({
    "string.empty": "Mobile number cannot be empty",
    "any.required": "Mobile number is a required field",
  }),
  hasWhatsapp: Joi.boolean().empty().optional().messages({
    "boolean.base": "Has Whatsapp must be a boolean",
    "any.required": "Has Whatsapp is a required field",
  }),
  address: Joi.string().empty().optional().messages({
    "string.empty": "Address cannot be empty",
    "any.required": "Address is a required field",
  }),
}).options({
  abortEarly: false,
});
