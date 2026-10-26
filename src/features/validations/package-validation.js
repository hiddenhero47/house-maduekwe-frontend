import * as Yup from "yup";

export const packageValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Package name is required")
    .min(2, "Package name must be at least 2 characters")
    .max(100, "Package name cannot exceed 100 characters"),
  length: Yup.number()
    .typeError("Length must be a number")
    .required("Length is required")
    .min(0, "Length cannot be negative"),
  width: Yup.number()
    .typeError("Width must be a number")
    .required("Width is required")
    .min(0, "Width cannot be negative"),
  height: Yup.number()
    .typeError("Height must be a number")
    .required("Height is required")
    .min(0, "Height cannot be negative"),
  weight: Yup.object({
    value: Yup.number()
      .typeError("Weight must be a number")
      .min(0, "Weight value cannot be negative")
      .optional(),
    unit: Yup.string().oneOf(["kg", "g", "lb", "oz"]).default("kg"),
  }).optional(),
});
