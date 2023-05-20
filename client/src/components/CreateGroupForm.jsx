import "./create-group-form.css";
import React, { useRef, useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateGroupForm = ({ setIsCreateGroupFormOpen }) => {
  const menuRef = useRef();

  const initialValues = {
    groupName: "",
  };

  const validationSchema = Yup.object({
    groupName: Yup.string()
      .required("* Please enter your group name!")
      .min(4, "* Your group name has to be more than 4 character")
      .matches(/^(\S+$)/, "* This field cannot contain only blank spaces"),
  });

  const onSubmit = async () => {
    try {
      const { groupName } = formik.values;

      // create chat group
      const response = await fetch("http://localhost:3001/groups/create", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ name: groupName }),
      });

      const result = await response.json();

      toast.success(`Group - ${result.data.name} created!`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });

      formik.resetForm();
      setIsCreateGroupFormOpen(false);

      // added timeout to wait for success notification
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  //when the user clicks on the outside of the form, it will close
  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setIsCreateGroupFormOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="popup-container">
      <form
        className="popup-body"
        noValidate
        onSubmit={formik.handleSubmit}
        ref={menuRef}
      >
        <h1>Create Group</h1>
        <input
          type="text"
          {...formik.getFieldProps("groupName")}
          placeholder="Group Name"
        ></input>
        <p className="message-container">
          {formik.touched.groupName && formik.errors.groupName ? (
            <>{formik.errors.groupName}</>
          ) : (
            <></>
          )}
        </p>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateGroupForm;
