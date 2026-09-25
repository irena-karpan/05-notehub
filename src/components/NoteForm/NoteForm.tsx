import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from "formik";
import css from "../NoteForm/NoteForm.module.css";
import * as Yup from "yup";
import { useId } from "react";

interface InitialValues {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}

const noteFormValues: InitialValues = {
  title: "",
  content: "",
  tag: "Todo",
};

export default function NoteForm() {
  const noteFormId = useId();

  const handleSubmit = (
    values: InitialValues,
    actions: FormikHelpers<InitialValues>,
  ) => {
    console.log("Mutation fn", values);
    actions.resetForm();
  };

  const NoteSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, "Title too short")
      .max(50, "Title too long")
      .required("Title is required"),
    content: Yup.string().max(500, "Content too long").required(),
    tag: Yup.string()
      .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
      .required("Select tag"),
  });

  return (
    <Formik
      initialValues={noteFormValues}
      onSubmit={handleSubmit}
      validationSchema={NoteSchema}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor={`${noteFormId}-title`}>Title</label>
          <Field
            id={`${noteFormId}-title`}
            type="text"
            name="title"
            className={css.input}
          />
          <ErrorMessage component="span" name="title" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${noteFormId}-content`}>Content</label>
          <Field
            as="textarea"
            id={`${noteFormId}-content`}
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage component="span" name="content" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${noteFormId}-tag`}>Tag</label>
          <Field
            as="select"
            id={`${noteFormId}-tag`}
            name="tag"
            className={css.select}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage component="span" name="tag" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}
