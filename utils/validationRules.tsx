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

export const fpsProblemValidationRules = {
  qid: { required: true },
  type: { required: true },
  quoi: { required: true },
  ref: { required: true },
  quand: { required: true },
  ou: { required: true },
  comment: { required: true },
  combien: { required: true },
  pourqoui: { required: true },
  clientRisck: { required: true },
  userCategory: { required: true },
  userService: { required: true },
  image: {
    customValidator: (value: string) => {
      console.log(value);
      if (value) {
        return !["image/jpeg", "image/png", "image/gif"].includes(value)
          ? "Please select a valid image file (JPEG, PNG, or GIF)."
          : null;
      }
      return null;
    },
  },
  images: {
    customValidator: (value: string) => {
      if (value) {
        const imagesFiles = value.split(",");
        console.log(value);
        console.log(imagesFiles);
        for (let i = 0; i < imagesFiles.length; i++) {
          if (
            !["image/jpeg", "image/png", "image/gif"].includes(imagesFiles[i])
          ) {
            return "Please select a valid image file (JPEG, PNG, or GIF).";
          }
        }
      }
      return null;
    },
  },
};

export const FpsDefensiveActionsRules = {
  qid: { required: true },
  fpsData: {
    required: true,
    customValidator: (value: string) => {
      if (value) {
        const fpsData = JSON.parse(value);
        for (let i = 0; i < fpsData.length; i++) {
          if (
            !fpsData[i].procedure ||
            !fpsData[i].userCategory ||
            !fpsData[i].userService ||
            !fpsData[i].quand
          ) {
            return "Please fill in all required fields.";
          }
        }
      }
      return null;
    },
  },
};
