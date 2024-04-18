import * as yup from "yup";

export const todoSchema = yup.object().shape({
  text: yup.string().required("Text is required!"),
  time: yup.date().required("Time is required!"),
});
