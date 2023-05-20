import "./send-message.css";
import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { BiSend } from "react-icons/bi";

const SendMessage = ({ activeGroupName }) => {
  const initialValues = {
    message: "",
  };

  const validationSchema = Yup.object({
    message: Yup.string().trim().required("* Please type your message!"),
  });

  const onSubmit = async () => {
    try {
      const { message } = formik.values;

      // create message
      await fetch("http://localhost:3001/messages/create", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          username: JSON.parse(localStorage.getItem("username")),
          message: message,
          groupName: activeGroupName,
        }),
      });

      formik.resetForm();
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  return (
    <div className="container-sent-message">
      <form className="form" onSubmit={formik.handleSubmit}>
        <p className="message-container">
          {formik.touched.message && formik.errors.message ? (
            <>{formik.errors.message}</>
          ) : (
            <></>
          )}
        </p>
        <div className="container-message-input">
          <input
            type="text"
            {...formik.getFieldProps("message")}
            placeholder="Type a message"
            className="message"
          />
          <button type="submit">
            <BiSend />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendMessage;
