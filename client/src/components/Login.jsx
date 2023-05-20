import "./login.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TbBrandWechat } from "react-icons/tb";
import { useUser } from "../context/userContext";

const Login = () => {
  const { setUsername } = useUser();
  const navigate = useNavigate();

  const initialValues = {
    username: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .required("* Please enter your username!")
      .min(4, "* Your username have to be more than 4 character")
      .matches(/^(\S+$)/, "* This field cannot contain only blank spaces"),
  });

  const onSubmit = async () => {
    try {
      const { username } = formik.values;

      // check username from database to create or get
      const response = await fetch("http://localhost:3001/users/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      const result = await response.json();

      // Welcome notification
      toast.success(`Welcome ${result.data.username}!`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });

      setTimeout(() => {
        navigate(`/${result.data._id}`);
      }, 1000);

      // set username and localStorage when the data received
      setUsername(result.data.username);
      localStorage.setItem("username", JSON.stringify(username));

      formik.resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  return (
    <>
      <div className="container-login">
        <div className="container-form">
          <div className="chat-icon">
            <TbBrandWechat />
          </div>

          <form noValidate onSubmit={formik.handleSubmit}>
            <input
              type="text"
              {...formik.getFieldProps("username")}
              placeholder="Username"
              className="input-username"
            />
            <p className="message-container">
              {formik.touched.username && formik.errors.username ? (
                <>{formik.errors.username}</>
              ) : (
                <> </>
              )}
            </p>
            <br />
            <br />
            <button className="button-submit" type="submit">
              Enter Chat
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
