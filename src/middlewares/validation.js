const Joi = require('joi');

const UserRole = {
  ADMIN: 'admin',
  USER: 'user',
};
const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'Please provide a valid email',
            'any.required': 'Email is required'
        }),
    
    password: Joi.string()
        .required()
        .messages({
            'any.required': 'Password is required'
        })
});
const registerSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'Please provide a valid email',
            'any.required': 'Email is required'
        }),
    role: Joi.string()
        .valid(UserRole.ADMIN,UserRole.USER)
        .messages({
            'any.required': 'Role is required'
        }),
    
    password: Joi.string()
        .required()
        .messages({
            'any.required': 'Password is required'
        }),
    username: Joi.string()
        .required()
        .messages({
            'any.required': 'Username is required'
        })
});


const validateRequest = (schema) => {



  return (req, res, next) => {

    // Validate the request body against the schema
    const { error, value } = schema.validate(req.body, {
      abortEarly: false, // Return all errors, not just the first one
      stripUnknown: true // Remove fields that are not in the schema
    });
    
    if (error) {
      // Format the error messages nicely
      const errorMessage = error.details.map((detail) => detail.message).join(', ');
      
      // Return 400 Bad Request with the error details
      return res.status(400).json({
        status: 'error',
        message: errorMessage
      });
    }

    // IMPORTANT: Replace req.body with the validated 'value'
    // This ensures you are working with the clean, type-converted data
    req.body = value;
    
    next();
  };
};
module.exports = {
    loginSchema,
    validateRequest,
    registerSchema
};


