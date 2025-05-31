interface FieldValidationRules {
    [fieldName: string]: {
      required?: boolean;
      minLength?: number;
      maxLength?: number;
      pattern?: RegExp;
      customValidator?: (
        value: string,
        formData: Record<string, string>
      ) => string | null;
    };
  }
  
  interface FormErrors {
    [fieldName: string]: string;
  }
  
  /**
   * A general function to validate form fields based on provided rules.
   *
   * @param formData - An object containing the form data.
   * @param validationRules - An object defining validation rules for each field.
   * @returns An object containing any validation errors found.
   */
  export const validateFormFields = (
    formData: Record<string, string>,
    validationRules: FieldValidationRules
  ): FormErrors => {
    const errors: FormErrors = {};
  
    for (const fieldName in validationRules) {
      const value = formData[fieldName];
      const rules = validationRules[fieldName];
      if (!Object.keys(formData).includes(fieldName)) {
        continue;
      }
      if (rules.required && !value?.trim()) {
        errors[fieldName] = `${fieldName} is required`;
      }
  
      if (rules.minLength && value.trim().length < rules.minLength) {
        errors[
          fieldName
        ] = `${fieldName} must be at least ${rules.minLength} characters`;
      }
  
      if (rules.maxLength && value.trim().length > rules.maxLength) {
        errors[
          fieldName
        ] = `${fieldName} must be at most ${rules.maxLength} characters`;
      }
  
      if (rules.pattern && !rules.pattern.test(value.trim())) {
        errors[fieldName] = `${fieldName} is invalid`;
      }
  
      if (rules.customValidator) {
        const customError = rules.customValidator(value, formData);
        if (customError) {
          errors[fieldName] = customError;
        }
      }
    }
  
    return errors;
  };
  