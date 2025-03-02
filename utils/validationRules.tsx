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
  fpsId: { required: true },
  type: { required: true },
  quoi: { required: true },
  ref: { required: true },
  quand: { required: true },
  ou: { required: true },
  comment: { required: true },
  combien: { required: true },
  pourquoi: { required: true },
  clientRisk: { required: true },
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

export const fpsImmediateActionsValidationRules = {
  fpsId: { required: true },
  alert: { required: true },
  startSorting: { required: true },
  sortingResults: {
    required: true,
    customValidator: (value: string) => {
      if (value) {
        const sortingResults = JSON.parse(value);
        for (let i = 0; i < sortingResults.length; i++) {
          if (
            !sortingResults[i].product ||
            !sortingResults[i].sortedQuantity ||
            !sortingResults[i].quantityNOK ||
            !sortingResults[i].userCategory ||
            !sortingResults[i].userService
          ) {
            return "Please fill in all required fields for all sorting results.";
          }
          console.log(sortingResults[i]);
        }
      }
      return null;
    },
  },
  concludeFromSorting: { required: true },
  immediateActions: {
    required: true,
    customValidator: (value: string) => {
      if (value) {
        const immediateActions = JSON.parse(value);
        for (let i = 0; i < immediateActions.length; i++) {
          if (
            !immediateActions[i].description ||
            !immediateActions[i].userCategory ||
            !immediateActions[i].userService
          ) {
            return "Please fill in all required fields for all immediate actions.";
          }
        }
      }
      return null;
    },
  },
};

export const fpsCauseValidationRules = {
  fpsId: { required: true },
  whyList: {
    required: true,
  },
  causeList: {
    required: true,
  },
};

export const FpsDefensiveActionsRules = {
  fpsId: { required: true },
  defensiveActions: {
    required: true,
    customValidator: (value: string) => {
      if (value) {
        const defensiveActions = JSON.parse(value);
        for (let i = 0; i < defensiveActions.length; i++) {
          if (
            !defensiveActions[i].procedure ||
            !defensiveActions[i].userCategory ||
            !defensiveActions[i].userService ||
            !defensiveActions[i].quand
          ) {
            return "Please fill in all required fields for all defensive actions.";
          }
        }
      }
      return null;
    },
  },
};

export const fpsValidationValidationRules = {
  fpsId: { required: true },
  status: { required: true },
};
