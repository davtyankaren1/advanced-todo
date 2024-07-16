import * as Yup from "yup";

const validationSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .max(20, "Title must be 20 characters or less"),
  description: Yup.string()
    .required("Description is required")
    .max(20, "Description must be 100 characters or less"),
  deadline: Yup.date()
    .required("Deadline is required")
    .min(new Date(), "Deadline must be in the future"),
});

export default validationSchema;
