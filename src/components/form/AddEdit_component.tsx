import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import useHandler from "./useHandler";
import validationSchema from "./validationSchema";

const AddEditComponent: React.FC = () => {
  const { initialValues, handleSubmit, id } = useHandler();

  return (
    <div className="container-form">
      <h2>{id ? "Edit Todo" : "Add Todo"}</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <Field type="text" name="title" placeholder="Enter title" />
            <ErrorMessage name="title" component="div" className="error" />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <Field
              type="text"
              name="description"
              placeholder="Enter description"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="error"
            />
          </div>
          <div className="form-group">
            <label htmlFor="deadline">Deadline:</label>
            <Field type="datetime-local" name="deadline" />
            <ErrorMessage name="deadline" component="div" className="error" />
          </div>
          <button className="save_btn" type="submit">
            {id ? "UPDATE" : "SAVE"}
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddEditComponent;
