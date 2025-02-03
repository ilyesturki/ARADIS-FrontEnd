export const credentialsSignInValidationRules = {
  email: {
    required: true,
    pattern: /\S+@\S+\.\S+/, // Basic email pattern
  },
  password: {
    required: true,
  },
};

export const verifyUserValidationRules = {
  mat: { required: true },
  firstName: { required: true },
  lastName: { required: true },
  email: {
    required: true,
    pattern: /\S+@\S+\.\S+/,
  },
  phone: { required: false },
  status: { required: false },
  image: {
    required: false,
    customValidator: (value: string) =>
      !["image/jpeg", "image/png", "image/gif"].includes(value)
        ? "Please select a valid image file (JPEG, PNG, or GIF)."
        : null,
  },
};

export const activateValidationRules = {
  mat: { required: true },
  token: { required: true },
};

export const setPasswordValidationRules = {
  mat: { required: true },
  token: { required: true },
  password: { required: true },
};

export const verifyBasicDetailsValidationRules = {
  name: { required: true },
  email: {
    required: true,
    pattern: /\S+@\S+\.\S+/,
  },
  image: {
    customValidator: (value: string) =>
      !["image/jpeg", "image/png", "image/gif"].includes(value)
        ? "Please select a valid image file (JPEG, PNG, or GIF)."
        : null,
  },
};
