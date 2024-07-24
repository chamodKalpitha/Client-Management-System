const LoginValidationSchema = {
  email: {
    notEmpty: {
      errorMessage: "Please enter your email address.",
    },
    isEmail: {
      errorMessage: "Please enter a valid email address.",
    },
  },
  password: {
    notEmpty: {
      errorMessage: "Please enter your password.",
    },
    isLength: {
      options: {
        min: 8,
      },
      errorMessage: "Password must be at least 8 characters long.",
    },
  },
  rememberMe: {
    notEmpty: {
      errorMessage: "Remember me can't be empty",
    },
    isBoolean: {
      errorMessage: "Remember me Invalid Input",
    },
  },
};

export default LoginValidationSchema;
