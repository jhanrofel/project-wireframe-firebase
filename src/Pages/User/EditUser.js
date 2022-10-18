import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Header from "../../Components/Header";
import Button from "../../Components/Button";
import InputGroup from "../../Components/InputGroup";

import { db } from "../../Database/config";
import { doc,getDoc, updateDoc } from "firebase/firestore";

function EditUser() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const userId = state;
  const userDoc = doc(db, "users",userId);

  const [formValues, setFormValues] = useState({
    fullname:  "",
    email:  "",
  });
  const [formErrors, setFormErrors] = useState({
    fullname: "",
    email: "",
    form: "",
  });

  const getUserData = async ()=> {
    const doc = await getDoc(userDoc);

    setFormValues((state) => ({
      ...state,
      fullname: doc.data().fullname || "",
      email: doc.data().email || "",
    }));
  };

  useEffect(() => {
    getUserData();// eslint-disable-next-line
  }, []);

  const onChangeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    switch (name) {
      case "fullname":
        setFormValues((state) => ({ ...state, fullname: value }));
        setFormErrors((state) => ({ ...state, fullname: "", form: "" }));
        break;
      case "email":
        setFormValues((state) => ({ ...state, email: value }));
        setFormErrors((state) => ({ ...state, email: "", form: "" }));
        break;
      default:
        break;
    }
  };

  const onSaveHandler = async (e) => {
    e.preventDefault();

    if (formValues.fullname === "")
      setFormErrors((state) => ({
        ...state,
        fullname: "Fullname is required.",
      }));
    if (formValues.email === "")
      setFormErrors((state) => ({
        ...state,
        email: "Email is required.",
      }));

    if (formValues.fullname !== "" && formValues.email !== "") {
      await updateDoc(userDoc,{fullname:formValues.fullname,email:formValues.email}).then(navigate("/"));
    }
  };

  return (
    <div>
      <div className="main">
        <Header text="Edit User Information" />
        <InputGroup
          type="text"
          label="Full Name"
          name="fullname"
          placeholder="Anne Hunter"
          value={formValues.fullname}
          error={formErrors.fullname}
          onChangeHandler={onChangeHandler}
        />
        <InputGroup
          type="text"
          label="Email"
          name="email"
          placeholder="ann.hunter@gmail.com"
          value={formValues.email}
          error={formErrors.email}
          onChangeHandler={onChangeHandler}
        />
        <Button
          name="save"
          text="Save"
          variant="light"
          className={"btn-cyan"}
          onClick={onSaveHandler}
        />
      </div>
    </div>
  );
}

export default EditUser;
